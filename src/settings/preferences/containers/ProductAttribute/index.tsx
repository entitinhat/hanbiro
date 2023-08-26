import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useAttributes } from '@product/attribute/hooks/useAttributes';
import {
  Box,
  IconButton,
  Stack,
  TextField,
  Button,
  useTheme,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled
} from '@mui/material';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import WriteField from '@base/containers/WriteField';
import { useForm } from 'react-hook-form';
import * as keyNames from '@settings/preferences/config/keyNames';
import validator from '@base/utils/validation/fieldValidator';
import AddIcon from '@mui/icons-material/Add';
import { useAttributesMutate } from '@product/attribute/hooks/useAttributesMutation';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import WriteChangeInput from './WriteChangeInput';
import { useValuesMutate } from '@product/attribute/hooks/useValuesMutation';
import { useTranslation } from 'react-i18next';

const attrCellSx = {
  position: 'relative',

  '.showUpdateInputBtn': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) scale(0.7)',
    right: 25,
    display: 'none',
    transition: 'all 0.2s linear'
  },
  '.deleteBtn': {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%) scale(0.7)',
    right: 2,
    color: '#e46673',
    display: 'none',
    transition: 'all 0.2s linear'
  },

  '&:hover': {
    '.showUpdateInputBtn': {
      display: 'flex',
      '&:hover': {
        transform: 'translateY(-50%) scale(0.8)'
      }
    },
    '.deleteBtn': {
      display: 'flex',
      '&:hover': {
        transform: ' translateY(-50%) scale(0.8)'
      }
    }
  }
};

const valueCellSx = {
  // position: 'relative',
  display: 'inline-flex',
  flexWrap: 'wrap',
  position: 'relative',

  '.updateBtn': {
    transform: 'scale(0.7)',
    display: 'none',
    transition: 'all 0.2s linear'
  },
  '.deleteBtn': {
    transform: 'scale(0.7)',
    color: '#e46673',
    display: 'none',
    transition: 'all 0.2s linear'
  },

  '.addValueBtn': {
    display: 'none',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 16
  },

  '&:hover': {
    '.updateBtn': {
      display: 'flex'
    },
    '.deleteBtn': {
      display: 'flex'
    },
    '.addValueBtn': {
      display: 'flex'
    }
  }
};

export const inputType = {
  updateAttr: 'ATTR_UPDATE_INPUT',
  updateValue: 'VALUE_UPDATE_INPUT',
  addValue: 'VALUE_ADD_INPUT'
};

function ProductAttribute() {
  const { data } = useAttributes({ keyword: '' });
  const { mAdd: mAttrAdd, mDelete: mAttrDelete } = useAttributesMutate();
  const { mDelete: mValueDelete } = useValuesMutate();
  const [showUpdateInput, setShowUpdateInput] = React.useState('');
  const [showAddValueInput, setShowAddValueInput] = React.useState('');
  const [showUpdateValueInput, setShowUpdateValueInput] = React.useState('');

  const { t } = useTranslation();
  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;
  const backgroundColor = theme.palette.grey[100];

  const tableData = data?.data;

  // Form add new Attribute
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit
  } = useForm({
    defaultValues: {
      [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_ATTRIBUTE]: '',
      [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_VALUE]: ''
    },
    criteriaMode: 'all',
    mode: 'onSubmit'
  });

  const onSubmit = (data: any, e: any) => {
    e.preventDefault();
    const newAttr = {
      attribute: {
        ...data,
        values: data.values.split(',').map((item: string) => {
          return { name: item };
        })
      }
    };
    mAttrAdd.mutate(newAttr);
    reset();
  };

  // Delete Attr, Value
  const handleDeleteAttr = (id: string) => {
    mAttrDelete.mutate({ ids: [id] });
  };

  const handleDeleteValue = (attrId: string, id: string) => {
    mValueDelete.mutate({ id, attrId });
  };

  return (
    <TableContainer sx={{ p: 2 }}>
      <Table sx={{ minWidth: 700, border: border }} aria-label="customized table">
        <TableHead sx={{ borderTop: 0, borderBottom: border }}>
          <TableRow sx={{ borderBottom: 0 }}>
            <TableCell sx={{ width: '20%' }}>{t('ncrm_generalsetting_preferences_product_attributes')}</TableCell>
            <TableCell sx={{ width: '80%' }}>{t('ncrm_generalsetting_preferences_product_value')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <TableRow key={row.id}>
              <TableCell sx={{ ...attrCellSx, minWidth: '200px', height: '100%', borderRight: border }} component="th" scope="row">
                {showUpdateInput === row.id ? (
                  <WriteChangeInput type={inputType.updateAttr} row={row} setShow={setShowUpdateInput} />
                ) : (
                  <>
                    {row.name}
                    <IconButton className="showUpdateInputBtn" aria-label="update" onClick={() => setShowUpdateInput(row.id)}>
                      <CreateOutlinedIcon />
                    </IconButton>
                    <IconButton
                      className="deleteBtn"
                      aria-label="delete"
                      onClick={() => {
                        handleDeleteAttr(row.id);
                      }}
                    >
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
              <TableCell sx={{ ...valueCellSx, width: '100%', minHeight: '64px' }}>
                {/* <Box sx={{ width: '100%', overflow: 'scrollY' }}> */}
                {row.values?.map((item) => {
                  return (
                    <Stack key={item.id} sx={{ display: 'inline-flex' }} direction="row" spacing={2}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          // backgroundColor: backgroundColor,
                          m: '3px',
                          p: '0.25rem 0.4rem',
                          height: '33px',
                          borderRadius: '0.25rem'
                        }}
                      >
                        {showUpdateValueInput === item.id ? (
                          <WriteChangeInput
                            type={inputType.updateValue}
                            row={{
                              ...row,
                              [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_VALUE_ID]: item.id,
                              [keyNames.KEY_SETTING_PREFERENCES_PRODUCT_UPDATE_VALUE_NAME]: item.name
                            }}
                            setShow={setShowUpdateValueInput}
                          />
                        ) : (
                          <>
                            <Typography
                              sx={{
                                display: 'inline-block',
                                position: 'relative',
                                top: 1,
                                fontWeight: 600,
                                lineHeight: '16px',
                                p: '4px'
                              }}
                            >
                              {item.name}
                            </Typography>
                            <IconButton
                              sx={{ width: '24px', height: '24px', lineHeight: '12px', p: '4px', overflow: 'hidden' }}
                              className="updateBtn"
                              aria-label="update"
                              onClick={() => setShowUpdateValueInput(item.id)}
                            >
                              <CreateOutlinedIcon />
                            </IconButton>
                            <IconButton
                              sx={{ width: '24px', height: '24px', lineHeight: '12px', p: '4px', overflow: 'hidden' }}
                              className="deleteBtn"
                              aria-label="update"
                              onClick={() => handleDeleteValue(row.id, item.id)}
                            >
                              <DeleteOutlineOutlinedIcon />
                            </IconButton>
                          </>
                        )}
                      </Box>
                    </Stack>
                  );
                })}
                {showAddValueInput === row.id ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      // backgroundColor: backgroundColor,
                      m: '3px',
                      p: '0.25rem 0.4rem',
                      height: '33px',
                      borderRadius: '0.25rem'
                    }}
                  >
                    <WriteChangeInput
                      type={inputType.addValue}
                      row={row}
                      setShow={setShowAddValueInput}
                      placeholder={t('ncrm_generalsetting_preferences_product_seperate_value_with') as string}
                    />
                  </Box>
                ) : (
                  <>
                    <IconButton
                      sx={{
                        width: '24px',
                        height: '24px',
                        lineHeight: '12px',
                        p: '4px',
                        overflow: 'hidden'
                      }}
                      className="addValueBtn"
                      aria-label="add"
                      color="primary"
                      size="small"
                      onClick={() => setShowAddValueInput(row.id)}
                    >
                      <ControlPointRoundedIcon />
                    </IconButton>
                  </>
                )}
                {/* </Box> */}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
              <form style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ display: 'block', width: '20%', pr: '20px', minWidth: '200px' }}>
                  <WriteField
                    item={{
                      keyName: keyNames.KEY_SETTING_PREFERENCES_PRODUCT_ATTRIBUTE,
                      validate: validator.required,
                      Component: TextField,
                      componentProps: {
                        variant: 'outlined',
                        placeholder: t('ncrm_generalsetting_preferences_product_eg_color')
                      }
                    }}
                    control={control}
                    errors={errors}
                  />
                </Box>
                <Box sx={{ display: 'flex', width: '80%', pl: '0px' }}>
                  <Box sx={{ flex: 1, mr: '10px' }}>
                    <WriteField
                      item={{
                        keyName: keyNames.KEY_SETTING_PREFERENCES_PRODUCT_VALUE,
                        validate: validator.required,
                        Component: TextField,
                        componentProps: {
                          variant: 'outlined',
                          placeholder: t('ncrm_generalsetting_preferences_product_seperate_value_with')
                        }
                      }}
                      control={control}
                      errors={errors}
                    />
                  </Box>
                  <Button type="submit" sx={{ height: '41px', top: '4px' }} size="small" variant="contained" startIcon={<AddIcon />}>
                    {t('ncrm_common_btn_add')}
                  </Button>
                </Box>
              </form>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductAttribute;
