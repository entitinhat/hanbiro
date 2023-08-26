import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { useForm } from 'react-hook-form';
import { Box, Button, Grid, Stack } from '@mui/material';
import { useRecoilValue } from 'recoil';

//project
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ButtonOption } from '@base/types/extended';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import { useWriteForm } from '@base/hooks/forms/useWriteForm';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { MENU_SALES_QUOTE } from '@base/config/menus';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { defaultCurrencySelector } from '@base/store/selectors/app';

//opportunity
import { useQuoteRevisionCreate } from '@opportunity/hooks/useOpportunityQuote';

//menu
import useQuoteCreate from '@quote/hooks/useQuoteCreate';
import * as keyNames from '@quote/config/keyNames';
import WriteFields from '@quote/containers/WriteFields';
import { default as viewConfig } from '@quote/config/view-field';
import { default as writeConfig } from '@quote/config/write-field';
import { useQuote, useQuoteRevision } from '@quote/hooks/useQuote';
import { parseProductItemValueInput } from '@quote/containers/QuoteItems/Helper';
import { QUOTE_CATEGORY_ORIGINAL, QUOTE_CATEGORY_REVISION } from '@quote/config/constants';
import useQuoteUpdate, { useQuoteRevisionUpdate } from '@quote/hooks/useQuoteUpdate';
import { finalizeParams } from './payload';

interface WriteFormProps {
  fullScreen?: boolean;
  isOpen: boolean;
  menuApi: string;
  category: 'QUOTE' | 'REVISION';
  quoteId?: string | undefined; //= quote id
  quoteRevisionId?: string | undefined; //= revision id
  opportunity?: any; //set default
  onReload?: () => void;
  onGoView?: (id: string, category: string) => void;
  onClose: () => void;
  onSuccess?: (val: any) => void;
}

const WriteForm = (props: WriteFormProps) => {
  const { isOpen, category, quoteId, quoteRevisionId, opportunity, onReload, onClose, onSuccess, onGoView } = props;
  const { defaultValues, fields, loading, getParams } = useWriteForm({ menu: props.menuApi });
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  //state
  const [isReset, setIsReset] = useState(false);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange'
  });

  //create mutation
  const mutationAdd = useQuoteCreate({ opportunityId: opportunity?.id });
  const mRevisionAdd = useQuoteRevisionCreate(opportunity?.id);
  const mQuoteUpdate = useQuoteUpdate({ onReload });
  const mQuoteRevisionUpdate = useQuoteRevisionUpdate({ onReload });

  //get data quote for edit
  const { data: layoutView } = usePageLayoutByMenu(MENU_SALES_QUOTE, 'view');
  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore:
      category === QUOTE_CATEGORY_ORIGINAL
        ? [keyNames.KEY_NAME_QUOTE_RECIPIENTS, keyNames.KEY_NAME_QUOTE_REVISION_ID, keyNames.KEY_NAME_QUOTE_DELETED_BY]
        : [keyNames.KEY_NAME_QUOTE_REVISION_ID, keyNames.KEY_NAME_QUOTE_DELETED_BY]
  });
  const { data: quoteData, refetch: quoteRefetch } = useQuote(viewSchema, quoteId || '', {
    enabled: viewSchema !== '' && quoteId !== undefined && quoteRevisionId === undefined
  });
  const revViewSchema = `${viewSchema} \nquote {id name code}`;
  const { data: revisionData, refetch: revisionRefetch } = useQuoteRevision(revViewSchema, quoteRevisionId || '', {
    enabled: viewSchema !== '' && quoteRevisionId !== undefined
  });

  // console.log('quoteData', quoteData);
  // console.log('revisionData', revisionData);
  // console.log('quoteId category', category);
  // console.log('quoteId', quoteId);
  // console.log('opportunity propose > ', opportunity);

  //set default opportunity - create new case
  useEffect(() => {
    if (!quoteId) {
      setValue(keyNames.KEY_NAME_QUOTE_OPPORTUNITY, opportunity);
    }
  }, [opportunity]);

  //init data for quote
  useEffect(() => {
    let formData: any = null;
    if (category === QUOTE_CATEGORY_ORIGINAL) {
      //edit quote
      formData = quoteData;
    }
    if (category === QUOTE_CATEGORY_REVISION) {
      if (quoteRevisionId) {
        //edit revision
        formData = revisionData;
      } else {
        //create revision
        formData = quoteData;
      }
    }
    if (formData) {
      Object.keys(writeConfig).map((_key: string) => {
        const { items, summary } = parseProductItemValueInput(formData, defaultCurrency);
        if (_key === keyNames.KEY_NAME_QUOTE_ITEMS) {
          setValue(_key, { data: items, summary });
        } else if (_key === keyNames.KEY_NAME_QUOTE_CUSTOMER) {
          setValue(_key, { ...formData[_key], category: formData[keyNames.KEY_NAME_QUOTE_CUSTOMER_CATEGORY] });
        } else {
          setValue(_key, formData[_key]);
        }
        //change code for revision
        if (category === QUOTE_CATEGORY_REVISION) {
          if (_key === keyNames.KEY_NAME_QUOTE_REVISION_ID) {
            setValue(_key, formData[keyNames.KEY_NAME_QUOTE_CODE]);
          }
          if (_key === keyNames.KEY_NAME_QUOTE_CODE) {
            setValue(_key, formData.quote?.code || '');
          }
        }
      });
    }
  }, [quoteData, revisionData]);

  //check success
  useEffect(() => {
    //console.log('<<< completed useEffect >>>', mutationAdd);
    if (mutationAdd.isSuccess || mRevisionAdd.isSuccess || mQuoteUpdate.isSuccess || mQuoteRevisionUpdate.isSuccess) {
      reset();
      if (!isReset) {
        //onGoView && onGoView(mutationAdd.data.id, menuApi === MENU_CUSTOMER_ACCOUNT ? 'account' : 'contact');
        onClose();
      }
      // refecth data
      //onReload && onReload();
    }
  }, [mutationAdd.isSuccess, mRevisionAdd.isSuccess, mQuoteUpdate.isSuccess, mQuoteRevisionUpdate.isSuccess]);

  //submit form
  const onSubmit = (formData: any) => {
    const configParams = getParams(formData);
    const apiParams = finalizeParams(configParams, category);
    //console.log('apiParams', apiParams);
    if (category === QUOTE_CATEGORY_REVISION) {
      if (quoteRevisionId) {
        mQuoteRevisionUpdate.mutate({ id: quoteId, revision: { id: quoteRevisionId, ...apiParams } });
      } else {
        mRevisionAdd.mutate({ id: quoteId, revision: apiParams });
      }
    } else {
      if (quoteId) {
        mQuoteUpdate.mutate({ quote: { id: quoteId, ...apiParams } });
      } else {
        mutationAdd.mutate({ quote: apiParams });
      }
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //close
  const handleClose = () => {
    reset();
    onClose();
  };

  //buttons
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'Save',
        color: 'primary',
        onClick: () => {
          setIsReset(false);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: !isValid || mutationAdd.isLoading || mRevisionAdd.isLoading || mQuoteUpdate.isLoading || mQuoteRevisionUpdate.isLoading,
        isLoading: mutationAdd.isLoading || mRevisionAdd.isLoading || mQuoteUpdate.isLoading || mQuoteRevisionUpdate.isLoading
      },
      {
        isMain: false,
        label: 'Save and Create New',
        color: 'secondary',
        onClick: () => {
          setIsReset(true);
          handleSubmit((data) => onSubmit(data), onError)();
        },
        disabled: !isValid || mutationAdd.isLoading || mRevisionAdd.isLoading || mQuoteUpdate.isLoading || mQuoteRevisionUpdate.isLoading
        //isLoading: mutationAdd.isLoading || mRevisionAdd.isLoading || mQuoteUpdate.isLoading || mQuoteRevisionUpdate.isLoading
      }
    ];

    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [isValid, mutationAdd.isLoading, mRevisionAdd.isLoading, mQuoteUpdate.isLoading, mQuoteRevisionUpdate.isLoading]);

  //======================== Debug ========================//
  console.log('form values', watch()); //get form values when inputing
  //console.log('form errors', errors); //get form values when inputing
  //console.log('form isValid', isValid); //get form values when inputing
  //console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <MiModal fullScreen={false} title={<SpanLang keyLang={`New Quote`} />} isOpen={isOpen} size="md" onClose={handleClose} footer={Footer}>
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <React.Suspense fallback={<LoadingCircular loading={loading} />}>
            <WriteFields
              watch={watch}
              getValues={getValues}
              control={control}
              errors={errors}
              fields={fields}
              quoteId={quoteId}
              opportunity={quoteId ? getValues(keyNames.KEY_NAME_QUOTE_OPPORTUNITY) : opportunity}
              isRevision={category === QUOTE_CATEGORY_REVISION}
            />
          </React.Suspense>
        </form>
      )}
    </MiModal>
  );
};

export default WriteForm;
