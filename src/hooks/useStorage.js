import { useState, useEffect } from "react";

const PREFIX = "chat-";

export function useStorage(key, initialState) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialState === "function") {
      return initialState();
    } else {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
