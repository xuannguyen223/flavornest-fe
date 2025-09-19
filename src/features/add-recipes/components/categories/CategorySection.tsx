import { Label } from "@radix-ui/react-label";
import { CategoryItem } from "./CategoryItem";

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
    options: [
      "Italian",
      "Korean",
      "Mexican",
      "French",
      "Chinese",
      "American",
      "Indian",
      "Mediterranean",
      "Thai",
      "Greek",
      "Vietnamese",
      "Spanish",
      "Japanese",
      "German",
    ],
    placeholder: "Cuisine",
  },
  {
    key: "mealType" as keyof CategoryListProps,
    options: [
      "Breakfast",
      "Brunch",
      "Lunch",
      "Dinner",
      "Dessert",
      "Snack",
      "Appetizer",
      "Beverage",
    ],
    placeholder: "Meal Type",
  },
  {
    key: "dietary" as keyof CategoryListProps,
    options: [
      "Low-Carb",
      "Keto",
      "Gluten-Free",
      "Dairy-Free",
      "High-Protein",
      "Paleo",
      "Vegetarian",
      "Nut-Free",
      "Low-Sodium",
    ],
    placeholder: "Dietary",
  },
  {
    key: "method" as keyof CategoryListProps,
    options: [
      "Baking",
      "Grilling",
      "Frying",
      "Boiling",
      "Steaming",
      "Sautéing",
      "Roasting",
      "Slow Cooking",
      "Pressure Cooking",
      "Raw",
    ],
    placeholder: "Method",
  },
  {
    key: "main" as keyof CategoryListProps,
    options: [
      "Chicken",
      "Beef",
      "Pork",
      "Fish",
      "Beans",
      "Vegetables",
      "Cheese",
      "Seafood",
      "Eggs",
      "Tofu",
      "Rice",
      "Pasta",
      "Fruits",
      "Nuts",
    ],
    placeholder: "Main Ingredient",
  },
];

export function CategorySection({ value, onChange, errors }: CategorySectionProps) {
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
            options={config.options}
            placeholder={config.placeholder}
            error={getTagError(config.key)}
          />
        ))}
      </div>
    </div>
  );
}
