import React, { Suspense, useEffect, useMemo } from 'react';
import validators from '@base/utils/validation/fieldValidator';
import { useForm } from 'react-hook-form';
import { CategoryParentType, DisplayType, KnowledgeBaseCategory } from '@desk/knowledge-base/types/knowledge';
import { Box, Breakpoint, Button, FormGroup, Stack, TextField } from '@mui/material';
import ButtonSplit from '@base/components/@hanbiro/ButtonSplit';
import { ButtonOption } from '@base/types/extended';
import { KEY_KNOWLEDGE_BASE_DESCRIPTION, KEY_KNOWLEDGE_BASE_NAME } from '@desk/knowledge-base/config/keyNames';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import WriteFields from '../WriteFields';
import useKBCategoryMutation from '@desk/knowledge-base/hooks/useKBCategoryMutation';
import { useTranslation } from 'react-i18next';

interface IWriteCategoryFormProps {
  onReload?: (params: any) => void;
  data: KnowledgeBaseCategory | null;
  //Mimodal props
  title?: string | React.ReactElement;
  isOpen: boolean;
  fullScreen?: boolean;
  size?: Breakpoint;
  onClose: () => void;
}

const WriteCategoryForm: React.FC<IWriteCategoryFormProps> = (props) => {
  const { isOpen, fullScreen = false, onClose, title, size, onReload, data } = props;
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    control,
    //trigger,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      description: ''
    },
    criteriaMode: 'firstError',
    mode: 'onChange'
  });
  //lang
  const { t } = useTranslation();
  //init value
  useEffect(() => {
    if (data) {
      setValue(KEY_KNOWLEDGE_BASE_NAME, data.name, { shouldValidate: true });
      setValue(KEY_KNOWLEDGE_BASE_DESCRIPTION, data.description || '');
    } else {
      reset();
    }
  }, [data]);

  //mutation definition
  const { mCreateCategory, mUpdateCategory } = useKBCategoryMutation();
  //check create success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mCreate);
    if (mCreateCategory.isSuccess) {
      onReload && onReload({ ...mCreateCategory.variables.category, id: mCreateCategory.data.id });
      onClose && onClose();
    }
  }, [mCreateCategory.isSuccess]);

  //check create success
  useEffect(() => {
    //// console.log('<<< completed useEffect >>>', mCreate);
    if (mUpdateCategory.isSuccess) {
      onReload && onReload({ ...mUpdateCategory.variables.category });
      onClose && onClose();
    }
  }, [mUpdateCategory.isSuccess]);

  //submit form
  const onSubmit = ({ formData, isPublic }: any) => {
    const newParams: any = {
      name: formData.name,
      description: formData.description,
      display: isPublic ? DisplayType.PUBLIC : DisplayType.PRIVATE,
      type: CategoryParentType.CATEGORY
    };
    if (data?.id) {
      newParams.id = data?.id;
      mUpdateCategory.mutate({ category: newParams });
    } else {
      mCreateCategory.mutate({ category: newParams });
    }
  };

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    // console.log('error', errors, e);
  };
  //form fields
  const MainFields = useMemo(() => {
    return [
      {
        keyName: KEY_KNOWLEDGE_BASE_NAME,
        Component: TextField,
        columns: 1,
        componentProps: {
          fullWidth: true,
          autoComplete: 'off'
        },
        languageKey: 'ncrm_desk_knowledge_field_category_name',
        section: 0,
        tooltipShow: false,
        validate: {
          required: validators.required
        }
      },
      {
        keyName: KEY_KNOWLEDGE_BASE_DESCRIPTION,
        Component: TextField,
        columns: 1,
        componentProps: {
          fullWidth: true,
          autoComplete: 'off',
          multiline: true,
          rows: 4
        },
        languageKey: 'ncrm_desk_knowledge_field_description',
        section: 0,
        tooltipShow: false
      }
    ];
  }, [mCreateCategory.isLoading, isValid, mUpdateCategory.isLoading]);
  //render footer
  const Footer = useMemo(() => {
    const options: ButtonOption[] = [
      {
        isMain: true,
        label: 'ncrm_common_btn_save_public',
        color: 'primary',
        onClick: () => {
          handleSubmit((data) => onSubmit({ formData: data, isPublic: true }), onError)();
        },
        disabled: mCreateCategory.isLoading || mUpdateCategory.isLoading || !isValid || !isValid,
        isLoading: mCreateCategory.isLoading || mUpdateCategory.isLoading
      },
      {
        isMain: false,
        label: 'ncrm_common_btn_save_private',
        color: 'secondary',
        onClick: () => {
          handleSubmit((data) => onSubmit({ formData: data, isPublic: false }), onError)();
        },
        disabled: mCreateCategory.isLoading || mUpdateCategory.isLoading || !isValid,
        isLoading: mCreateCategory.isLoading || mUpdateCategory.isLoading
      }
    ];

    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={() => onClose()}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ButtonSplit buttons={options} />
          </Stack>
        </Box>
      </FormGroup>
    );
  }, [mCreateCategory.isLoading, isValid, mUpdateCategory.isLoading]);

  //======================== Debug ========================//
  // console.log('form values', watch()); //get form values when inputing
  //// console.log('form values', getValues()); //get form values when inputing
  //// console.log('form errors', errors);
  //// console.log('form fields', fields); //All fields from pagelayout
  //======================== End Debug ========================//

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={title || <SpanLang keyLang={`ncrm_desk_knowledge_base_new_write_form_category`} />}
        isOpen={isOpen} //writeOption.isOpenWrite
        size={size || 'sm'}
        fullScreen={fullScreen}
        onClose={onClose}
        footer={Footer}
      >
        {isOpen && (
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <WriteFields watch={watch} menuApi="" control={control} errors={errors} fields={MainFields} />
          </form>
        )}
      </MiModal>
    </Suspense>
  );
};

export default WriteCategoryForm;
