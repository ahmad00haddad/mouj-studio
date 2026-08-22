import type { Track } from "@/lib/cms";
import { usePlayer, playQueue, toggleTrack, seek } from "@/lib/player";
import WaveCanvas from "./WaveCanvas";

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function TrackPlayer({ tracks }: { tracks: Track[] }) {
  const p = usePlayer();
  if (!tracks.length) return null;

  const currentInList = p.queue.some((t) => tracks.find((x) => x.id === t.id));

  return (
    <div className="tracks">
      {tracks.map((t) => {
        const isCurrent = t.id === p.currentId;
        const hasAudio = !!t.audio_url;
        return (
          <article className={`track${isCurrent ? " track-on" : ""}`} key={t.id}>
            <div className={`track-cover${isCurrent && p.playing ? " spinning" : ""}`}>
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
                  <WaveCanvas
                    playing={p.playing}
                    progress={p.dur ? p.time / p.dur : 0}
                    onSeek={seek}
                    className="track-wave"
                    bars={64}
                  />
                  <small>{fmt(p.time)} / {fmt(p.dur)}</small>
                </div>
              )}
            </div>
            <div className="track-actions">
              {hasAudio ? (
                <button
                  type="button"
                  className="track-play"
                  aria-label={isCurrent && p.playing ? `Pause ${t.title}` : `Play ${t.title}`}
                  onClick={() =>
                    currentInList ? toggleTrack(t) : playQueue(tracks, t.id)
                  }
                >
                  <i className={`bx ${isCurrent && p.playing ? "bx-pause" : "bx-play"}`}></i>
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
    </div>
  );
}
