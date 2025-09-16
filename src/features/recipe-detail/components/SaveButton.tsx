import { useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from '@/lib/utils';

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

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      className={cn(
        "h-[53px] rounded-full border px-5 text-lg inline-flex items-center gap-2 transition-colors", // base
        "border-neutral-800 text-neutral-800", // default state
        "hover:bg-neutral-800 hover:text-white hover:border-neutral-50 transition", // hover
        saved && "bg-neutral-800 text-white border-white", // active state
        className // props extend
      )}
    >
      <Bookmark
        className={cn(saved ? "text-white" : "text-brandBg", "size-7")}
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="leading-none">{saved ? "SAVED" : "SAVE"}</span>
    </button>
  );
}

