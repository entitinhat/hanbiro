import { useEffect, useRef } from 'react';

export function useDidMount() {
  const isMounted = useRef<any>(false);

  useEffect((): any => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return isMounted;
}
