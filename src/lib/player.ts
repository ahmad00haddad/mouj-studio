// ============================================================
// Global audio engine + player store (Web Audio API)
// - Single HTMLAudioElement routed through AnalyserNode -> GainNode
// - Live frequency data for waveform visualizers (CORS-safe fallback)
// - UI hover/tap sound design ticks synthesized with oscillators
// - Global mute persisted in localStorage
// ============================================================
import { useSyncExternalStore } from "react";
import type { Track } from "./cms";

export type PlayerState = {
  queue: Track[];
  currentId: string | null;
  playing: boolean;
  time: number;
  dur: number;
  muted: boolean;
};

const initial: PlayerState = {
  queue: [],
  currentId: null,
  playing: false,
  time: 0,
  dur: 0,
  muted:
    typeof window !== "undefined" &&
    window.localStorage.getItem("mouje-muted") === "1",
};

let state = initial;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}
function set(patch: Partial<PlayerState>) {
  state = { ...state, ...patch };
  emit();
  // body flags drive global CSS (footer padding, hero eq sync)
  if (typeof document !== "undefined") {
    document.body.classList.toggle("has-player", state.queue.length > 0);
    document.body.classList.toggle("is-playing", state.playing);
  }
}

// ---------------- Web Audio engine (client only) ----------------
let audio: HTMLAudioElement | null = null;
let actx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let masterGain: GainNode | null = null;
let freqData: Uint8Array<ArrayBuffer> | null = null;

function ensureEngine() {
  if (typeof window === "undefined") return false;
  if (!audio) {
    audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.preload = "auto";
    audio.addEventListener("timeupdate", () =>
      set({ time: audio?.currentTime ?? 0 }),
    );
    audio.addEventListener("loadedmetadata", () =>
      set({ dur: isFinite(audio?.duration ?? 0) ? audio!.duration : 0 }),
    );
    audio.addEventListener("ended", () => next());
    audio.addEventListener("play", () => set({ playing: true }));
    audio.addEventListener("pause", () => set({ playing: false }));
  }
  if (!actx) {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      actx = new AC();
      const src = actx.createMediaElementSource(audio);
      analyser = actx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.82;
      masterGain = actx.createGain();
      masterGain.gain.value = state.muted ? 0 : 1;
      src.connect(analyser);
      analyser.connect(masterGain);
      masterGain.connect(actx.destination);
      freqData = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      actx = null; // Web Audio unavailable — plain <audio> still works
    }
  }
  if (actx && actx.state === "suspended") actx.resume().catch(() => {});
  return true;
}

/** Analyser node for visualizers; null until first play (browser gesture rule). */
export function getAnalyser(): { node: AnalyserNode; data: Uint8Array<ArrayBuffer> } | null {
  if (!analyser || !freqData) return null;
  return { node: analyser, data: freqData };
}

// ---------------- Player actions ----------------
export function playQueue(tracks: Track[], startId?: string) {
  const list = tracks.filter((t) => !!t.audio_url);
  if (!list.length || !ensureEngine() || !audio) return;
  const start = list.find((t) => t.id === startId) ?? list[0];
  if (state.currentId === start.id) {
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
    return;
  }
  set({ queue: list, currentId: start.id, time: 0, dur: 0 });
  audio.src = start.audio_url!;
  audio.play().catch(() => set({ playing: false }));
}

export function toggleTrack(track: Track) {
  if (!track.audio_url) return;
  if (state.currentId === track.id && audio) {
    audio.paused ? audio.play().catch(() => {}) : audio.pause();
    return;
  }
  playQueue(state.queue.length ? state.queue : [track], track.id);
}

export function togglePlay() {
  if (!audio) return;
  audio.paused ? audio.play().catch(() => {}) : audio.pause();
}

function step(dir: 1 | -1) {
  const { queue, currentId } = state;
  if (!queue.length || !audio) return;
  const i = queue.findIndex((t) => t.id === currentId);
  const nxt = queue[(i + dir + queue.length) % queue.length];
  playQueue(queue, nxt.id);
}

export const next = () => step(1);
export const prev = () => step(-1);

export function seek(fraction: number) {
  if (!audio || !isFinite(audio.duration)) return;
  audio.currentTime = Math.min(Math.max(fraction, 0), 1) * audio.duration;
  set({ time: audio.currentTime });
}

export function toggleMute() {
  const muted = !state.muted;
  if (typeof window !== "undefined")
    window.localStorage.setItem("mouje-muted", muted ? "1" : "0");
  if (masterGain && actx)
    masterGain.gain.linearRampToValueAtTime(
      muted ? 0 : 1,
      actx.currentTime + 0.08,
    );
  set({ muted });
}

export function closePlayer() {
  audio?.pause();
  if (audio) audio.removeAttribute("src");
  set({ queue: [], currentId: null, playing: false, time: 0, dur: 0 });
}

export function usePlayer(): PlayerState {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => state,
    () => initial,
  );
}

export function currentTrack(): Track | null {
  return state.queue.find((t) => t.id === state.currentId) ?? null;
}

// ---------------- UI sound design (hover / tap ticks) ----------------
let lastTick = 0;

function blip(freq: number, durMs: number, vol: number) {
  if (!ensureEngine() || !actx || !masterGain || state.muted) return;
  if (actx.state !== "running") return; // stay silent until unlocked
  const t0 = actx.currentTime;
  const osc = actx.createOscillator();
  const g = actx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, t0);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.6, t0 + durMs / 1000);
  g.gain.setValueAtTime(0, t0);
  g.gain.linearRampToValueAtTime(vol, t0 + 0.005);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + durMs / 1000);
  osc.connect(g);
  g.connect(masterGain);
  osc.start(t0);
  osc.stop(t0 + durMs / 1000 + 0.02);
}

export function tick(kind: "hover" | "tap") {
  const now = performance.now();
  if (kind === "hover" && now - lastTick < 90) return;
  lastTick = now;
  if (kind === "hover") blip(2300, 28, 0.016);
  else blip(1350, 55, 0.03);
}

/** Unlock AudioContext on the first real user gesture. */
export function unlockAudio() {
  ensureEngine();
}
