import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type BaseProps = {
  label?: string;
  required?: boolean;
  error?: string;
  className?: string;
};

type TextInputProps = BaseProps & {
  type?: "text" | "number";
  value: string | number | "";
  onChange: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  as?: "input";
};

type TextAreaProps = BaseProps & {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  inputClassName?: string;
  as: "textarea";
};

type FormInputProps = TextInputProps | TextAreaProps;

export function FormInput(props: FormInputProps) {
  const {
    label,
    required,
    error,
    className,
  } = props;

  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <Label className="font-medium text-base sm:text-lg lg:text-xl xl:text-[24px]">
          {label}
          {required ? <span className="text-(--required-color)">*</span> : null}
        </Label>
      ) : null}

      {props.as === "textarea" ? (
        <Textarea
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          rows={(props as TextAreaProps).rows ?? 4}
          className={cn(
            "h-32 sm:h-40 lg:h-48 xl:h-[230px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]",
            props.inputClassName
          )}
        />
      ) : (
        <Input
          type={(props as TextInputProps).type ?? "text"}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={(props as TextInputProps).placeholder}
          className={cn(
            "h-12 sm:h-14 lg:h-16 xl:h-[74px] placeholder:text-(--light-gray-color) text-(--primary-color) text-base sm:text-lg lg:text-xl xl:text-[20px] border-1 border-solid border-(--border-color) rounded-[10px]",
            props.inputClassName
          )}
        />
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default FormInput;




