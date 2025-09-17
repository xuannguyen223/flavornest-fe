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

const CUISINE_OPTIONS = [
  "American", "Italian", "Mexican", "Chinese", "Japanese", "Indian", "French", 
  "Thai", "Mediterranean", "Korean", "Vietnamese", "Greek", "Spanish", "German"
];

const MEAL_TYPE_OPTIONS = [
  "Breakfast", "Lunch", "Dinner", "Snack", "Appetizer", "Dessert", "Beverage"
];

const DIETARY_OPTIONS = [
  "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Keto", 
  "Paleo", "Low-Carb", "High-Protein", "Low-Sodium"
];

const COOKING_METHOD_OPTIONS = [
  "Baking", "Grilling", "Frying", "Boiling", "Steaming", "Sautéing", 
  "Roasting", "Slow Cooking", "Pressure Cooking", "Raw"
];

const MAIN_INGREDIENT_OPTIONS = [
  "Chicken", "Beef", "Pork", "Fish", "Seafood", "Eggs", "Tofu", "Beans", 
  "Rice", "Pasta", "Vegetables", "Fruits", "Cheese", "Nuts"
];

export function TagsSection({ value, onChange, errors }: TagsSectionProps) {
  return (
    <div className="space-y-4 mb-[80px]">
      <Label className="flex font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px]">
        Tags
      </Label>
      
      <div>
        <TagSelect
          value={value.cuisine || ""}
          onChange={(cuisine) => onChange({ cuisine })}
          options={CUISINE_OPTIONS}
          placeholder="Cuisine"
          error={errors?.cuisine}
        />
        
        <TagSelect
          value={value.mealType || ""}
          onChange={(mealType) => onChange({ mealType })}
          options={MEAL_TYPE_OPTIONS}
          placeholder="Meal Type"
          error={errors?.mealType}
        />
        
        <TagSelect
          value={value.dietary?.[0] || ""}
          onChange={(dietary) => onChange({ dietary: dietary ? [dietary] : [] })}
          options={DIETARY_OPTIONS}
          placeholder="Dietary"
          error={errors?.dietary?.[0]}
        />
        
        <TagSelect
          value={value.method || ""}
          onChange={(method) => onChange({ method })}
          options={COOKING_METHOD_OPTIONS}
          placeholder="Method"
          error={errors?.method}
        />
        
        <TagSelect
          value={value.main || ""}
          onChange={(main) => onChange({ main })}
          options={MAIN_INGREDIENT_OPTIONS}
          placeholder="Main Ingredient"
          error={errors?.main}
        />
      </div>
    </div>
  );
}

