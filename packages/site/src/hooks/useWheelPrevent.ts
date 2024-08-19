import { useEffect, useRef } from 'react';

export const useWheelPrevent = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onWheel = (event: WheelEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    const ac = new AbortController();
    inputRef.current?.addEventListener('wheel', onWheel, {
      signal: ac.signal,
      passive: false,
    });
    return () => ac.abort();
  }, []);

  return inputRef;
};
