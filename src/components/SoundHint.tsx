import { useEffect, useState } from "react";
import { usePlayer, toggleMute, unlockAudio } from "@/lib/player";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

const KEY = "mouje-sound-hint";

/** One-time contextual hint inviting the visitor to turn sound on. */
export default function SoundHint() {
  const p = usePlayer();
  const { lang } = useI18n();
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
      <p>{T[lang].hint_text}</p>
      <button
        type="button"
        className="sh-yes"
        onClick={() => {
          unlockAudio();
          if (p.muted) toggleMute();
          dismiss();
        }}
      >
        {T[lang].hint_btn}
      </button>
      <button type="button" className="sh-no" onClick={dismiss} aria-label={T[lang].hint_dismiss}>
        <i className="bx bx-x"></i>
      </button>
    </div>
  );
}
