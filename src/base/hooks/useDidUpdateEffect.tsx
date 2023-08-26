import { useEffect, useRef } from 'react';

export default function useDidUpdateEffect(fn: () => void, inputs: any, times: any = 1) {
  const firstUpdate = useRef<any>(times);
  useEffect(() => {
    if (firstUpdate.current === 0) {
      fn();
      return;
    }

    firstUpdate.current--;
  }, inputs);
}
