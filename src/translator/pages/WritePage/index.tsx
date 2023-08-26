import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslatorEditorMutations } from '@base/hooks/translator-editor/useTranslatorEditorMutations';
import { Box, Button, Grid, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { menuData } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';
import LanguageForm from '@base/containers/TranslatorEditor/TranslatorEditorModal/LanguageForm';
import { Keylang } from '@translator/types';

//NEW constant
interface LanguageModalProps {
  value: Keylang;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

const LanguageModal = (props: LanguageModalProps) => {
  const { value, isOpen, onClose, refetch } = props;
  console.log('input value', value);
  const theme = useTheme();

  // form defaultValue
  const formDefaultValue = {
    system: { value: 'all', label: 'All' },
    id: '',
    menu: { ...menuData[0], keyName: menuData[0].value, languageKey: menuData[0].label },
    en: '',
    ko: '',
    vi: '',
    jp: '',
    ch: '',
    zh: '',
    ido: '',
    langKey: ''
  };

  //state
  const [keyword, setKeyword] = useState<string>(value.langKey);
  const [langValueError, setLangValueError] = useState<boolean>(false);

  //react-hook-form
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: value,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  const formValue: any = watch();

  // mutation
  const { mutationAdd, mutationUpdate } = useTranslatorEditorMutations();

  //check success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      // handleReset();
      onClose();

      reset();
      refetch();
    }
  }, [mutationAdd.isSuccess]);

  useEffect(() => {
    if (mutationUpdate.isSuccess) {
      // handleReset();
      onClose();

      reset();
      refetch();
    }
  }, [mutationUpdate.isSuccess]);

  //validate data
  const checkLangValueError = useMemo(() => {
    const nValue = { ...formValue };
    delete nValue.id;
    delete nValue.menu;
    delete nValue.langKey;
    delete nValue.system;
    let hasError = true;
    for (const key in nValue) {
      if (nValue[key] !== '') {
        hasError = false;
      }
    }
    return hasError;
  }, [formValue]);

  //save translate
  const onSubmit = async (data: any) => {
    if (checkLangValueError) {
      setLangValueError(true);
      return;
    }
    const newParams: any = {
      ...data,
      system: data?.system.value,
      menu: data?.menu.value
    };

    if (data.id === '') {
      delete newParams.id;
      mutationAdd.mutate({ systemLanguage: newParams });
    } else {
      mutationUpdate.mutate({ systemLanguage: newParams });
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  // mimodal footer
  const Footer = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                // setIsReset(false);
                handleSubmit((data) => onSubmit(data), onError)();
              }}
              disabled={mutationAdd.isLoading || mutationUpdate.isLoading || !isValid}
            >
              Save
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }, [mutationAdd.isLoading, mutationUpdate.isLoading, isValid]); //

  //main render
  return (
    <MiModal fullScreen={false} title={'Translator'} size="md" isOpen={isOpen} onClose={onClose} footer={Footer}>
      <Box p={2}>
        {/* write form */}
        <form
          onSubmit={() => {
            handleSubmit(onSubmit, onError);
          }}
        >
          <LanguageForm
            isCopy={true}
            closeModal={onClose}
            langValueError={langValueError}
            checkLangValueError={checkLangValueError}
            control={control}
            errors={errors}
            watch={watch}
            reset={reset}
            setValue={setValue}
          />
        </form>
      </Box>
    </MiModal>
  );
};

export default LanguageModal;
