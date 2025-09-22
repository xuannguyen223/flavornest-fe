import { useAppDispatch } from "@/store/hooks";
import { updateIngredient } from "@/store/features/recipeSlice";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/FormInput";
import { FormSelect } from "@/components/common/FormSelect";
import type { Ingredient } from "@/types/TypeRecipe";

type ReduxIngredientRowProps = {
  ingredient: Ingredient;
  onRemove: () => void;
  dragHandleProps?: any;
};

const UNITS = [
  "cup",
  "cups",
  "tbsp",
  "tsp",
  "oz",
  "lb",
  "g",
  "kg",
  "ml",
  "l",
  "piece",
  "pieces",
  "clove",
  "cloves",
  "can",
  "cans",
  "bunch",
  "pinch",
];

export function ReduxIngredient({
  ingredient,
  onRemove,
  dragHandleProps,
}: ReduxIngredientRowProps) {
  const dispatch = useAppDispatch();

  const handleChange = (fieldName: keyof Ingredient, value: string | number) => {
    dispatch(
      updateIngredient({
        id: ingredient.id.toString(),
        updates: { [fieldName]: value },
      })
    );
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 p-2 min-w-0">
      <div {...dragHandleProps} className="cursor-grab flex-shrink-0">
        <img src="public/re-order icon.svg"/>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-1 min-w-0">
        <FormInput
          as="input"
          value={ingredient.quantity}
          onChange={(v) => handleChange("quantity", Number(v))}
          placeholder="Qty"
          className="flex-shrink-0"
          inputClassName="w-20 lg:w-24 xl:w-[134px] h-12 sm:h-14 lg:h-16 xl:h-[68px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
        />

        <FormSelect
          value={ingredient.unit}
          onChange={(v) => handleChange("unit", v)}
          options={UNITS}
          placeholder="Measurement"
          className="flex-shrink-0"
          selectClassName="h-12 sm:h-14 lg:h-16 xl:h-[68px] w-32 lg:w-40 xl:w-[200px] rounded-[5px] px-4 text-base sm:text-lg lg:text-xl xl:text-[20px]"
        />

        <FormInput
          as="input"
          value={ingredient.name}
          onChange={(v) => handleChange("name", v)}
          placeholder="Item"
          className="flex-1 min-w-0"
          inputClassName="w-full h-12 sm:h-14 lg:h-16 xl:h-[68px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
        />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-8 w-8 p-0 flex-shrink-0 flex items-center justify-center"
      >
        <img src="public/remove-icon.svg" alt="Remove ingredient" />
      </Button>
    </div>
  );
}