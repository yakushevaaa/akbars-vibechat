import { useEffect } from "react";

export function useKeyPress(targetKey, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === targetKey) {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, callback]);
}
