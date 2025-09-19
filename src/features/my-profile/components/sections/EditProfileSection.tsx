import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Sections from "@/features/my-profile/components/sections/Sections";
import { FormInput } from "@/components/common/FormInput";
import UserPhotoSvg from "@/assets/user-photo.svg";
import CameraIconSvg from "@/assets/camera-icon.svg";

function EditProfileSection() {
  const [firstName, setFirstName] = useState("Alina");
  const [lastName, setLastName] = useState("Dcruz");
  const [website, setWebsite] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [, setProfilePhoto] = useState<File | null>(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(
    null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const isSubmitting = false;
  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleSelectPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfilePhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePhotoPreview(null);
    }
  };

  return (
    <Sections title="Edit Your Profile">
      <section className="space-y-4">
        <h2 className="text-[32px] font-medium">Profile Photo</h2>
        <Button
          type="button"
          variant="default"
          className="relative w-[200px] h-[200px] p-0 overflow-visible [&>svg:nth-child(2)]:!w-full [&>svg:nth-child(2)]:!h-full [&>svg:last-child]:!w-[56px] [&>svg:last-child]:!h-[56px] border-none shadow-none"
          onClick={handleSelectPhoto}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {/* user-photo */}
          {profilePhotoPreview ? (
            <img
              src={profilePhotoPreview}
              alt="Profile preview"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <img src={UserPhotoSvg} alt="Default user photo" />
          )}
          {/* camera-icon */}
          <img src={CameraIconSvg} alt="Camera icon" className="absolute right-[10px] bottom-[10px] w-[58px] h-[58px]" />
        </Button>
      </section>

      <section className="space-y-12">
        <h2 className="text-[32px] font-medium">Profile Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            as="input"
            label="First Name"
            value={firstName}
            onChange={setFirstName}
            placeholder="First name"
            className="space-y-4"
          />
          <FormInput
            as="input"
            label="Last Name"
            value={lastName}
            onChange={setLastName}
            placeholder="Last name"
            className="space-y-4"
          />
        </div>
        <FormInput
          as="input"
          label="Website"
          value={website}
          onChange={setWebsite}
          placeholder="https://"
          className="space-y-4"
        />
        <FormInput
          as="textarea"
          label="About Me"
          value={aboutMe}
          onChange={setAboutMe}
          placeholder="Tell us about yourself"
          rows={5}
          className="space-y-4"
        />
        <div>
          <Button
            type="submit"
            disabled={isSubmitting || !canSubmit}
            className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[56px] font-medium text-base sm:text-lg lg:text-xl xl:text-[24px] text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full"
          >
            Update Profile
          </Button>
        </div>
      </section>
    </Sections>
  );
}

export default EditProfileSection;