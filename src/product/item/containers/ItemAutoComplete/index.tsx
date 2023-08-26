import React, { useState, useEffect, useRef, useMemo } from 'react';

// third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

// material-ui
import { Autocomplete, Box, Chip, CircularProgress, TextField, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// project
import { Item } from '@product/item/types/item';
import WritePage from '@product/item/pages/WritePage';
import { useItemsAutoComplete } from '@product/item/hooks/useItemsAutoComplete';
import { DESC } from '@base/config/constant';
import { PRODUCT_ITEM_TYPE_ENUM_COMPOSITE, PRODUCT_ITEM_TYPE_ENUM_GENERAL, PRODUCT_ITEM_TYPE_ENUM_PREPAID } from '@product/main/config/constants';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface ItemAutoCompleteProps {
  placeholder?: string;
  type?:  'ITEM_TYPE_GENERAL' | 'ITEM_TYPE_COMPOSITE' | 'ITEM_TYPE_PREPAID'; // General, Composite, Prepaid
  single?: boolean;
  visible?: boolean;
  showAllOption?: boolean;
  isDisabled?: boolean;
  excludes?: string[];
  isPublic?: boolean; //for public site
  token?: string; //for public site
  value?: any | any[]; // [], initial value
  onChange?: (val: Item | Item[] | null) => void;
  label?: string;
  addLabel?: string;
  //onAdd?: any;
}

/**
 *
 * @param {*} props
 * @returns
 */
const ItemAutoComplete = (props: ItemAutoCompleteProps) => {
  const { t } = useTranslation();
  const {
    placeholder = t('ncrm_common_item_auto_complete_placeholder') as string,
    type = '',
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
    addLabel
    //onAdd,
  } = props;

  const theme = useTheme();

  // state
  const [inputText, setInputText] = useState<string>('');
  const [searchText, setSearchText] = useState('');
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchText(searchText), 1500)).current;
  const [options, setOptions] = useState<readonly Item[]>([]);
  const [selectedValue, setSelectedValue] = useState<Item | Item[] | null>(single ? null : []);

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
          // check value. then if not exist => add value to
          // let nOptions = [...options];
          // let isAdd = false;
          // value.map((_item) => {
          //   const found = nOptions.find((_opt) => _opt.id === _item.id);
          //   if (!found) {
          //     nOptions.push(_item);
          //     isAdd = true;
          //   }
          // });
          // if (isAdd) {
          //   setOptions(nOptions);
          // }
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
          // if value is not in options, then if not exist => add value to
          // const fIndex = options.findIndex((_ele: any) => _ele.id === value?.id);
          // if (fIndex === -1) {
          //   const newOptions = [...options];
          //   newOptions.unshift(value);
          //   setOptions(newOptions);
          // }
        }
      }
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  // build params
  const getSearchParams = useMemo(() => {
    let queryFilters: any[] = [];

    if (searchText != '') {
      queryFilters.push(`name:"${searchText}"`);
    }

    if (excludes?.length > 0) {
      queryFilters.push(`-id=(${excludes.join(' ')})`);
    }

    if (type && [PRODUCT_ITEM_TYPE_ENUM_GENERAL, PRODUCT_ITEM_TYPE_ENUM_COMPOSITE, PRODUCT_ITEM_TYPE_ENUM_PREPAID].includes(type)) {
      queryFilters.push(`itemType="${type}"`);
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
  }, [searchText, excludes, isPublic, token]);

  const {
    data: productData,
    status: searchStatus
    //refetch,
  } = useItemsAutoComplete(getSearchParams, isPublic);

  // render button add
  const renderAddItemButton = () => {
    return (
      <Typography
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          setIsOpen(false);
          setShowAdd(true);
        }}
        variant="body1"
        sx={{
          width: '100%',
          p: '8px',
          color: `${theme.palette.grey[500]}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          '&:hover': {
            color: `${theme.palette.grey[700]}`
          }
        }}
      >
        <AddIcon fontSize="small" />
        {`${addLabel}`}
      </Typography>
    );
  };

  // init states list
  useEffect(() => {
    if (productData?.data) {
      const addItem = {
        id: 'addItem',
        name: addLabel
      };
      let addMoreItems: any = [];
      if (addLabel) {
        addMoreItems = [addItem];
      }
      if (showAllOption && excludes?.length === 0) {
        addMoreItems.push({
          label: t(`ncrm_common_all`),
          value: 'all',
          id: 'all',
          name: t(`ncrm_common_all`)
        });
      }

      // if (value && _.isArray(value)) {
      //   addMoreItems = [...addMoreItems, ...value];
      // }
      // if (value && _.isObject(value)) {
      //   addMoreItems = [...addMoreItems, value];
      // }

      setOptions([...addMoreItems, ...productData.data]);
    } else {
      setOptions([]);
    }
  }, [productData]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string, reason: string) => {
    // prevent outside click from resetting inputText to ""
    setSearchText(value);
    setSearchTextDebounced(value);

    setInputText(value);
  };

  //value change
  const handleValueChange = (event: React.SyntheticEvent, selected: Item | Item[] | null, reason: string) => {
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

    if (_.isObject(newItem)) {
      const cloneItem = newItem as Item;
      setInputText(cloneItem?.name);
    }

    setSearchText('');
    setSearchTextDebounced('');

    //callback
    onChange && onChange(newItem);
  };

  let placeholderCond = placeholder;
  if (label) {
    placeholderCond = '';
  }

  //render
  return (
    <>
      <Autocomplete
        id="asynchronous-item"
        multiple={!single}
        disabled={isDisabled}
        //limitTags={3}
        // sx={{ minWidth: 300 }}
        sx={{ padding: '5px 0px', minWidth: 200 }}
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
            label={label}
            placeholder={placeholderCond}
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
        renderOption={(props, option, { selected }) => (
          <Box
            component="li"
            {...props}
            key={option.id}
            sx={{ borderBottom: addLabel && option.id === 'addItem' ? `1px solid ${theme.palette.divider}` : '' }}
          >
            {addLabel && option.name === addLabel ? (
              renderAddItemButton()
            ) : option.name === 'All' ? (
              <Typography sx={{ fontWeight: 500 }}>
                <SpanLang keyLang="ncrm_common_all" textOnly />
              </Typography>
            ) : (
              option.name
            )}
          </Box>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => {
            return <Chip label={option.name} {...getTagProps({ index })} key={option.id} />;
          })
        }
        inputValue={inputText}
        onInputChange={handleInputChange}
        value={selectedValue}
        onChange={handleValueChange}
        filterOptions={(options: Item[], state: any) => {
          return options;
        }}
      />
      {showAdd && <WritePage isOpen={showAdd} onClose={() => setShowAdd(false)} />}
    </>
  );
};

export default ItemAutoComplete;
