import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

/**
 * A custom hook that syncs state with localStorage so selections and match progress
 * are never lost when navigating between sections or reloading the application.
 */
export function useStickyState<T>(defaultValue: T, key: string): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') return defaultValue;
      const stickyValue = window.localStorage.getItem(`homm_oe_${key}`);
      return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(`homm_oe_${key}`, JSON.stringify(value));
      }
    } catch (error) {
      console.warn(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
