import { useEffect, useRef } from 'react';

const useClickOutside = (handler: () => void) => {
  const myRef = useRef<(HTMLElement | null)[]>([]);
  console.log(myRef.current);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const clickedInside = myRef?.current?.some(
        (el: HTMLElement | null) => el && el.contains(event.target as Node)
      );

      if (!clickedInside) {
        handler();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [myRef, handler]);

  return { myRef };
};

export default useClickOutside;
