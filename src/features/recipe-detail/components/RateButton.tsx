import { useState } from "react";
import { Star } from "lucide-react";

export interface RateButtonProps {
  defaultRated?: boolean;
  onToggle?: (rated: boolean) => void;
  className?: string;
}

export default function RateButton({ defaultRated = false, onToggle, className }: RateButtonProps) {
  const [rated, setRated] = useState(defaultRated);

  const handleClick = () => {
    const next = !rated;
    setRated(next);
    onToggle?.(next);
  };

  const base = "h-[53px] rounded-full border px-5 text-lg inline-flex items-center gap-2 transition-colors";
  const defaultState = "border-neutral-800 text-neutral-800";
  const hoverState = "hover:bg-neutral-800 hover:text-white hover:border-white transition";
  const activeState = rated ? "bg-neutral-800 text-white border-white" : "";

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={rated}
      className={[base, defaultState, hoverState, activeState, className].filter(Boolean).join(" ")}
    >
      <Star
        className={(rated ? "text-white" : "text-current") + " size-7"}
        fill={rated ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="leading-none">{rated ? "RATED" : "RATE"}</span>
    </button>
  );
}
