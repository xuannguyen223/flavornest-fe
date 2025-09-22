import { useRef, useState, useCallback, useImperativeHandle, forwardRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { uploadImageToCDN } from "@/utils/CdnUtil";
import UserPhotoSvg from "@/assets/user-photo.svg";
import CameraIconSvg from "@/assets/camera-icon.svg";

type PhotoUploadProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  onImageUploaded?: (imageUrl: string) => void;
  avatarUrl?: string | null;
};

export type PhotoUploadRef = {
  uploadImage: () => Promise<string | null>;
};

export const PhotoUpload = forwardRef<PhotoUploadRef, PhotoUploadProps>(({
  value,
  onChange,
  onImageUploaded,
  avatarUrl,
}, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (avatarUrl && !value) {
      setImagePreview(avatarUrl);
    } else if (!avatarUrl && !value) {
      setImagePreview(null);
    }
  }, [avatarUrl, value]);

  const handleSelect = () => inputRef.current?.click();

  const uploadImage = useCallback(async (): Promise<string | null> => {
    if (!value || !onImageUploaded) {
      return null;
    }

    try {
      const imageUrl = await uploadImageToCDN(value);
      onImageUploaded(imageUrl);
      console.log("Profile Image Url: ", imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading profile image to CDN:", error);
      throw error;
    }
  }, [value, onImageUploaded]);

  useImperativeHandle(ref, () => ({
    uploadImage,
  }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFile(file);
  };

  const handleFile = (file: File | null) => {
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
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* <h2 className="text-[32px] font-medium">Profile Photo</h2> */}
      <Button
        type="button"
        variant="default"
        className={`relative w-[200px] h-[200px] p-0 overflow-visible [&>svg:nth-child(2)]:!w-full [&>svg:nth-child(2)]:!h-full [&>svg:last-child]:!w-[56px] [&>svg:last-child]:!h-[56px] border-none shadow-none ${
          dragActive ? "opacity-50" : ""
        }`}
        onClick={handleSelect}
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
          <img
            src={imagePreview}
            alt="Profile preview"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <img src={UserPhotoSvg} alt="Default user photo" />
        )}
        <img 
          src={CameraIconSvg} 
          alt="Camera icon" 
          className="absolute right-[10px] bottom-[10px] w-[58px] h-[58px]" 
        />
      </Button>
    </div>
  );
});