import { PropsWithChildren, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

interface Props {
  title: string;
  open: boolean;
  onClose: () => void;
}

export default function Modal({
  title,
  open,
  onClose,
  children
}: PropsWithChildren<Props>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      const prev = document.activeElement as HTMLElement | null;
      ref.current
        ?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        ?.focus();
      return () => {
        document.removeEventListener("keydown", onKey);
        prev?.focus();
      };
    }
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={e => e.currentTarget === e.target && onClose()}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        ref={ref}
      >
        <div className={styles.header}>
          <h2 id="modal-title">{title}</h2>
          <button className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
