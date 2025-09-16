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
            className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[48px] font-(family-name:--poppins-medium) text-base sm:text-lg lg:text-xl xl:text-[22px] text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full"
            onClick={onClick}
        >
            <span style={{ fontFamily: "var(--poppins-medium)" }}>LOGIN/SIGNUP</span>
        </Button>
    );
}


