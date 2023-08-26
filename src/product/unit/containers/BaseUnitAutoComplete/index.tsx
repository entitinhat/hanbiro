import React, { useState, useEffect, useRef } from 'react';

//third-party
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

//project
import { BaseUnit } from '@product/unit/types/unit';
import { handleScroll } from '@settings/users-groups/utils/helper';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';

// material-ui
import { Autocomplete, CircularProgress, TextField, Box } from '@mui/material';
import { useBaseUnits } from '@product/unit/hooks/useBaseUnits';
import { PaginateInput } from '@base/types/common';
import { event } from 'jquery';

interface BaseUnitAutoCompleteProps {
  single?: boolean;
  value?: BaseUnit | BaseUnit[] | undefined;
  onChange?: (val: BaseUnit | BaseUnit[] | null) => void;
}

/**
 *
 * @param {*} props
 * @returns
 */
const BaseUnitAutoComplete = (props: BaseUnitAutoCompleteProps) => {
  const {
    single = true,
    value, //[], initial value
    onChange
  } = props;

  const { t } = useTranslation();
  // state
  const [searchParams, setSearchParams] = useState(''); //search text on params
  const [searchInput, setSearchInput] = useState(''); //search text on display
  const setSearchTextDebounced = useRef(_.debounce((searchText) => setSearchParams(searchText), 1500)).current;
  const [options, setOptions] = useState<BaseUnit[]>([]);
  const [selectedValue, setSelectedValue] = useState<BaseUnit | BaseUnit[] | null>(single ? null : []);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  // const [isSearch, setIsSearch] = useState<boolean>(false);

  // hook
  const {
    data: postData,
    status: searchStatus,
    refetch,
    isLoading
  } = useBaseUnits({
    keyword: searchParams,
    paging: {
      page: page,
      size: LIST_TABLE_PAGE_SIZE
    } as PaginateInput
  });

  // init options
  useEffect(() => {
    if (postData?.data && postData?.data?.length > 0) {
      if(page == 1){
        setOptions(postData.data);
      }
      else if (page > 1){
        setOptions((prev) => [...prev, ...postData.data]);
      }
    }
  }, [postData, page]);

  // init selected
  useEffect(() => {
    if (value) {
      if (Array.isArray(value)) {
        if (JSON.stringify(value) !== JSON.stringify(selectedValue)) {
          const newValue: BaseUnit[] = [];
          value.map((_item: BaseUnit, _index: number) => {
            const fOption = options.find((_ele: BaseUnit) => _ele.id === _item.id);
            if (fOption) {
              newValue.push(fOption);
            }
          });
          setSelectedValue(newValue);
        }
      } else {
        const selectedId = Array.isArray(selectedValue) ? selectedValue?.map((_ele: any) => _ele.id) : selectedValue?.id;
        if (value?.id !== selectedId) {
          setSelectedValue(single ? value : [value]);
        }
      }
    } else {
      setSelectedValue(single ? null : []);
    }
  }, [value, options]);

  // input text change
  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    if(event?.type === 'change'){ // on text change => change search params, change input
      setSearchParams(value);
      setSearchInput(value)
      setSearchTextDebounced(value);
    }else{ // onclick options just change Display, not change search params keep the old options
      setSearchParams((prev) => prev);
      setSearchInput(value)
      setSearchTextDebounced(searchParams);
    }
    if(!value){ // reset when clear search
      setSearchParams('');
      setSearchTextDebounced('');
    }
    setPage(1)
  };

  // value change
  const handleValueChange = (event: React.SyntheticEvent, selected: BaseUnit | BaseUnit[] | null, reason: string) => {
    let newItem = selected;
    setSelectedValue(newItem);
    // callback
    onChange && onChange(newItem);
  };

  //render
  return (
    <Autocomplete
      id="asynchronous-base-unit"
      multiple={!single}
      sx={{ minWidth: 300 }}
      ListboxProps={{
        onScroll: (event: any) => {
          const orderCondition = postData?.paging?.totalPage && postData?.paging?.totalPage > page ? true : false;
          /**handle scroll to load more data */
          handleScroll(event, orderCondition, () => {
            setPage((prev) => prev + 1);
          });
        },
        style: { maxHeight: 150 },
        className: " scroll-box"
      }}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option?.name ?? ''}
      options={options}
      loading={isLoading}
      filterSelectedOptions={!single}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={t(`ncrm_product_place_holder_base_unit_auto`) as string}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <Box component="li" {...props} key={option.id}>
          {option.name}
        </Box>
      )}
      inputValue={searchInput}
      onInputChange={handleInputChange}
      value={selectedValue}
      onChange={handleValueChange}
    />
  );
};

export default BaseUnitAutoComplete;
