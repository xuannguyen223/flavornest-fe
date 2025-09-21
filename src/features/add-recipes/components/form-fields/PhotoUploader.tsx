import { useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { uploadImageToCDN } from "@/utils/CdnUtil";

type PhotoUploaderProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  onImageUploaded?: (imageUrl: string) => void;
};

export function PhotoUploader({
  value,
  onChange,
  onImageUploaded,
}: PhotoUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSelect = () => inputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleFile = useCallback(
    async (file: File | null) => {
      onChange(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);

        // Upload to CDN
        if (onImageUploaded) {
          try {
            const imageUrl = await uploadImageToCDN(file);
            onImageUploaded(imageUrl);
            console.log("Image Url: ", imageUrl);
          } catch (error) {
            console.error("Error uploading image to CDN:", error);
          }
        }
      } else {
        setImagePreview(null);
      }
    },
    [onChange, onImageUploaded]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          handleFile(file);
        }
      }
    },
    [handleFile]
  );

  const handleRemove = () => {
    handleFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={`w-full rounded-lg border-3 border-dashed relative ${
        imagePreview
          ? "border-transparent h-auto"
          : `bg-(--accent-color) border-(--border-color) h-[200px] ${
              dragActive ? "border-(--primary-color) bg-opacity-50" : ""
            }`
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {imagePreview ? (
        <>
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-auto object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center transition-colors"
            title="Remove image"
          >
            <img
              src="src/assets/add.svg"
              alt="Remove"
              className="w-8 h-8 rotate-45"
            />
          </button>
        </>
      ) : (
        <div className="h-full grid place-items-center">
          <div className="flex items-center gap-3 bg-(--primary-color) rounded-full">
            <Button
              type="button"
              size="sm"
              onClick={handleSelect}
              className="font-medium text-sm sm:text-base lg:text-lg xl:text-[20px] text-white px-3 sm:px-4 lg:px-5 py-3 sm:py-4 lg:py-6 flex gap-2 sm:gap-3"
            >
              <img
                src="src/assets/add.svg"
                alt="Add photo icon"
                className="w-6 sm:w-7 lg:w-8"
              />
              <div className="block">Add a photo</div>
            </Button>
            {value ? <span className="text-sm">{value.name}</span> : null}
          </div>
        </div>
      )}
    </div>
  );
}
