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

interface ProductAutoCompleteProps {
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
  onChange?: (val: Product | Product[] | null) => void;
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
const ProductAutoComplete = (props: ProductAutoCompleteProps) => {
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
  const [selectedValue, setSelectedValue] = useState<Product | Product[] | null>(single ? null : []);

  const [isOpen, setIsOpen] = useState(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  // initial selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          //2 cases for value: string[] or object[]
          let isArrayString = _.isString(value[0]);
          if (isArrayString) {
            const selectedIds = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
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
        //single object
        if (_.isString(value)) {
          const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
          if (value !== selectedId) {
            // find in options
            const fOption = options.find((_ele: any) => _ele.id === value);
            if (fOption) {
              setSelectedValue(fOption);
            }
          }
        } else {
          const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
          if (value?.id !== selectedId) {
            setSelectedValue(value);
          }
        }
      }
    } else {
      setSelectedValue(single ? null : []);
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
  const handleValueChange = (event: React.SyntheticEvent, selected: Product | Product[] | null, reason: string) => {
    let newItem = selected;

    if (!single) {
      if (Array.isArray(newItem)) {
        const allIdx = newItem.findIndex((ele: any) => ele.value === 'all');
        if (allIdx > -1) {
          newItem = [newItem[allIdx]];
        }
      }
    }
    setSelectedValue(newItem);

    //callback
    onChange && onChange(newItem);
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
        {addLabel ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5px',
              padding: '5px 0',
              borderBottom: `1px solid ${theme.palette.divider}`,
              [`&:hover`]: {
                bgcolor: theme.palette.grey[100]
              }
            }}
          >
            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                setIsOpen(false);
                setShowAdd(true);
              }}
              size="small"
              color="primary"
              fullWidth
              startIcon={Icon('plus')}
            >
              {addLabel}
            </Button>
          </Box>
        ) : null}

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
      <Autocomplete
        id="asynchronous-product"
        multiple={!single}
        disabled={isDisabled}
        sx={{
          ...(isDisabled && {
            background: theme.palette.secondary.lighter,
            color: theme.palette.secondary.main
          }),
          ...sx
        }}
        // limitTags={3}
        // sx={{ padding: '5px 0px', minWidth: 300 }}

        open={isOpen}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
        getOptionLabel={(option) => option?.name ?? ''}
        options={options}
        loading={searchStatus === 'loading'}
        filterSelectedOptions={!single}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(label || '') as string}
            placeholder={t(placeholderCond) as string}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {searchStatus === 'loading' ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            return <Chip label={option.name} {...getTagProps({ index })} key={index} size="small" />;
          })
        }
        inputValue={inputText}
        onInputChange={handleInputChange}
        value={selectedValue}
        onChange={handleValueChange}
        PaperComponent={CustomMenuOption}
        renderOption={(props, option) => <CustomOption key={option?.id} option={option} props={props} />}
      />
      {showAdd && <WritePage isOpen={showAdd} onClose={() => setShowAdd(false)} />}
    </>
  );
};

export default ProductAutoComplete;
