import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { CategoryItem } from "./CategoryItem";
import { getAllCategories } from "@/services/category.service";
import type { Category, RecipeCategory } from "@/types/TypeRecipe";

type CategorySectionProps = {
  value: RecipeCategory[];
  onChange: (updates: RecipeCategory[]) => void;
  errors?: any;
};

const CATEGORY_FIELDS = [
  {
    type: "CUISINE",
    placeholder: "Cuisine",
  },
  {
    type: "MEAL_TYPE",
    placeholder: "Meal Type",
  },
  {
    type: "DIETARY",
    placeholder: "Dietary",
  },
  {
    type: "COOKING_METHOD",
    placeholder: "Method",
  },
  {
    type: "MAIN_INGREDIENT",
    placeholder: "Main Ingredient",
  },
] as const;

export function CategorySection({ value, onChange, errors }: CategorySectionProps) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const getCategoriesByType = (type: string) => {
    return categories
      .filter(category => category.type === type)
      .map(category => category.name);
  };

  const handleTagChange = (type: string, newValue: string) => {
    const updatedCategories = value.filter(cat => cat.category.type !== type);
    if (newValue) {
      const selectedCategory = categories.find(cat => cat.name === newValue && cat.type === type);
      if (selectedCategory) {
        updatedCategories.push({
          recipeId: "",
          categoryId: selectedCategory.id,
          category: selectedCategory
        });
      }
    }
    onChange(updatedCategories);
  };

  const getTagValue = (type: string) => {
    const category = value.find(cat => cat.category.type === type);
    return category?.category.name || "";
  };

  const getTagError = (type: string) => {
    return errors?.[type];
  };

  return (
    <div className="space-y-4 mb-[80px]">
      <Label className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
        Categories
      </Label>

      <div>
        {CATEGORY_FIELDS.map((config) => (
          <CategoryItem
            key={config.type}
            value={getTagValue(config.type)}
            onChange={(newValue) => handleTagChange(config.type, newValue)}
            options={getCategoriesByType(config.type)}
            placeholder={config.placeholder}
            error={getTagError(config.type)}
          />
        ))}
      </div>
    </div>
  );
}