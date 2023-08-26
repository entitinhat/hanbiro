import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import MiModal from '@base/components/@hanbiro/MiModal';
import { useTranslatorEditorMutations } from '@base/hooks/translator-editor/useTranslatorEditorMutations';
import { useTranslatorEditors } from '@base/hooks/translator-editor/useTranslatorEditors';
import { Search } from '@mui/icons-material';
import { Box, Button, Grid, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import _ from 'lodash';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import LanguageForm from './LanguageForm';
import LanguageListSearch from './LanguageListSearch';
import { menuData } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';

//NEW constant

const LanguageModal = (props: any) => {
  const {
    showModal,
    translateWords,
    // keyTranslateWords,
    // isKey,
    closeModalLanguage
  } = props;
  console.log('translator props', props);
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
  const [keyword, setKeyword] = useState<string>(translateWords);
  const [dataListSearch, setDataListSearch] = useState<any>([]);
  const [langValueError, setLangValueError] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>(keyword);
  const setSearchTextDebounced = useRef(_.debounce((text) => setKeyword(text), 1500)).current;

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
    defaultValues: formDefaultValue,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  /** hook get data */
  const { data, isLoading, refetch } = useTranslatorEditors(keyword);

  const formValue: any = watch();

  // mutation
  const { mutationAdd, mutationUpdate } = useTranslatorEditorMutations();

  //check success
  useEffect(() => {
    if (mutationAdd.isSuccess) {
      // handleReset();
      reset();
      refetch();
    }
  }, [mutationAdd.isSuccess]);

  useEffect(() => {
    if (mutationUpdate.isSuccess) {
      // handleReset();
      reset();
      refetch();
    }
  }, [mutationUpdate.isSuccess]);

  //set search results
  useEffect(() => {
    if (data?.data) {
      setDataListSearch(data.data);
    } else {
      setDataListSearch([]);
    }
  }, [data]);

  //set keywords
  useEffect(() => {
    let initKeyword = '';
    if (translateWords.split('.').length > 1) {
      //this is lang key
      initKeyword = translateWords.split('.')[1];
    } else {
      //search test
      initKeyword = translateWords;
    }
    //set search text
    setKeyword(initKeyword);
    // resetNewLang();
    reset();

    //loadList(initKeyword);
  }, [translateWords]);

  // search
  const handleChangeSearch = (e: any) => {
    setSearchText(e.target.value);
    setSearchTextDebounced(e.target.value);
  };

  //key press enter
  const handkeKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  //validate data
  const checkLangValueError = useMemo(() => {
    const nValue = { ...data };
    console.log('nValue validate', nValue);
    delete nValue.id;
    delete nValue.menu;
    delete nValue.langKey;
    delete nValue.system;
    let hasError = false;
    for (const key in nValue) {
      if (nValue[key] === '') {
        console.log('nValue[key]', key, nValue[key]);
        hasError = true;
      }
    }
    return hasError;
  }, [formValue]);

  //save translate
  const onSubmit = async (data: any) => {
    console.log('onSubmit', data, checkLangValueError);
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
            <Button size="small" color="secondary" variant="outlined" onClick={closeModalLanguage}>
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
    <MiModal title={'Translate Search'} size="lg" isOpen={showModal} onClose={closeModalLanguage} footer={Footer}>
      <Box p={2}>
        <Stack direction="row" width={'100%'} alignItems={'center'}>
          <Box sx={{ flexGrow: 1 }}>
            <OutlinedInput
              onChange={handleChangeSearch}
              value={searchText}
              onKeyPress={handkeKeyPress}
              sx={{
                bgcolor: (t) => t.palette.grey[50],
                width: '100%'
              }}
              placeholder="Search ..."
              endAdornment={
                <Search
                  sx={{
                    color: `${theme.palette.grey[300]}`
                  }}
                />
              }
            />
          </Box>

          <Typography sx={{ ml: 1 }}>{'(Search lang key by include "_" in keyword)'}</Typography>
        </Stack>

        {/* list table */}
        <Box className="scroll-box">
          <Box
            sx={{
              maxHeight: 'calc(100vh - 250px)',
              overflow: 'auto',
              '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                width: 0
              }
            }}
          >
            <Suspense fallback={<LoadingCircular loading={isLoading} />}>
              <LanguageListSearch dataListSearch={dataListSearch || []} isLoading={isLoading} setValue={setValue} />
            </Suspense>
          </Box>
          {/* write form */}
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <LanguageForm
              closeModal={closeModalLanguage}
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
      </Box>
    </MiModal>
  );
};

export default LanguageModal;
