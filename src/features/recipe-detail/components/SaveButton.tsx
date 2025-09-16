import { useState } from "react";
import { Bookmark } from "lucide-react";

export interface SaveButtonProps {
  defaultSaved?: boolean;
  onToggle?: (saved: boolean) => void;
  className?: string;
}

export default function SaveButton({ defaultSaved = false, onToggle, className }: SaveButtonProps) {
  const [saved, setSaved] = useState(defaultSaved);

  const handleClick = () => {
    const next = !saved;
    setSaved(next);
    onToggle?.(next);
  };

  const base = "h-[53px] rounded-full border px-5 text-lg inline-flex items-center gap-2 transition-colors";
  const defaultState = "border-neutral-800 text-neutral-800";
  const hoverState = "hover:bg-neutral-800 hover:text-white hover:border-neutral-50 transition";
  const activeState = saved ? "bg-neutral-800 text-white border-white" : "";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      className={[base, defaultState, hoverState, activeState, className].filter(Boolean).join(" ")}
    >
      <Bookmark
        className={(saved ? "text-white" : "text-brandBg") + " size-7"}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="leading-none">{saved ? "SAVED" : "SAVE"}</span>
    </button>
  );
}
