import { useEffect, useState } from "react";

const ROWS: [string, string][] = [
  ["Space", "Play / Pause"],
  ["← / →", "Seek 5 seconds"],
  ["↑ / ↓", "Previous / Next track"],
  ["M", "Mute / Unmute"],
  ["S", "Playback speed"],
  ["?", "Show this panel"],
  ["Esc", "Close"],
];

/** Keyboard shortcuts cheat-sheet, opened with "?" or the floating button. */
export default function ShortcutsHelp() {
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
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <i className="bx bx-command" aria-hidden="true"></i>
      </button>

      {open && (
        <div className="kb-overlay" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts" onClick={() => setOpen(false)}>
          <div className="kb-card" onClick={(e) => e.stopPropagation()}>
            <header>
              <strong>Keyboard shortcuts</strong>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <i className="bx bx-x"></i>
              </button>
            </header>
            <ul>
              {ROWS.map(([k, label]) => (
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
