import { useNavigate } from "react-router-dom";

interface ViewMoreButtonProps {
    label?: string;
    to: string; // đường dẫn cần chuyển đến
}
  
export default function ViewMoreButton({label = "View More", to,}: ViewMoreButtonProps) {
    const navigate = useNavigate();
    return (
        <button
        onClick={() => navigate(to)}
        className="relative flex items-center justify-center 
                    px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4
                    bg-neutral-700 text-white font-medium rounded-xl 
                    overflow-hidden cursor-pointer">
        {label}

        {/* Decoration (2 circles) */}
        <div className="absolute right-2 sm:right-3 md:right-9 top-1/2 -translate-y-1/2">
            {/* Circle 1 */}
            <div className="absolute w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 
                            rounded-full bg-white 
                            shadow-[0_-4px_3px_rgba(0,0,0,0.03)]"></div>

            {/* Circle 2 */}
            <div className="absolute left-[2px] top-[6px] sm:left-[3px] sm:top-[8px] 
                            w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 
                            rounded-full bg-neutral-200"></div>
        </div>
        </button>
    );
}
  
  
