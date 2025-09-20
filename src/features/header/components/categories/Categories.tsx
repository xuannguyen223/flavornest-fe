import { useMemo } from "react";
import type { Category as HeaderCategory } from "./CategoryList";
import CategoryList from "./CategoryList";
import type { Category } from '@/types/TypeRecipe';
import { formatCategoryType } from '@/lib/utils';

export type CategoriesProps = {
  itemsByType: Record<string, Category[]>;
};

export default function Categories({ itemsByType }: CategoriesProps) {
  // Chuyển từ Record<string, Category[]> thành array Category cho header
  const headerCategories: HeaderCategory[] = useMemo(() => {
    return Object.entries(itemsByType).map(([type, cats]) => ({
      id: type,
      label: formatCategoryType(type), // hiển thị tên type trên dropdown
      items: cats.map(cat => ({
        id: cat.id,
        label: cat.name,
        description: cat.description,
      })),
    }));
  }, [itemsByType]);

  return (
    <div className="mx-auto py-2.5 max-w-5xl">
      <div className="flex items-center gap-20 h-8">
        <CategoryList items={headerCategories} />
      </div>
    </div>
  );
}

