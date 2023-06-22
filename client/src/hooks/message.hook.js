import { useCallback } from "react";

export const useMassage = () => {
  return useCallback((text) => {
    if (window.M && text) {
      window.M.toast({ html: text });
    }
  }, []);
};
