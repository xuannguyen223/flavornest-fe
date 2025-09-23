import { Star } from "lucide-react";
import SaveButton from "./SaveButton";
import Breadcrumbs from "@/components/common/BreadCrumbs";
import { useAppSelector } from "@/store/hooks";

export interface RecipeHeaderProps {
  id: string;
  title: string;
  image?: string;
  author: string;
  authorId: string;
  createdAt: string; // ISO date
  avgRating: number; // average
  ratingCount: number;
}

export default function RecipeHeader({
  avgRating, ratingCount, title, image, author, authorId, createdAt, id, }: RecipeHeaderProps) {
  
  const userProfile = useAppSelector((state) => state.userSlice.profile);
  const userId = userProfile.userId;
  const dateLabel = new Date(createdAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="w-full">
      {/* Breadcrumbs (simple) */}
      <Breadcrumbs title={title} />

      {/* Title */}
      <h1 className="mt-6 text-5xl 
        font-semibold leading-tight 
        text-neutral-700 text-left">{title}</h1>

      {/* Rating */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const filled = i < Math.round(avgRating);
            return (
              <Star
              key={i}
              className="size-7"
              fill={filled ? "#facc15" : "#FFECC0"}
              color={filled ? "#facc15" : "#FFECC0"}
              strokeWidth={0}
            />
            );
          })}
        </div>
        <span className="ml-1 text-lg text-neutral-800">{avgRating.toFixed(1)}</span>
        <span className="text-lg text-neutral-600">({ratingCount})</span>
      </div>

      {/* Author / Date */}
      <div className="mt-3 flex items-center gap-4 text-base">
        <div className="flex items-center gap-2">
          <span className="text-neutral-800">By</span>
          <span className="font-semibold text-amber-500">{author}</span>
        </div>
        <span className="h-6 w-px bg-neutral-300" />
        <span className="text-neutral-800">{dateLabel}</span>
      </div>

      {/* Image */}
      <div className="mt-8 overflow-hidden rounded-2xl flex justify-center">
        <img
          src={image}
          alt={title}
          className="h-[150px] w-full object-cover md:h-[350px]"
        />
      </div>

      {/* Action buttons (Save) */}
      {authorId !== userId && (
        <div className="mt-6 flex items-center gap-3">
          <SaveButton id={id} />
        </div>
      )}
    </section>
  );
}
