import { DatasPromise } from '@base/types/response';
import { useEffect } from 'react';
import { useForms } from './useForms';

export const GetDataForm = (component: string, editor: any) => {
  const { data } = useForms();

  useEffect(() => {
    if (data && data?.data?.length !== 0) replaceFormOptions(component, editor, data);
  }, [data, component]);
};



export const replaceFormOptions = (component: string, editor: any, data: DatasPromise<any[]>) => {};
