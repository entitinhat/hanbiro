import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AddingMenu, { AddingMenuProps } from '@base/components/@hanbiro/List/ListToolbar/AddingMenu';

//project
import { MENU_SOURCE } from '@base/config/menus';
import { queryKeys } from '@base/config/queryKeys';
import RawHTML from '@base/components/@hanbiro/RawHTML';

//Material-UI
import { Box, OutlinedInput, Divider, InputAdornment, Button, useTheme } from '@mui/material';
import { Search, Add, MoreHoriz } from '@mui/icons-material';
import { IconButton, Stack, MenuItem, SelectChangeEvent, Select, Typography } from '@mui/material';

import ListProducts from './ListProducts';
import { productsFields } from './Helper';
import NoData from '@base/components/@hanbiro/NoData';
import useProductsMutation from '@settings/billing-license/hooks/products/useProductsMutation';

import { FAKE_DATA_PRODUCTS } from './fakeDataProducts';
// import { useProducts } from '@settings/billing-license/hooks/products/useProducts';
import AddIcon from '@mui/icons-material/Add';
interface ProductsProps {
  menuSource: string;
  menuSourceId: string;
  sx?: any;
  hideWriteForm?: boolean;
  isRecent?: boolean;
  recentLimited?: number;
}

function ProductsContent(props: ProductsProps) {
  const { menuSource: inputMenuSource, menuSourceId, hideWriteForm, sx, isRecent, recentLimited = 3 } = props;
  const params = useParams();
  const id = menuSourceId != '' ? menuSourceId : params?.id ?? '';
  const theme = useTheme();
  const { t } = useTranslation();
  //state
  const [openWrite, setOpenWrite] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [paging, setPaging] = useState<any>({ page: 1, size: 15 });
  const [currentPage, setCurrentPage] = useState<number>(0);
  const maxPaging: number = 3;
  const menuSource = MENU_SOURCE[inputMenuSource] ?? inputMenuSource;
  const { mSortNote } = useProductsMutation(menuSourceId);

  // Fake data

  const data = FAKE_DATA_PRODUCTS;
  const hasNextPage = null;
  const fetchNextPage = () => {};
  const refetch = () => {};
  const isError = false;

  // fake data ending

  const fields = productsFields;

  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState('');
  useEffect(() => {
    if (paging) {
      setCurrentPage(paging?.page - 1);
    }
    if (data && hasNextPage) {
      setCurrentPage(paging?.page - 1);
      fetchNextPage();
    }
  }, [paging, data]);

  //handler
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    searchText.trim();
    refetch && refetch();
  };
  //get items dragged and dropped
  const handleDragDrop = (result: any) => {
    const source = {
      menu: menuSource,
      id: menuSourceId
    };
    mSortNote.mutate(
      {
        items: result,
        source: source
      },
      {
        onSuccess: () => {
          refetch();
        }
      }
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (item: any) => {
    setOpen(true);
    setContentModal(item.content);
  };
  const ListProductsMemo = useMemo(() => {
    return (
      <ListProducts
        itemsList={data || []}
        fields={fields}
        paging={data || {}}
        setPaging={(value: any) => {
          setPaging(value);
        }}
        handleDragDrop={handleDragDrop}
        menuSourceId={menuSourceId}
      />
    );
  }, [currentPage, data]);

  return (
    <Box sx={{ ...sx }}>
      {!hideWriteForm && (
        <>
          {/* <Typography variant="body1" color={theme.palette.grey[600]}>
            Admin / tskwon
          </Typography> */}
          <Box justifyContent={'space-between'} sx={{ display: 'flex' }}>
            <Typography variant="h2">Products</Typography>
            {/* <AddingMenu
                items={[{ label: '123', value: '1234' }]}
                onClick={() => alert('something')}
                // iconOnly={isMobile || isSmall}
                // {...addingMenuProps}
                value={'Add Product'}
                label={'Add Product'}
              /> */}
            <Button size="small" variant="contained" sx={{ ml: 'auto' }}>
              <AddIcon fontSize="small" />
              Add Product
            </Button>
            <IconButton sx={{ border: `1px solid ${theme.palette.divider}`, ml: 1 }}>
              <MoreHoriz />
            </IconButton>
          </Box>
          <Typography sx={{ fontWeight: 400, py: 2 }}>
            Manage access, changes, and more for all the products in your organization.
          </Typography>

          <Stack direction="row" paddingY={2}>
            <OutlinedInput
              onChange={handleTextChange}
              value={searchText}
              onKeyPress={handleEnter}
              placeholder={'Find by name'}
              size="small"
              endAdornment={
                <>
                  {/* <Divider orientation="vertical" sx={{ height: 32 }} /> */}
                  <InputAdornment
                    position="end"
                    sx={{
                      '& .MuiInputAdornment-sizeSmall': {
                        width: 32,
                        ml: '-8px'
                      },
                      ':hover': {
                        '& .MuiIconButton-root': {
                          bgcolor: theme.palette.primary.lighter,
                          color: `${theme.palette.primary.main}`
                        }
                      },
                      '& .MuiIconButton-root': {
                        height: 32
                      },
                      py: 0
                    }}
                  >
                    <IconButton
                      aria-label="search"
                      edge="end"
                      color="inherit"
                      sx={{
                        ml: '-8px',
                        mr: '-14px'
                      }}
                      onClick={() => {}}
                    >
                      <Search sx={{}} fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                </>
              }
            />
            <Select
              sx={{
                // px: 2,
                mx: 1,
                bgcolor: theme.palette.secondary.lighter,
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 }
              }}
              size="small"
              value={''}
              displayEmpty
              // inputProps={{ 'aria-label': 'Without label' }}
              onChange={(event: SelectChangeEvent) => {
                // setUnit(event.target.value);
              }}
            >
              <MenuItem value="">
                <span>Products</span>
              </MenuItem>
              <MenuItem value={'days'}>days</MenuItem>
              <MenuItem value={'months'}>months</MenuItem>
              <MenuItem value={'years'}>years</MenuItem>
            </Select>

            <Select
              sx={{
                bgcolor: theme.palette.secondary.lighter,
                boxShadow: 'none',
                '.MuiOutlinedInput-notchedOutline': { border: 0 }
              }}
              size="small"
              value={''}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              onChange={(event: SelectChangeEvent) => {
                // setUnit(event.target.value);
              }}
            >
              <MenuItem value="">
                <span>Plans</span>
              </MenuItem>
              <MenuItem value={'days'}>days</MenuItem>
              <MenuItem value={'months'}>months</MenuItem>
              <MenuItem value={'years'}>years</MenuItem>
            </Select>
          </Stack>
        </>
      )}
      {!isError && data && <Box>{ListProductsMemo}</Box>}
    </Box>
  );
}

export default ProductsContent;
