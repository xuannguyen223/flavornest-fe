import { Label } from "@radix-ui/react-label";
import { TagSelect } from "./TagSelect";

type TagsValue = {
  cuisine?: string;
  mealType?: string;
  dietary?: string[];
  method?: string;
  main?: string;
};

type TagsSectionProps = {
  value: TagsValue;
  onChange: (updates: Partial<TagsValue>) => void;
  errors?: Partial<TagsValue>;
};

const TAG_FIELDS = [
  {
    key: 'cuisine' as keyof TagsValue,
    options: [
      "American", "Italian", "Mexican", "Chinese", "Japanese", "Indian", "French", 
      "Thai", "Mediterranean", "Korean", "Vietnamese", "Greek", "Spanish", "German"
    ],
    placeholder: "Cuisine"
  },
  {
    key: 'mealType' as keyof TagsValue,
    options: [
      "Breakfast", "Lunch", "Dinner", "Snack", "Appetizer", "Dessert", "Beverage"
    ],
    placeholder: "Meal Type"
  },
  {
    key: 'dietary' as keyof TagsValue,
    options: [
      "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Keto", 
      "Paleo", "Low-Carb", "High-Protein", "Low-Sodium"
    ],
    placeholder: "Dietary"
  },
  {
    key: 'method' as keyof TagsValue,
    options: [
      "Baking", "Grilling", "Frying", "Boiling", "Steaming", "Sautéing", 
      "Roasting", "Slow Cooking", "Pressure Cooking", "Raw"
    ],
    placeholder: "Method"
  },
  {
    key: 'main' as keyof TagsValue,
    options: [
      "Chicken", "Beef", "Pork", "Fish", "Seafood", "Eggs", "Tofu", "Beans", 
      "Rice", "Pasta", "Vegetables", "Fruits", "Cheese", "Nuts"
    ],
    placeholder: "Main Ingredient"
  }
];

export function TagsSection({ value, onChange, errors }: TagsSectionProps) {
  const handleTagChange = (key: keyof TagsValue, newValue: string) => {
    if (key === 'dietary') {
      onChange({ dietary: newValue ? [newValue] : [] });
    } else {
      onChange({ [key]: newValue });
    }
  };

  const getTagValue = (key: keyof TagsValue) => {
    if (key === 'dietary') {
      return value.dietary?.[0] || "";
    }
    return value[key] || "";
  };

  const getTagError = (key: keyof TagsValue) => {
    if (key === 'dietary') {
      return errors?.dietary?.[0];
    }
    return errors?.[key];
  };

  return (
    <div className="space-y-4 mb-[80px]">
      <Label className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
        Tags
      </Label>
      
      <div>
        {TAG_FIELDS.map((config) => (
          <TagSelect
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

