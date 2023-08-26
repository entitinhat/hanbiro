import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import LanguageListSearch from '@base/containers/TranslatorEditor/TranslatorEditorModal/LanguageListSearch';
import { Search } from '@mui/icons-material';
import { Autocomplete, Box, Checkbox, OutlinedInput, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { menuData } from '@base/containers/TranslatorEditor/TranslatorEditorModal/config';
import _ from 'lodash';
import { useTranslatorEditors } from '@base/hooks/translator-editor/useTranslatorEditors';
import { Keylang, Menu } from '@translator/types';
import LanguageModal from '../WritePage';
import MenuAutoComplete from '@translator/containers/MenuAutoComplete';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import useDevice from '@base/hooks/useDevice';
import ListPagination, { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';

interface PageProsp {}

const MainPage = (props: PageProsp) => {
  const theme = useTheme();
  const { isMobile } = useDevice();
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
  const [keyword, setKeyword] = useState<string>('');
  const [dataListSearch, setDataListSearch] = useState<any>([]);
  const [searchText, setSearchText] = useState<string>(keyword);
  const setSearchTextDebounced = useRef(_.debounce((text) => setKeyword(text), 1500)).current;
  const [curEdit, setCurEdit] = useState<Keylang>(formDefaultValue);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [selectedMenus, setSelectedMenus] = useState<Menu[]>([
    {
      keyName: 'all',
      languageKey: 'All',
      label: 'All',
      value: 'all'
    }
  ]);
  const [isTransKo, setIsTransKo] = useState<boolean>(false);

  const [paging, setPaging] = useState<ListPaginationProps>({
    pageIndex: 1,
    pageSize: 15,
    pageTotal: 0,
    pageCount: 0
  });
  /** hook get data */
  console.log('selectedMenus', selectedMenus);
  const { data, isLoading, refetch } = useTranslatorEditors(
    keyword,
    selectedMenus.map((menu: Menu) => (menu.value === 'all' ? '' : menu.value)),
    isTransKo,
    { size: paging.pageSize, page: paging.pageIndex }
  );
  console.log('data list', data);
  //set search results
  useEffect(() => {
    if (data?.data) {
      setDataListSearch(data.data);
      setPaging({
        ...paging,
        pageIndex: data.paging.currentPage,
        pageTotal: data.paging.totalPage,
        pageCount: data.paging.totalItems
      });
    } else {
      setDataListSearch([]);
      if (data) {
        setPaging({
          ...paging,
          pageIndex: data.paging.currentPage,
          pageTotal: data.paging.totalPage,
          pageCount: data.paging.totalItems
        });
      }
    }
  }, [data]);

  // search
  const handleChangeSearch = (e: any) => {
    setSearchText(e.target.value);
    setSearchTextDebounced(e.target.value);
  };
  //refetch when change menu/transKo query
  useEffect(() => {
    refetch();
  }, [selectedMenus, isTransKo, paging]);
  //key press enter
  const handkeKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      refetch();
    }
  };

  const getCurEditVal = (keyNames: keyof Keylang, value: any) => {
    let nVal = { ...curEdit };
    nVal[keyNames] = value;
    setCurEdit((curEdit) => ({ ...curEdit, [keyNames]: value }));
  };

  //===================DEBUG===========
  // console.log('CurEdit', curEdit);
  //===================================
  return (
    <>
      <Box p={1}>
        <Stack direction="row" width={isMobile ? '100%' : '60%'} alignItems={'center'} spacing={1}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <MenuAutoComplete value={selectedMenus} onChange={(nVal) => setSelectedMenus(nVal as Menu[])} />
          </Box>
          <Stack direction="row" spacing={1} alignItems={'center'}>
            <Checkbox
              checked={isTransKo}
              onChange={(event) => {
                setIsTransKo(event.target.checked);
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <SpanLang keyLang={'Not Translated Korea'} sx={{ flexWrap: 'nowrap' }} />
          </Stack>
        </Stack>
      </Box>
      <Box p={1}>
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
            <LanguageListSearch
              dataListSearch={dataListSearch || []}
              isLoading={isLoading}
              setValue={getCurEditVal}
              openWrite={() => {
                setIsOpenEdit(true);
              }}
            />
          </Suspense>
        </Box>
        <ListPagination
          gotoPage={(page: number) => setPaging((prev) => ({ ...prev, pageIndex: page }))}
          setPageSize={(size: number, pageIndex) => {
            setPaging((prev) => ({ ...prev, pageSize: size }));
          }}
          pageSize={paging.pageSize}
          pageIndex={paging.pageIndex}
          pageTotal={paging.pageTotal}
          pageCount={paging.pageCount}
          sx={{ mt: 4 }}
        />
        {isOpenEdit && (
          <LanguageModal
            isOpen={isOpenEdit}
            onClose={() => {
              setCurEdit(formDefaultValue);
              setIsOpenEdit(false);
            }}
            value={curEdit}
            refetch={refetch}
          />
        )}
      </Box>
    </>
  );
};

export default MainPage;
