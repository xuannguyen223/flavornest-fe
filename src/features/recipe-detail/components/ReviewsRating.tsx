import { useState, useEffect, useMemo } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { handleRedirectPath } from "@/store/features/login/loginSlice";

interface ReviewsRatingProps {
  rating: number;
  ratingCount: number;
  avatarUrl?: string;
  onSubmitRating?: (rating: number) => Promise<void>;
  hasReviewed: boolean;
  recipeId: string;
  userRating: number; // Nhận userRating từ parent
}

export default function ReviewsRating({
  rating,
  ratingCount,
  avatarUrl,
  onSubmitRating,
  hasReviewed,
  // recipeId,
  userRating,
}: ReviewsRatingProps) {
  const [currentRating, setCurrentRating] = useState<number>(userRating); // Khởi tạo từ prop userRating
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Đồng bộ currentRating với userRating khi userRating thay đổi
  useEffect(() => {
    setCurrentRating(userRating); // Cập nhật currentRating khi userRating thay đổi
  }, [userRating]);

  const isAuthenticated = useAppSelector(
    (state) => state.loginSlice.isAuthenticated
  );
  const user = useAppSelector((state) => state.userSlice.profile);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const initials = useMemo(() => {
    const parts = user.name.trim().split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "N";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }, [user.name]);

  const handleSubmit = async () => {
    if (currentRating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmitRating?.(currentRating);
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
        <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold leading-tight text-neutral-700 text-left">
          Ratings ({ratingCount})
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
              const filled = i < Math.round(rating);
              return (
                <Star
                  key={i}
                  className="size-8"
                  fill={filled ? "#facc15" : "#FFECC0"}
                  color={filled ? "#facc15" : "#FFECC0"}
                  strokeWidth={0}
                />
              );
            })}
          </div>
          <span className="text-sm sm:text-base lg:text-lg xl:text-xl font-medium text-neutral-700">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      {/* Submit rating, check auth */}
      {!isAuthenticated ? (
        <div className="w-fit mt-4 flex justify-center items-center bg-neutral-100 rounded-md p-6 mb-8">
          <p className="text-center text-neutral-700 text-lg">
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => {
                navigate("/login");
                dispatch(handleRedirectPath(location.pathname));
              }}
            >
              Login
            </span>{" "}
            or
            <span
              className="font-semibold underline cursor-pointer"
              onClick={() => {
                navigate("/signup");
                dispatch(handleRedirectPath(location.pathname));
              }}
            >
              Signup
            </span>{" "}
            to rate this Recipe!
          </p>
        </div>
      ) : (
        // Nếu đã login → hiện khung rating bình thường
        <div className="w-fit mt-4 rounded-md bg-neutral-100 p-4 mb-10">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Your avatar"
                className="rounded-full object-cover size-16 sm:size-20 md:size-24"
              />
            ) : (
              <span
                aria-hidden
                className="grid place-items-center w-4/5 h-4/5 rounded-full 
                  bg-neutral-200 size-16 sm:size-20 md:size-24 
                  text-neutral-700 text-4xl font-medium cursor-pointer"
                onClick={() => navigate("/my-profile")}
              >
                {initials}
              </span>
            )}

            {/* Star & Submit Button */}
            <div className="py-2 flex-1 text-left">
              <div className="font-medium text-neutral-700 mb-2">
                {hasReviewed
                  ? "You rated this recipe (you can update it):"
                  : "Rate this recipe:"}
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
                        onClick={() => setCurrentRating(index)}
                        disabled={isSubmitting}
                      >
                        <Star
                          className="size-12"
                          fill={index <= currentRating ? "#facc15" : "#FFECC0"}
                          strokeWidth={0}
                        />
                      </button>
                    );
                  })}
                </div>
                <Button
                  onClick={handleSubmit}
                  disabled={currentRating === 0 || isSubmitting}
                  className="px-5 py-3 rounded-md bg-neutral-700 text-lg text-white font-medium hover:bg-neutral-500 disabled:bg-neutral-300"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : hasReviewed
                    ? "Update"
                    : "Submit"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
