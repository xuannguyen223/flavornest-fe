import { useRef } from "react";
import { Button } from "@/components/ui/button";

type PhotoUploaderProps = {
  value: File | null;
  onChange: (file: File | null) => void;
};

export function PhotoUploader({ value, onChange }: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelect = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <div className="w-full h-32 sm:h-40 lg:h-48 xl:h-[200px] bg-(--accent-color) rounded-lg grid place-items-center border-3 border-dashed border-(--border-color)">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="flex items-center gap-3 bg-(--primary-color) rounded-full">
        <Button
          type="button"
          size="sm"
          onClick={handleSelect}
          className="font-medium text-sm sm:text-base lg:text-lg xl:text-[20px] text-white px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-6 flex gap-2 sm:gap-3"
        >
          <img src="src/assets/add.svg" alt="Add photo icon" className="w-6 sm:w-7 lg:w-8"/>
          <div className="block">Add a photo</div>
        </Button>
        {value ? <span className="text-sm">{value.name}</span> : null}
      </div>
    </div>
  );
}

