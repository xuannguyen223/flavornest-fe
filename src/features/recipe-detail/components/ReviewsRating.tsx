import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsRatingProps {
  rating: number;
  ratingCount: number;
  avatarUrl?: string;
  onSubmitRating?: (rating: number) => Promise<void>;
  hasReviewed: boolean;
  recipeId: string;
}

export default function ReviewsRating({
  rating,
  ratingCount,
  avatarUrl,
  onSubmitRating,
  hasReviewed,
  recipeId,
}: ReviewsRatingProps) {
  const [userRating, setUserRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // hasReviewed: hiển thị trạng thái đã đánh giá
  // userRating: giữ số sao đã chọn, ko reset sau khi click submit
  // Load userRating từ localStorage khi component mount
  useEffect(() => {
    if (hasReviewed) {
      const storedRating = localStorage.getItem(`userRating_${recipeId}`);
      if (storedRating) {
        setUserRating(parseInt(storedRating, 10));
      }
    }
  }, [hasReviewed, recipeId]);

  const handleSubmit = async () => {
    if (userRating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmitRating?.(userRating);
      localStorage.setItem(`userRating_${recipeId}`, userRating.toString()); // Lưu userRating
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-8">
      {/* Rating Overview */}
      <div>
        <h2 className="text-4xl font-semibold leading-tight text-neutral-700 text-left">
          Ratings ({ratingCount})
        </h2>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(rating);
              return (
                <Star
                  key={i}
                  className="size-8"
                  fill={filled ? '#2E5834' : '#ADBBAE'}
                  color={filled ? '#2E5834' : '#ADBBAE'}
                  strokeWidth={0}
                />
              );
            })}
          </div>
          <span className="text-xl font-medium text-neutral-700">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="w-fit mt-6 rounded-md bg-neutral-100 p-6">
        <div className="flex items-start gap-6">
          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Your avatar"
              className="rounded-full object-cover size-16 sm:size-20 md:size-24"
            />
          ) : (
            <div className="grid place-items-center rounded-full bg-neutral-200 size-16 sm:size-20 md:size-24">
              <img
                src="/default-avatar.svg"
                alt="Default avatar"
                className="w-4/5 h-4/5 object-contain"
              />
            </div>
          )}

          {/* Star & Submit Button */}
          <div className="py-2 flex-1 text-left">
            <div className="font-medium text-neutral-700 mb-2">
              {hasReviewed ? 'You rated this recipe (you can update it):' : 'Rate this recipe:'}
            </div>
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => {
                  const index = i + 1;
                  return (
                    <button
                      key={i}
                      type="button"
                      className="p-0"
                      aria-label={`Rate ${index}`}
                      onClick={() => setUserRating(index)}
                      disabled={isSubmitting}
                    >
                      <Star
                        className="size-12"
                        fill={index <= userRating ? '#2E5834' : '#ADBBAE'}
                        strokeWidth={0}
                      />
                    </button>
                  );
                })}
              </div>
              <Button
                onClick={handleSubmit}
                disabled={userRating === 0 || isSubmitting}
                className="px-5 py-3 rounded-md bg-green-800 text-lg text-white font-medium hover:bg-green-700 disabled:bg-neutral-400"
              >
                {isSubmitting ? 'Submitting...' : hasReviewed ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}