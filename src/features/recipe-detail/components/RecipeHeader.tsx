import { Star } from "lucide-react";
import SaveButton from "./SaveButton";
import Breadcrumbs from "@/components/common/BreadCrumbs";

export interface RecipeHeaderProps {
  title: string;
  image: string;
  author: string;
  publishedAt: string; // ISO date
  rating: number; // average
  ratingCount: number;
}

export default function RecipeHeader({
  rating, ratingCount, title, image, author, publishedAt, }: RecipeHeaderProps) {


  const dateLabel = new Date(publishedAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const filledStars = Math.floor(rating);

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
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="size-7"
              fill={i < filledStars ? "#2E5834" : "#ADBBAE"}
              color={i < filledStars ? "#2E5834" : "#ADBBAE"}
              strokeWidth={0}
            />
          ))}
        </div>
        <span className="ml-1 text-lg text-neutral-800">{rating.toFixed(1)}</span>
        <span className="text-lg text-neutral-600">({ratingCount})</span>
      </div>

      {/* Author / Date */}
      <div className="mt-3 flex items-center gap-4 text-base">
        <div className="flex items-center gap-2">
          <span className="text-neutral-800">By</span>
          <span className="text-[#C57D5D]">{author}</span>
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
      <div className="mt-6 flex items-center gap-3">
        <SaveButton />
      </div>
    </section>
  );
}
