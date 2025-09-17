import { Button } from "@/components/ui/button";

type FormActionsProps = {
  onCancel?: () => void;
  isSubmitting?: boolean;
  canSubmit?: boolean;
};

export function FormActions({
  onCancel,
  isSubmitting,
  canSubmit = true,
}: FormActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-end gap-3 sm:gap-4 lg:gap-5 xl:gap-[20px]">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
        className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[56px] font-medium text-base sm:text-lg lg:text-xl xl:text-[24px] text-(--primary-color) px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 border-[2px] border-(--second-color) rounded-full"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isSubmitting || !canSubmit}
        className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[56px] font-medium text-base sm:text-lg lg:text-xl xl:text-[24px] text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full"
      >
        Submit Recipe
      </Button>
    </div>
  );
}
