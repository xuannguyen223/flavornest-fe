import { useState } from "react";
import { Star } from "lucide-react";

export interface ReviewsRatingProps {
  average: number; // e.g., 4.0
  count: number; // e.g., 27
  avatarUrl?: string;
}

export default function ReviewsRating({ average, count, avatarUrl }: ReviewsRatingProps) {
  const [userRating, setUserRating] = useState<number>(0);

  return (
    <section className="mt-8">
      <div>
        <h2 className="
          text-4xl font-semibold 
          leading-tight text-neutral-700 text-left">
          Ratings ({count})</h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(average);
              return (
                <Star key={i} 
                className="size-6" 
                fill={filled ? "#2E5834" : "#ADBBAE"} 
                color={filled ? "#2E5834" : "#ADBBAE"} 
                strokeWidth={0} />
              );
            })}
          </div>
          <span className="text-xl font-medium text-neutral-700">
            {average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="md:w-full w-fit mt-6 rounded-md bg-neutral-100 p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Your avatar"
              className="rounded-full object-cover 
                        size-16 sm:size-20 md:size-24"
            />
          ) : (
            <div
              className="grid place-items-center rounded-full bg-neutral-200
                        size-16 sm:size-20 md:size-24"
            >
              <img
                src="/default-avatar.svg"
                alt="Default avatar"
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          )}

          <div className="py-2 flex-1 text-left">
            <div className="font-medium text-neutral-700">Rate this recipe:</div>
            <div className="flex items-center gap-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const index = i + 1;
                const active = index <= userRating;
                return (
                  <button
                    key={i}
                    type="button"
                    className="p-0"
                    aria-label={`Rate ${index}`}
                    onClick={() => setUserRating(index)}
                  >
                    <Star
                      className="size-12"
                      fill={active ? "#2E5834" : "#ADB9AE"}
                      color={active ? "#2E5834" : "#ADB9AE"}
                      strokeWidth={0}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
