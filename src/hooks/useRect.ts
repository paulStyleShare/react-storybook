import { RefObject, useEffect, useRef, useState } from 'react';

type ClientRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

function useRect<T extends HTMLElement>(): [ClientRect | null, RefObject<T>] {
  const [rect, setRect] = useState<null | ClientRect>(null);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current !== null) {
      setRect(ref.current.getBoundingClientRect() as ClientRect);
    }
  }, [ref]);

  return [rect, ref];
}

export default useRect;
