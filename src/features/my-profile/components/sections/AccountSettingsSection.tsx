import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Sections from "@/features/my-profile/components/sections/Sections";
import FormInput from "@/components/common/FormInput";
import { useState } from "react";

function AccountSettingsSection() {
  const [email, setEmail] = useState("alinadcruz@example.com");
  const navigate = useNavigate();
  return (
    <Sections title="Account Settings">
      <div className="space-y-2">
        <FormInput
          as="input"
          label="Email"
          value={email}
          onChange={setEmail}
          placeholder="Email"
          className="space-y-4"
        />
      </div>

      <section className="space-y-3">
        <h2 className="text-[22px] font-medium text-(--light-black-color)">
          Password
        </h2>
        <p className="text-[20px] text-(--shadow-gray-color)">
          Your security is our priority. Click the button below and we'll send a
          password reset link to your email address.
        </p>
        <Button
          type="submit"
          className="w-full sm:w-auto h-12 sm:h-14 lg:h-16 xl:h-[56px] font-medium text-base sm:text-lg lg:text-xl xl:text-[24px] text-white px-4 sm:px-5 py-3 sm:py-4 lg:py-5 xl:py-6 bg-(--primary-color) rounded-full mt-4"
          onClick={() => navigate("/reset-password")}
        >
          Reset Password
        </Button>
      </section>
    </Sections>
  );
}

export default AccountSettingsSection;