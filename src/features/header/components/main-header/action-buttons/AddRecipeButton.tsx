import { Button } from "@/components/ui/button";

type AddRecipeButtonProps = {
  className?: string;
  onClick?: () => void;
};

export default function AddRecipeButton({ onClick }: AddRecipeButtonProps) {
  return (
    <Button
      variant="secondary"
      size="lg"
      className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[48px] font-medium text-base sm:text-lg lg:text-xl xl:text-[22px] text-(--light-black-color) px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--gray-color) rounded-full cursor-pointer hover:bg-(--gray-hover-color) transition-colors"
      onClick={onClick}
    >
      <span>+ ADD A RECIPE</span>
    </Button>
  );
}
