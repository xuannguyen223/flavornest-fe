import { Plus } from "lucide-react";
import type { Ingredient } from "../../../types/TypeRecipe";
import { cn } from "@/lib/utils";

export interface IngredientsProps {
  ingredients: Ingredient[];
}

function CheckItem({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-2 text-neutral-600">
      <span className="grid size-5 place-items-center rounded-full border-2 border-brandBg">
        <Plus className="size-4 text-brandBg" />
      </span>
      <span>{label}</span>
    </label>
  );
}

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <section className="mt-8">
      <h2 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold leading-tight text-neutral-700 text-left">
        Ingredients
      </h2>

      <ul
        className={cn(
          "mt-2 text-xs sm:text-sm lg:text-base xl:text-lg mt-4 grid gap-3 text-left",
          ingredients.length > 6 ? "md:grid-cols-2" : "grid-cols-1"
        )}
      >
        {ingredients.map((ing, idx) => (
          <CheckItem
            key={idx}
            label={`${ing.quantity} ${ing.unit} ${ing.name}`}
          />
        ))}
      </ul>
    </section>
  );
}