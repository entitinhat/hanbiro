import React from 'react';
import { useForm } from 'react-hook-form';
import WriteField from '@base/containers/WriteField';
import { Box, IconButton, TextField } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

import validator from '@base/utils/validation/fieldValidator';
import * as keyNames from '@settings/preferences/config/keyNames';
import { useAttributesMutate } from '@product/attribute/hooks/useAttributesMutation';
import { useValuesMutate } from '@product/attribute/hooks/useValuesMutation';
import { inputType } from '../index';

const inputHoverEffectContainerSx = {
  position: 'relative',

  '.submitUpdateBtn': {
    transform: 'scale(0.7)',
    display: 'none'
  },
  '.closeBtn': {
    transform: 'scale(0.7)',
    color: '#e46673',
    display: 'none'
  },
  '.textField': {
    background: '#fff',
    position: 'relative',
    top: -1.5
  },

  '&:hover': {
    '.submitUpdateBtn': {
      display: 'flex',
      '&:hover': {
        transform: 'scale(0.8)'
      }
    },
    '.closeBtn': {
      display: 'flex',
      '&:hover': {
        transform: ' scale(0.8)'
      }
    }
  }
};

const inputContainerSx = {
  position: 'relative',
  '.textField': {
    background: '#fff',
    position: 'relative',
    top: -1.5
  },
  '.submitUpdateBtn': {
    display: 'flex',
    transform: 'scale(0.7)',
    '&:hover': {
      transform: 'scale(0.8)'
    }
  },
  '.closeBtn': {
    display: 'flex',
    transform: 'scale(0.7)',
    color: '#e46673',
    '&:hover': {
      transform: ' scale(0.8)'
    }
  }
};

interface propsInter {
  type: string;
  row: any;
  placeholder?: string;
  setShow: any;
  hoverEffect?: boolean;
}

function WriteChangeInput(props: propsInter) {
  const { type, row, placeholder, setShow, hoverEffect = false } = props;

  const { mUpdate: mAttrUpdate } = useAttributesMutate();
  const { mAdd: mValueAdd, mUpdate: mValueUpdate } = useValuesMutate();

  // -------------

  const formMethods = useForm({
    defaultValues: {
      [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_NAME]:
        type === inputType.updateAttr ? row.name : type === inputType.addValue ? '' : type === inputType.updateValue ? row.valueName : '',
      [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_ID]: row.id,
      [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_VALUE_ID]: type === inputType.updateValue ? row?.valueId : ''
    },
    criteriaMode: 'all',
    mode: 'onSubmit'
  });

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    if (type === inputType.updateAttr) {
      handleUpdateAttr(data);
    } else if (type === inputType.addValue) {
      handleAddValue(data);
    } else if (type === inputType.updateValue) {
      handleUpdateValue(data);
    }
  };

  const handleUpdateAttr = (data: any) => {
    mAttrUpdate.mutate(
      {
        attribute: {
          id: data.id,
          name: data.name
        }
      },
      {
        onSuccess: () => setShow('')
      }
    );
  };

  const handleAddValue = (data: any) => {
    mValueAdd.mutate(
      {
        attrId: data.id,
        values: data.name.split(',').map((item: string) => {
          return { name: item };
        })
      },
      {
        onSuccess: () => setShow('')
      }
    );
  };

  const handleUpdateValue = (data: any) => {
    mValueUpdate.mutate(
      {
        value: { attr: { id: data.id }, name: data.name, id: data[keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_VALUE_ID] }
      },
      {
        onSuccess: () => setShow(false)
      }
    );
  };

  // -------------

  let BoxSx = hoverEffect ? inputHoverEffectContainerSx : inputContainerSx;

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <Box sx={{ ...BoxSx, display: 'flex', width: '100%', [`& fieldset`]: { borderRadius: 0 } }}>
        <Box sx={{ maxHeight: 33, flex: 1 }}>
          <WriteField
            item={{
              keyName: keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_NAME,
              validate: validator.required,
              Component: TextField,
              componentProps: {
                variant: 'outlined',
                size: 'small',
                placeholder,
                className: 'textField',
                sx: { borderRadius: '0px' }
              }
            }}
            control={formMethods.control}
            errors={formMethods.formState.errors}
          />
        </Box>
        <IconButton className="submitUpdateBtn" color="success" aria-label="update" type="submit">
          <DoneIcon />
        </IconButton>
        <IconButton
          className="closeBtn"
          aria-label="delete"
          onClick={() => {
            setShow('');
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </form>
  );
}

export default WriteChangeInput;
