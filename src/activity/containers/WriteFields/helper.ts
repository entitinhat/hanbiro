import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UseFormSetValue } from 'react-hook-form';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';

export const getSelectionFields = (setValue: UseFormSetValue<any>, key: string, query: string, options?: any) => {
  const { t } = useTranslation();
  const { data } = useSelectionFields(
    {
      filter: { query: query }
    },
    options
  );

  useEffect(() => {
    if (data && data.data) {
      const foundDefault = data.data.find((v: any) => v.isDefault);
      if (foundDefault) {
        const o = {
          ...foundDefault,
          id: foundDefault.id,
          languageKey: t(foundDefault.languageKey)
        };
        setValue(key, o);
      }
    }
  }, [data]);

  const defaultOptions = useMemo(() => {
    if (data && data.data) {
      return data.data.map((v: any) => ({
        ...v,
        languageKey: t(v.languageKey),
        id: v.id
      }));
    }
    return [];
  }, [data]);

  return defaultOptions;
};
