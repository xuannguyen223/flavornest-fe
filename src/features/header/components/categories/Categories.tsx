import { useMemo } from "react";
import type { Category } from "./CategoryList";
import CategoryList from "./CategoryList";

type CategoriesProps = {
  items?: Category[];
};

export default function Categories({ items }: CategoriesProps) {
  const computedItems = useMemo<Category[]>(() => items ?? [], [items]);
  
  return (
    <div className="mx-auto my-4 ml-68 max-w-6xl px-6">
      <div className="flex items-center gap-10 h-12">
        <CategoryList items={computedItems} />
      </div>
    </div>
  );
}
