import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type Handler = (e: any) => void;
type Validator = (value: any) => boolean;
type ReturnTypes<T> = [T, Handler, Dispatch<SetStateAction<T>>];

const useInput = <T>(initialValue: T, validator?: Validator): ReturnTypes<T> => {
  const [value, setValue] = useState<T>(initialValue);
  const handler = useCallback((e: any) => {
    const {
      target: { value },
    } = e;
    let willUpdate = true;

    if (validator) {
      willUpdate = validator(value);
    }

    if (willUpdate) {
      setValue(value);
    }
  }, []);

  return [value, handler, setValue];
};

export default useInput;
