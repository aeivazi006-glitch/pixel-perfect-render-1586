import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

/**
 * Slide-over panel used for mobile product filters.
 * Closes on Escape, backdrop tap and the explicit close control.
 */
export function FilterDrawer({
  open,
  onClose,
  title = "Filters",
  footer,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 lg:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-foreground/40 backdrop-blur-[3px]"
      />
      <div className="relative ml-auto flex h-full w-[88%] max-w-sm flex-col border-l border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-xl">{title}</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <X className="size-5" strokeWidth={1.4} aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="border-t border-border px-6 py-5">{footer}</div>}
      </div>
    </div>
  );
}
