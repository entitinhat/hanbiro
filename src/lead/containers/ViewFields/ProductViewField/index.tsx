import React, { useState, useEffect, useRef, useMemo } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { Product } from '@product/product/types/product';
import { useProductsAutoComplete } from '@product/product/hooks/useProductsAutoComplete';

// material-ui
import { Autocomplete, Box, Button, Chip, CircularProgress, Paper, SxProps, TextField, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import WritePage from '@product/product/pages/WritePage';
import Icon from '@base/assets/icons/svg-icons';
import { DESC } from '@base/config/constant';
import { CloseOutlined } from '@mui/icons-material';

interface ProductViewFieldProps {
  placeholder?: string;
  type?: string; // all, produced, purchase
  single?: boolean;
  visible?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  excludes?: string[];
  isPublic?: boolean; //for public site
  token?: string; //for public site
  value?: any | any[]; // [], initial value
  onChange?: (val: Product[]) => void;
  label?: string;
  addLabel?: string;
  //onAdd?: any;
  sx?: SxProps;
}

/**
 *
 * @param {*} props
 * @returns
 */
const ProductViewField = (props: ProductViewFieldProps) => {
  const {
    placeholder = 'ncrm_common_product_auto_placeholder',
    type = '', //all, produced, purchase
    single = false, //
    visible = true, //hide or display selected items
    showAllOption = false,
    isDisabled = false,
    excludes = [],
    value, //[], initial value
    onChange,
    isPublic,
    token,
    label,
    addLabel,
    //onAdd,
    sx
  } = props;

  const { t } = useTranslation();
  const theme = useTheme();

  // state
  const [inputText, setInputText] = useState<string>('');
  const [options, setOptions] = useState<readonly Product[]>([]);
  const [selectedValue, setSelectedValue] = useState<Product[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  // initial selected
  useEffect(() => {
    if (value) {
      if (value.length > 0) {
        //2 cases for value: string[] or object[]
        let isArrayString = _.isString(value[0]);
        if (isArrayString) {
          const selectedIds = selectedValue?.map((_ele: any) => _ele.id);
          if (JSON.stringify(value) !== JSON.stringify(selectedIds)) {
            const newValue: any = [];
            value.map((_item: string) => {
              const fOption = options.find((_ele: any) => _ele.id === _item);
              if (fOption) {
                newValue.push(fOption);
              }
            });
            setSelectedValue(newValue);
          }
        } else {
          //array object
          if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
            setSelectedValue(value);
          }
        }
      } else {
        setSelectedValue([]);
      }
    } else {
      setSelectedValue([]);
    }
  }, [value, options]);

  // build params
  const getSearchParams = useMemo(() => {
    let queryFilters: any[] = [];
    if (excludes?.length > 0) {
      queryFilters.push(`-id=(${excludes.join(' ')})`);
    }

    let params: any = {
      filter: {
        query: queryFilters.join(' '),
        sort: {
          field: 'createdAt',
          orderBy: DESC
        },
        paging: {
          page: 1,
          size: 99
        }
      }
    };

    // for public site
    if (isPublic) {
      params.token = token;
    }

    return params;
  }, [excludes, isPublic, token]); //searchText,

  const {
    data: productData,
    status: searchStatus
    //refetch,
  } = useProductsAutoComplete(getSearchParams, isPublic);
  //console.log('postResult', productData);

  // init states list
  useEffect(() => {
    if (productData?.data) {
      let addMoreItems: any = [];
      if (showAllOption && excludes?.length === 0) {
        addMoreItems.push({
          label: t(`ncrm_common_all`),
          value: 'all',
          id: 'all',
          name: t(`ncrm_common_all`)
        });
      }

      setOptions([...addMoreItems, ...productData.data]);
    } else {
      setOptions([]);
    }
  }, [productData]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // // prevent outside click from resetting inputText to ""
    setInputText(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Product[], reason: string) => {
    let newItem = selected;

    const allIdx = newItem.findIndex((ele: any) => ele.value === 'all');
    if (allIdx > -1) {
      newItem = [newItem[allIdx]];
    }
    setSelectedValue(newItem);

    console.log('onChangenewItem', newItem);
    

    //callback
    onChange && onChange(newItem);
  };
  const handleDeleteproduct = (index: number) => {
    console.log('selectedValue', selectedValue);

    const nVal = [...selectedValue];
    nVal.splice(index, 1);
    console.log('nVal', nVal);
    setSelectedValue(nVal);

    //callback
    onChange && onChange(nVal);
  };

  let placeholderCond = placeholder;
  if (label) {
    placeholderCond = '';
  }

  const CustomMenuOption: React.FC<any> = (propsOption: any) => {
    const { children, ...props } = propsOption;
    //render
    return (
      //<Grow in>
      <Paper elevation={8} {...props}>
        {children}
      </Paper>
      //</Grow>
    );
  };

  const CustomOption: React.FC<any> = (propsCustomOption: any) => {
    const { props, option } = propsCustomOption;
    return (
      <Box component="li" {...props}>
        {option.name === 'All' ? (
          <Typography sx={{ fontWeight: 500 }}>All</Typography>
        ) : (
          option.label ?? option.name ?? option.keyName ?? option
        )}
      </Box>
    );
  };

  //render
  return (
    <>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 0, m: 0 }} component="ul">
        <Autocomplete
          multiple
          fullWidth
          readOnly={!isOpen}
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          id="tags-outlined"
          options={options}
          value={selectedValue}
          loading={searchStatus === 'loading'}
          // onBlur={handleBlur}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          getOptionLabel={(option) => option?.name ?? ''}
          onChange={handleValueChange}
          renderInput={({ InputProps, ...rest }) => {
            const { startAdornment, ...restInput } = InputProps;
            const nStartAdornment = (
              <>
                {startAdornment}
                <Chip
                  variant="combined"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  label={'+ Add'}
                  sx={{ color: 'text.primary', m: 1 }}
                  size="small"
                />
              </>
            );

            return (
              <TextField
                {...rest}
                InputProps={{
                  ...restInput,
                  startAdornment: nStartAdornment
                }}
                onKeyDown={(event) => {
                  //prevent backspace/delete buttom from delete selected items
                  if (event.key === 'Backspace' || event.key === 'Delete') {
                    event.stopPropagation();
                  }
                }}
              />
            );
          }}
          renderTags={(value, getTagProps) => {
            return (
              <>
                {value.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    variant="combined"
                    label={option.name}
                    deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                    onDelete={() => handleDeleteproduct(index)}
                    sx={{ color: 'text.primary', p: 0 }}
                    size="small"
                  />
                ))}
              </>
            );
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              p: 0,
              '& .MuiAutocomplete-tag': {
                m: 0.5
              },
              '& fieldset': {
                display: 'none'
              },
              '& .MuiAutocomplete-endAdornment': {
                display: 'none'
              },
              '& .MuiAutocomplete-popupIndicator': {
                display: 'none'
              }
            }
          }}
        />
      </Box>
    </>
  );
};

export default ProductViewField;
