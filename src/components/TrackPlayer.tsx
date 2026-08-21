import { useEffect, useRef, useState } from "react";
import type { Track } from "@/lib/cms";

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TrackPlayer({ tracks }: { tracks: Track[] }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  const current = tracks.find((t) => t.id === currentId) ?? null;

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !current?.audio_url) return;
    el.src = current.audio_url;
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [currentId]);

  function toggle(t: Track) {
    if (!t.audio_url) return;
    if (t.id === currentId) {
      const el = audioRef.current;
      if (!el) return;
      if (el.paused) { el.play().catch(() => {}); setPlaying(true); }
      else { el.pause(); setPlaying(false); }
      return;
    }
    setCurrentId(t.id);
  }

  if (!tracks.length) return null;

  return (
    <div className="tracks">
      {tracks.map((t) => {
        const isCurrent = t.id === currentId;
        const hasAudio = !!t.audio_url;
        return (
          <article className={`track${isCurrent ? " track-on" : ""}`} key={t.id}>
            <div className="track-cover">
              {t.cover_url ? (
                <img src={t.cover_url} alt={`${t.title} cover art`} loading="lazy" />
              ) : (
                <i className="bx bx-music" aria-hidden="true"></i>
              )}
            </div>
            <div className="track-body">
              <h3>{t.title}</h3>
              <p>{[t.artist, t.role].filter(Boolean).join(" · ")}</p>
              {!!t.tags?.length && (
                <div className="track-tags">
                  {t.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              )}
              {isCurrent && (
                <div className="track-progress" aria-hidden="true">
                  <div className="track-bar"><span style={{ width: dur ? `${(time / dur) * 100}%` : "0%" }} /></div>
                  <small>{fmt(time)} / {fmt(dur)}</small>
                </div>
              )}
            </div>
            <div className="track-actions">
              {hasAudio ? (
                <button
                  type="button"
                  className="track-play"
                  aria-label={isCurrent && playing ? `Pause ${t.title}` : `Play ${t.title}`}
                  onClick={() => toggle(t)}
                >
                  <i className={`bx ${isCurrent && playing ? "bx-pause" : "bx-play"}`}></i>
                </button>
              ) : t.external_url ? (
                <a className="btn btn-ghost" href={t.external_url} target="_blank" rel="noopener noreferrer">
                  Listen <i className="bx bx-link-external"></i>
                </a>
              ) : (
                <span className="track-soon">Coming soon</span>
              )}
            </div>
          </article>
        );
      })}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}
