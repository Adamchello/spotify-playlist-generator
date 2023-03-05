import { useRef } from 'react';

function useIsMounted(): boolean {
  const isMounted = useRef(false);

  if (!isMounted.current) {
    isMounted.current = true;
    return true;
  }

  return isMounted.current;
}

export default useIsMounted;
