import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const storeValue = (valueToStore: string) => {
    setValue(valueToStore);
    localStorage.setItem(key, valueToStore);
  };

  return [value, storeValue] as const;
}
