import { useAppDispatch } from "@/store/hooks";
import { updateStep } from "@/store/features/recipeSlice";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/common/FormInput";
import type { InstructionStep } from "@/store/features/recipeSlice";

type ReduxInstructionStepProps = {
  step: InstructionStep;
  stepNumber: number;
  onRemove: () => void;
  dragHandleProps?: any;
};

export function ReduxInstruction({
  step,
  stepNumber,
  onRemove,
  dragHandleProps,
}: ReduxInstructionStepProps) {
  const dispatch = useAppDispatch();

  const handleTextChange = (value: string) => {
    dispatch(updateStep({ id: step.id, text: value }));
  };

  return (
    <div className="flex gap-2 sm:gap-3 p-2 min-w-0">
      <div
        {...dragHandleProps}
        className="cursor-grab flex-shrink-0 flex items-center"
      >
        <img src="src/assets/re-order icon.svg" alt="" className="w-6 sm:w-8" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 sm:gap-3 mb-2">
          <span className="font-(family-name:--poppins-medium) text-base sm:text-lg lg:text-xl xl:text-[20px] text-(--primary-color) flex-shrink-0">
            Step {stepNumber}
          </span>
        </div>
        <FormInput
          as="textarea"
          value={step.text}
          onChange={handleTextChange}
          placeholder="Describe this step in detail..."
          inputClassName="w-full h-24 sm:h-28 lg:h-32 xl:h-[140px] font-(family-name:--poppins-regular) placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]"
          rows={4}
        />
      </div>

      <div className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="h-8 w-8 p-0 flex-shrink-0"
        >
          <img src="src\assets\remove-icon.svg" alt="" />
        </Button>
      </div>
    </div>
  );
}
