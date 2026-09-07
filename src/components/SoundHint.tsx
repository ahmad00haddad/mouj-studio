import { useEffect, useState } from "react";
import { usePlayer, toggleMute, unlockAudio } from "@/lib/player";

const KEY = "mouje-sound-hint";

/** One-time contextual hint inviting the visitor to turn sound on. */
export default function SoundHint() {
  const p = usePlayer();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem(KEY) === "1") return;
    const t = window.setTimeout(() => setShow(true), 2200);
    return () => window.clearTimeout(t);
  }, []);

  const dismiss = () => {
    window.localStorage.setItem(KEY, "1");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="sound-hint" role="status">
      <i className="bx bx-headphone" aria-hidden="true"></i>
      <p>This site sounds better with audio on.</p>
      <button
        type="button"
        className="sh-yes"
        onClick={() => {
          unlockAudio();
          if (p.muted) toggleMute();
          dismiss();
        }}
      >
        Turn sound on
      </button>
      <button type="button" className="sh-no" onClick={dismiss} aria-label="Dismiss">
        <i className="bx bx-x"></i>
      </button>
    </div>
  );
}
