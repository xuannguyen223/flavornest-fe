import { useMemo } from "react";
import type { Category as HeaderCategory } from "./CategoryList";
import CategoryList from "./CategoryList";
import type { Category } from '@/types/TypeRecipe';

export type CategoriesProps = {
  itemsByType: Record<string, Category[]>;
};

export default function Categories({ itemsByType }: CategoriesProps) {
  // Chuyển từ Record<string, Category[]> thành array Category cho header
  const headerCategories: HeaderCategory[] = useMemo(() => {
    return Object.entries(itemsByType).map(([type, cats]) => ({
      id: type,
      label: type, // hiển thị tên type trên dropdown
      items: cats.map(cat => ({
        id: cat.id,
        label: cat.name,
        description: cat.description,
      })),
    }));
  }, [itemsByType]);

  return (
    <div className="mx-auto my-4 ml-68 max-w-6xl px-6">
      <div className="flex items-center gap-10 h-12">
        <CategoryList items={headerCategories} />
      </div>
    </div>
  );
}

