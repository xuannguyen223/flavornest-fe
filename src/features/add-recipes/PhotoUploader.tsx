import {
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Button } from "@/components/ui/button";
import { uploadImageToCDN } from "@/utils/CdnUtil";
import { Label } from "@radix-ui/react-label";

type PhotoUploaderProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  onImageUploaded?: (imageUrl: string) => void;
};

export type PhotoUploaderRef = {
  uploadImage: () => Promise<string | null>;
  reset: () => void;
};

export const PhotoUploader = forwardRef<PhotoUploaderRef, PhotoUploaderProps>(
  ({ value, onChange, onImageUploaded }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleSelect = () => inputRef.current?.click();

    const uploadImage = useCallback(async (): Promise<string | null> => {
      if (!value || !onImageUploaded) {
        return null;
      }

      try {
        const imageUrl = await uploadImageToCDN(value);
        onImageUploaded(imageUrl);
        console.log("Image Url: ", imageUrl);
        return imageUrl;
      } catch (error) {
        console.error("Error uploading image to CDN:", error);
        throw error;
      }
    }, [value, onImageUploaded]);

    const reset = useCallback(() => {
      setImagePreview(null);
      setDragActive(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }, []);

    useImperativeHandle(ref, () => ({
      uploadImage,
      reset,
    }));

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      handleFile(file);
    };

    const handleFile = useCallback(
      (file: File | null) => {
        onChange(file);
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreview(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setImagePreview(null);
        }
      },
      [onChange]
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
      <>
        <Label className="block font-medium text-lg sm:text-xl lg:text-2xl xl:text-[24px] mb-2">
          Cover Photo
          <span className="text-(--required-color)">*</span>
        </Label>

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
                  src="public/add.svg"
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
                    src="public/add.svg"
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
      </>
    );
  }
);
