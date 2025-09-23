import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addToFavorites,
  removeFromFavorites,
  selectIsRecipeFavorite,
  toggleFavoriteLocal,
} from "@/store/features/recipeAPISlice";
import { handleRedirectPath } from "@/store/features/login/loginSlice";

export interface SaveButtonProps {
  id: string;
  className?: string;
}

export default function SaveButton({ className, id }: SaveButtonProps) {
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(selectIsRecipeFavorite(id));
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const userId = userProfile.userId;

  const isAuthenticated = useAppSelector(
    (state) => state.loginSlice.isAuthenticated
  );
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated || !userId) {
      toast.error("Login or SignUp to save this Recipe!");
      navigate("/login");
      dispatch(handleRedirectPath(location.pathname));

      return;
    }

    // Optimistic update
    dispatch(toggleFavoriteLocal(id));

    try {
      if (isFavorite) {
        await dispatch(removeFromFavorites({ userId, recipeId: id })).unwrap();
      } else {
        await dispatch(addToFavorites({ userId, recipeId: id })).unwrap();
      }
    } catch (error) {
      // Revert optimistic update on error
      dispatch(toggleFavoriteLocal(id));
      console.error("Failed to update favorite status:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isFavorite}
      className={cn(
        "h-[53px] rounded-full border px-5 w-full sm:w-auto h-8 sm:h-8 lg:h-10 xl:h-14 font-medium text-sm sm:text-base lg:text-lg xl:text-xl inline-flex items-center gap-2 transition-colors", // base
        "border-neutral-800 text-neutral-800", // default state
        "hover:bg-neutral-800 hover:text-white hover:border-neutral-50 transition", // hover
        isFavorite && "bg-neutral-800 text-white border-white", // active state
        className // props extend
      )}
    >
      <Bookmark
        className={cn(isFavorite ? "text-white" : "text-brandBg", "size-7")}
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      />
      <span className="leading-none">{isFavorite ? "SAVED" : "SAVE"}</span>
    </button>
  );
}
