import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { T } from "@/lib/translations";

const getRows = (lang: "en" | "ar"): [string, string][] => [
  ["Space", T[lang].kb_play],
  ["← / →", T[lang].kb_seek],
  ["↑ / ↓", T[lang].kb_track],
  ["M", T[lang].kb_mute],
  ["S", T[lang].kb_speed],
  ["?", T[lang].kb_panel],
  ["Esc", T[lang].kb_close],
];

/** Keyboard shortcuts cheat-sheet, opened with "?" or the floating button. */
export default function ShortcutsHelp() {
  const { lang } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return;
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className="kb-fab"
        onClick={() => setOpen(true)}
        aria-label={T[lang].kb_open}
        title={`${T[lang].kb_open} (?)`}
      >
        <i className="bx bx-command" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="kb-overlay" role="dialog" aria-modal="true" aria-label={T[lang].kb_title} onClick={() => setOpen(false)}>
          <div className="kb-card" onClick={(e) => e.stopPropagation()}>
            <header>
              <strong>{T[lang].kb_title}</strong>
              <button type="button" onClick={() => setOpen(false)} aria-label={T[lang].kb_close}>
                <i className="bx bx-x"></i>
              </button>
            </header>
            <ul>
              {getRows(lang).map(([k, label]) => (
                <li key={k}>
                  <kbd>{k}</kbd>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
