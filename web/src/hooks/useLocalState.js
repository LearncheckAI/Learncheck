// web/src/hooks/useLocalState.js
import { useState, useEffect } from "react";

export const useLocalState = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]); // ⬅️ tambahin key di dependency

  return [value, setValue];
};
