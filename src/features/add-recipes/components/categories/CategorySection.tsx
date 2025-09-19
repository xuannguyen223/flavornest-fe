import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { CategoryItem } from "./CategoryItem";
import { getAllCategories } from "@/services/category.service";
import type { Category } from "@/types/TypeRecipe";

type CategoryListProps = {
  cuisine?: string;
  mealType?: string;
  dietary?: string[];
  method?: string;
  main?: string;
};

type CategorySectionProps = {
  value: CategoryListProps;
  onChange: (updates: Partial<CategoryListProps>) => void;
  errors?: Partial<CategoryListProps>;
};

const CATEGORY_FIELDS = [
  {
    key: "cuisine" as keyof CategoryListProps,
    type: "CUISINE",
    placeholder: "Cuisine",
  },
  {
    key: "mealType" as keyof CategoryListProps,
    type: "MEAL_TYPE",
    placeholder: "Meal Type",
  },
  {
    key: "dietary" as keyof CategoryListProps,
    type: "DIETARY",
    placeholder: "Dietary",
  },
  {
    key: "method" as keyof CategoryListProps,
    type: "COOKING_METHOD",
    placeholder: "Method",
  },
  {
    key: "main" as keyof CategoryListProps,
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

  const handleTagChange = (key: keyof CategoryListProps, newValue: string) => {
    if (key === "dietary") {
      onChange({ dietary: newValue ? [newValue] : [] });
    } else {
      onChange({ [key]: newValue });
    }
  };

  const getTagValue = (key: keyof CategoryListProps) => {
    if (key === "dietary") {
      return value.dietary?.[0] || "";
    }
    return value[key] || "";
  };

  const getTagError = (key: keyof CategoryListProps) => {
    if (key === "dietary") {
      return errors?.dietary?.[0];
    }
    return errors?.[key];
  };

  return (
    <div className="space-y-4 mb-[80px]">
      <Label className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
        Categories
      </Label>

      <div>
        {CATEGORY_FIELDS.map((config) => (
          <CategoryItem
            key={config.key}
            value={getTagValue(config.key)}
            onChange={(newValue) => handleTagChange(config.key, newValue)}
            options={getCategoriesByType(config.type)}
            placeholder={config.placeholder}
            error={getTagError(config.key)}
          />
        ))}
      </div>
    </div>
  );
}