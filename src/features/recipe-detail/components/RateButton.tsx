import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from '@/lib/utils';

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

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={rated}
      className={cn(
        "h-[53px] rounded-full border px-5 text-lg inline-flex items-center gap-2 transition-colors", // base
        "border-neutral-800 text-neutral-800", // default state
        "hover:bg-neutral-800 hover:text-white hover:border-white transition", // hover
        rated && "bg-neutral-800 text-white border-white", // active state
        className // props extend
      )}
    >
      <Star
        className={cn(rated ? "text-white" : "text-current", "size-7")}
        fill={rated ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="leading-none">{rated ? "RATED" : "RATE"}</span>
    </button>
  );
}
