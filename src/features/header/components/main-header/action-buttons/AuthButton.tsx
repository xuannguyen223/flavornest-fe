import { Button } from "@/components/ui/button";

type AuthButtonProps = {
  className?: string;
  onClick?: () => void;
};

export default function AuthButton({ onClick }: AuthButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className="
        h-7 px-4 sm:px-6 
        text-sm font-medium text-white 
        bg-(--primary-color) rounded-full 
        cursor-pointer hover:bg-neutral-400 transition-colors"
      onClick={onClick}
    >
      <span>LOGIN/SIGNUP</span>
    </Button>
  );
}
