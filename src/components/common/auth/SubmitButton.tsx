import React from "react";
import type { SubmitButtonProps } from "./type/authInterface";

const SubmitButton: React.FC<SubmitButtonProps> = ({ submitLoading, text }) => {
  return (
    <button
      type="submit"
      disabled={submitLoading}
      className={`${
        submitLoading ? "btn-auth-submit-disabled" : "btn-auth-submit"
      }`}
    >
      {submitLoading ? <div className="spinner"></div> : text}
    </button>
  );
};

export default SubmitButton;
