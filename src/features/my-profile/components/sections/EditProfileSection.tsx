import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Sections from "@/features/my-profile/components/sections/Sections";
import { FormInput } from "@/components/common/FormInput";

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
            <svg
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block w-full h-full"
            >
              <rect width="200" height="200" rx="100" fill="#D9D9D9" />
              <circle
                cx="99.999"
                cy="76.6299"
                r="21.1112"
                fill="white"
                stroke="white"
                strokeWidth="1.6"
              />
              <path
                d="M100 105.183C112.418 105.183 123.621 107.457 131.69 111.102C139.834 114.779 144.482 119.695 144.482 124.833C144.482 129.971 139.834 134.887 131.69 138.564C123.621 142.209 112.418 144.483 100 144.483C87.5822 144.483 76.3787 142.209 68.3096 138.564C60.1663 134.887 55.5166 129.971 55.5166 124.833C55.5167 119.695 60.1664 114.779 68.3096 111.102C76.3787 107.458 87.5823 105.183 100 105.183Z"
                fill="white"
                stroke="white"
                strokeWidth="1.6"
              />
            </svg>
          )}
          {/* camera-icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            className="absolute right-[10px] bottom-[10px]"
          >
            <rect
              x="1.12305"
              y="1.23438"
              width="55.6038"
              height="55.6038"
              rx="27.8019"
              fill="white"
            />
            <rect
              x="1.12305"
              y="1.23438"
              width="55.6038"
              height="55.6038"
              rx="27.8019"
              stroke="#1D1D1D"
            />
            <path
              d="M17.3129 17.4223H21.6671L24.5698 14.5195H33.2781L36.1808 17.4223H40.535C41.3048 17.4223 42.0432 17.7281 42.5875 18.2725C43.1319 18.8169 43.4377 19.5552 43.4377 20.325V37.7416C43.4377 38.5114 43.1319 39.2498 42.5875 39.7941C42.0432 40.3385 41.3048 40.6443 40.535 40.6443H17.3129C16.5431 40.6443 15.8047 40.3385 15.2604 39.7941C14.716 39.2498 14.4102 38.5114 14.4102 37.7416V20.325C14.4102 19.5552 14.716 18.8169 15.2604 18.2725C15.8047 17.7281 16.5431 17.4223 17.3129 17.4223ZM28.9239 21.7764C26.9993 21.7764 25.1535 22.541 23.7925 23.9019C22.4316 25.2629 21.6671 27.1087 21.6671 29.0333C21.6671 30.958 22.4316 32.8038 23.7925 34.1647C25.1535 35.5256 26.9993 36.2902 28.9239 36.2902C30.8486 36.2902 32.6944 35.5256 34.0553 34.1647C35.4163 32.8038 36.1808 30.958 36.1808 29.0333C36.1808 27.1087 35.4163 25.2629 34.0553 23.9019C32.6944 22.541 30.8486 21.7764 28.9239 21.7764ZM28.9239 24.6792C30.0787 24.6792 31.1862 25.1379 32.0028 25.9545C32.8193 26.771 33.2781 27.8785 33.2781 29.0333C33.2781 30.1881 32.8193 31.2956 32.0028 32.1122C31.1862 32.9287 30.0787 33.3875 28.9239 33.3875C27.7692 33.3875 26.6617 32.9287 25.8451 32.1122C25.0285 31.2956 24.5698 30.1881 24.5698 29.0333C24.5698 27.8785 25.0285 26.771 25.8451 25.9545C26.6617 25.1379 27.7692 24.6792 28.9239 24.6792Z"
              fill="#1D1D1D"
            />
          </svg>
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