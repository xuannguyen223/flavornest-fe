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
      className="
        h-7 px-4 sm:px-6 
        text-sm font-medium text-(--light-black-color) 
        bg-(--gray-color) rounded-full 
        cursor-pointer hover:bg-neutral-200 transition-colors"
      onClick={onClick}
    >
      <span>+ ADD A RECIPE</span>
    </Button>
  );
}
