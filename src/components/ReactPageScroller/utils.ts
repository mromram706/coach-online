import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export const isNil = (value: any): boolean => value === undefined || value === null;

export const isPositiveNumber = (value: number): boolean => value > 0;
