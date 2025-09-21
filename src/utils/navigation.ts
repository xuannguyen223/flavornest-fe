import type { NavigateFunction } from "react-router-dom";

/**
 * Điều hướng về trang trước nếu có, ngược lại về home.
 */
export const handleNavigateUtil = (navigate: NavigateFunction) => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate("/");
  }
};
