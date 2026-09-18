import { useEffect, useState } from "react";
import {
  usePlayer,
  togglePlay,
  next,
  prev,
  seek,
  toggleMute,
  closePlayer,
  currentTrack,
  cycleRate,
  cycleLoop,
  toggleMini,
  playFromQueue,
  bindShortcuts,
} from "@/lib/player";
import WaveCanvas from "./WaveCanvas";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

function fmt(sec: number) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Sticky bottom player that keeps the music alive across page navigation. */
export default function PersistentPlayer() {
  const p = usePlayer();
  const { lang } = useI18n();
  const track = currentTrack();
  const [queueOpen, setQueueOpen] = useState(false);
  useEffect(() => bindShortcuts(), []);
  if (!track) return null;

  const progress = p.dur ? p.time / p.dur : 0;

  const share = async () => {
    const url = window.location.origin + "/works";
    const data = { title: track.title, text: `${T[lang].player_share_text} ${track.title} — Mouje Studio`, url };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(`${data.text} ${url}`);
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className={`pplayer${p.mini ? " mini" : ""}`} role="region" aria-label={T[lang].player_region}>
      {queueOpen && !p.mini && (
        <div className="pp-queue" role="listbox" aria-label={T[lang].player_queue}>
          <div className="pp-queue-head">
            <strong>{T[lang].player_queue_title}</strong>
            <span>{p.queue.length} {T[lang].player_queue_count}</span>
          </div>
          <ul>
            {p.queue.map((q, i) => (
              <li key={q.id}>
                <button
                  type="button"
                  className={q.id === p.currentId ? "active" : ""}
                  onClick={() => playFromQueue(q.id)}
                >
                  <span className="pp-q-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="pp-q-t">{q.title}</span>
                  <span className="pp-q-a">{q.artist ?? ""}</span>
                  {q.id === p.currentId && p.playing && (
                    <i className="bx bx-pulse" aria-hidden="true"></i>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
          <button type="button" onClick={prev} aria-label={T[lang].player_prev}>
            <i className="bx bx-skip-previous"></i>
          </button>
          <button
            type="button"
            className="pp-play"
            onClick={togglePlay}
            aria-label={p.playing ? T[lang].player_pause : T[lang].player_play}
          >
            <i className={`bx ${p.playing ? "bx-pause" : "bx-play"}`}></i>
          </button>
          <button type="button" onClick={next} aria-label={T[lang].player_next}>
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
            className="pp-rate"
            onClick={cycleRate}
            aria-label={T[lang].player_speed}
            title={`${T[lang].player_speed} (S)`}
          >
            {p.rate}x
          </button>
          <button
            type="button"
            className={p.loop !== "off" ? "on" : ""}
            onClick={cycleLoop}
            aria-label={`${T[lang].player_repeat}: ${p.loop}`}
            title={`${T[lang].player_repeat}: ${p.loop}`}
          >
            <i className={`bx ${p.loop === "one" ? "bx-repost" : "bx-repeat"}`}></i>
          </button>
          <button
            type="button"
            className={queueOpen ? "on" : ""}
            onClick={() => setQueueOpen((o) => !o)}
            aria-label={T[lang].player_queue}
            title={T[lang].player_queue}
          >
            <i className="bx bx-list-ul"></i>
          </button>
          <button
            type="button"
            onClick={share}
            aria-label={T[lang].player_share}
            title={T[lang].player_share}
          >
            <i className="bx bx-share-alt"></i>
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={p.muted ? T[lang].player_unmute : T[lang].player_mute}
            title={`${T[lang].player_mute} (M)`}
          >
            <i className={`bx ${p.muted ? "bx-volume-mute" : "bx-volume-full"}`}></i>
          </button>
          <button
            type="button"
            onClick={() => { setQueueOpen(false); toggleMini(); }}
            aria-label={p.mini ? T[lang].player_expand : T[lang].player_minimize}
            title={p.mini ? T[lang].player_expand : T[lang].player_minimize}
          >
            <i className={`bx ${p.mini ? "bx-chevron-up" : "bx-chevron-down"}`}></i>
          </button>
          <button type="button" onClick={closePlayer} aria-label={T[lang].player_close}>
            <i className="bx bx-x"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
