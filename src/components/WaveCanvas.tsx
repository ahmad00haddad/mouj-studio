import { useEffect, useRef } from "react";
import { getAnalyser } from "@/lib/player";

type Props = {
  playing: boolean;
  className?: string;
  bars?: number;
  /** 0..1 progress tint overlay (played portion brightens) */
  progress?: number;
  onSeek?: (fraction: number) => void;
};

/**
 * Live frequency-bar visualizer driven by the global Web Audio analyser.
 * Falls back to a synthetic travelling wave when the stream is not
 * analysable (cross-origin) or while paused.
 */
export default function WaveCanvas({
  playing,
  className,
  bars = 56,
  progress,
  onSeek,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ playing, progress });
  stateRef.current = { playing, progress };

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const c1 = styles.getPropertyValue("--primary").trim() || "#6366f1";
    const c2 = styles.getPropertyValue("--primary-glow").trim() || "#818cf8";
    const dim = "rgba(255,255,255,0.14)";

    let raf = 0;
    let silentFrames = 0;
    let phase = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const an = getAnalyser();
      let levels: number[] | null = null;
      if (an && stateRef.current.playing) {
        an.node.getByteFrequencyData(an.data);
        let sum = 0;
        for (let i = 0; i < an.data.length; i++) sum += an.data[i];
        if (sum > 8) {
          silentFrames = 0;
          levels = [];
          for (let i = 0; i < bars; i++) {
            const idx = Math.floor(
              Math.pow(i / bars, 1.4) * (an.data.length * 0.72),
            );
            levels.push(an.data[idx] / 255);
          }
        } else if (++silentFrames < 45) {
          levels = null; // brief silence keeps last motion via fallback
        }
      }

      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, c1);
      grad.addColorStop(1, c2);

      const gap = 2;
      const bw = Math.max(2, (w - gap * (bars - 1)) / bars);
      phase += stateRef.current.playing ? 0.09 : 0.015;

      for (let i = 0; i < bars; i++) {
        let lvl: number;
        if (levels) {
          lvl = 0.08 + levels[i] * 0.92;
        } else {
          // synthetic fallback / idle sway
          const t = phase;
          lvl = stateRef.current.playing
            ? 0.18 +
              0.5 *
                Math.abs(
                  Math.sin(i * 0.55 + t * 2.1) * Math.sin(i * 0.21 - t * 1.3),
                )
            : 0.1 + 0.06 * Math.abs(Math.sin(i * 0.4 + t));
        }
        const bh = Math.max(2, lvl * (h - 4));
        const x = i * (bw + gap);
        const y = (h - bh) / 2;

        const prog = stateRef.current.progress;
        const played =
          prog == null || prog <= 0 ? true : x / w <= prog;
        ctx.fillStyle = played ? grad : dim;
        ctx.beginPath();
        const r = Math.min(bw / 2, 2);
        ctx.roundRect(x, y, bw, bh, r);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [bars]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      onClick={
        onSeek
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              onSeek((e.clientX - r.left) / r.width);
            }
          : undefined
      }
      style={onSeek ? { cursor: "pointer" } : undefined}
    />
  );
}
