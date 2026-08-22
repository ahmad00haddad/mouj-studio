import {
  usePlayer,
  togglePlay,
  next,
  prev,
  seek,
  toggleMute,
  closePlayer,
  currentTrack,
} from "@/lib/player";
import WaveCanvas from "./WaveCanvas";

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Sticky bottom player that keeps the music alive across page navigation. */
export default function PersistentPlayer() {
  const p = usePlayer();
  const track = currentTrack();
  if (!track) return null;

  const progress = p.dur ? p.time / p.dur : 0;

  return (
    <div className="pplayer" role="region" aria-label="Audio player">
      <div className="pp-inner">
        <div className="pp-id">
          <div className="pp-cover">
            {track.cover_url ? (
              <img src={track.cover_url} alt="" />
            ) : (
              <i className="bx bx-music" aria-hidden="true"></i>
            )}
          </div>
          <div className="pp-meta">
            <strong>{track.title}</strong>
            <small>{[track.artist, track.role].filter(Boolean).join(" · ")}</small>
          </div>
        </div>

        <div className="pp-controls">
          <button type="button" onClick={prev} aria-label="Previous track">
            <i className="bx bx-skip-previous"></i>
          </button>
          <button
            type="button"
            className="pp-play"
            onClick={togglePlay}
            aria-label={p.playing ? "Pause" : "Play"}
          >
            <i className={`bx ${p.playing ? "bx-pause" : "bx-play"}`}></i>
          </button>
          <button type="button" onClick={next} aria-label="Next track">
            <i className="bx bx-skip-next"></i>
          </button>
        </div>

        <div className="pp-wavewrap">
          <WaveCanvas
            playing={p.playing}
            progress={progress}
            onSeek={seek}
            className="pp-wave"
          />
          <div className="pp-times">
            <span>{fmt(p.time)}</span>
            <span>{fmt(p.dur)}</span>
          </div>
        </div>

        <div className="pp-side">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={p.muted ? "Unmute" : "Mute"}
          >
            <i className={`bx ${p.muted ? "bx-volume-mute" : "bx-volume-full"}`}></i>
          </button>
          <button type="button" onClick={closePlayer} aria-label="Close player">
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
