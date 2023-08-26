import React, { useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  SxProps,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ceil } from 'lodash';
import IconButton from '@base/components/@extended/IconButton';
import { FirstPage, KeyboardArrowLeft, KeyboardArrowRight, LastPage, NavigateNext } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import SpanLang from '../../SpanLang';
import { LIST_TABLE_PAGE_SIZE_IAM } from '@base/config/constant';

export interface ListPaginationProps {
  pageIndex: number;
  pageSize: number;
  pageTotal: number;
  pageCount: number;
}

interface Props extends ListPaginationProps {
  gotoPage: (value: number) => void;
  setPageSize: (value: number, pageIndex?: number) => void;
  isSmall?: boolean;
  sx?: SxProps;
}

const ListPagination = ({ gotoPage, setPageSize, pageSize, pageIndex, pageTotal, pageCount, isSmall = false, sx }: Props) => {
  console.log('pageIndex', pageIndex, 'pageSize', pageSize, 'pageTotal', pageTotal, 'pageCount', pageCount);
  const theme = useTheme();
  const { t } = useTranslation();

  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangePagination = (value: number) => {
    gotoPage(value);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = +event.target.value;
    const newPageTotal = ceil(pageCount / newPageSize);
    if (newPageTotal < pageIndex) {
      setPageSize(newPageSize, newPageTotal);
    } else {
      setPageSize(newPageSize);
    }
  };

  const isLastItem = pageCount - (pageIndex - 1) * pageSize == 1;

  const listPageOf =
    pageIndex == pageTotal
      ? pageCount == 0
        ? 0
        : isLastItem
        ? pageCount
        : `${(pageIndex - 1) * pageSize + 1} - ${pageCount}`
      : `${(pageIndex - 1) * pageSize + 1} - ${pageIndex * pageSize}`;

  return (
    <Stack direction="row" spacing={0} sx={{ px: 1, mb: 3, ...sx }} alignItems="center" justifyContent={matchesSm ? 'center' : 'flex-end'}>
      {/* {!matchesSm && !isSmall && (
        <Stack direction="row">
          <Typography>{`${t('ncrm_common_total_items')}: ${pageCount.toLocaleString()}`}</Typography>
        </Stack>
      )} */}
      <Stack direction="row" alignItems="center" spacing={isSmall ? 1 : 1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>
            <SpanLang keyLang={`ncrm_common_row_per_page`} textOnly />
          </Typography>
          <FormControl sx={{ m: 1 }}>
            <Select
              size="small"
              sx={{
                '& .MuiSelect-select': {
                  py: 0.75,
                  px: 1.25
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 0
                },
                '& .MuiSelect-outlined': {
                  fontSize: '14px !important',
                  display: 'flex',
                  alignItems: 'center'
                }
              }}
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              {[10, 15, 25, 50, 100, LIST_TABLE_PAGE_SIZE_IAM].map((v) => (
                <MenuItem key={v} value={v}>
                  {v}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography> {`${listPageOf} ${t(`ncrm_common_of`)}  ${pageCount.toLocaleString()}`} </Typography>

          {/* <IconButton
            size="small"
            sx={{
              color: pageIndex == 1 ? 'grey.300' : 'grey.500',
              '&:hover': {
                borderColor: pageIndex == 1 ? 'grey.300' : 'grey.500',
                bgcolor: pageIndex == 1 ? 'inherit' : 'grey.100',
                color: pageIndex == 1 ? 'grey.300' : 'grey.500'
              }
            }}
            variant="outlined"
            shape="rounded"
            onClick={() => handleChangePagination(1)}
          >
            <FirstPage sx={{ fontSize: '16px' }} />
          </IconButton> */}
          {/* <IconButton
            size="small"
            sx={{
              color: pageIndex > 1 ? 'grey.500' : 'grey.300',
              '&:hover': {
                borderColor: pageIndex > 1 ? 'grey.500' : 'grey.300',
                bgcolor: pageIndex > 1 ? 'grey.100' : 'inherit',
                color: pageIndex > 1 ? 'grey.500' : 'grey.300'
              }
            }}
            variant="text"
            shape="rounded"
            onClick={() => handleChangePagination(pageIndex - 1)}
          >
            <KeyboardArrowLeft sx={{ fontSize: '16px' }} />
          </IconButton> */}
        </Stack>
        <Stack direction="row" spacing={0} alignItems="center" sx={{ ml: 1 }}>
          <IconButton
            size="medium"
            sx={{
              color: pageIndex > 1 ? 'grey.500' : 'grey.300',
              '&:hover': {
                borderColor: pageIndex > 1 ? 'grey.500' : 'grey.300',
                bgcolor: pageIndex > 1 ? 'grey.100' : 'inherit',
                color: pageIndex > 1 ? 'grey.500' : 'grey.300'
              }
            }}
            variant="text"
            shape="rounded"
            disabled={pageIndex == 1}
            onClick={() => handleChangePagination(pageIndex - 1)}
          >
            <KeyboardArrowLeft sx={{ fontSize: '24px' }} />
          </IconButton>
          <IconButton
            size="medium"
            sx={{
              color: pageIndex < pageTotal ? 'grey.500' : 'grey.300',
              '&:hover': {
                borderColor: pageIndex < pageTotal ? 'grey.500' : 'grey.300',
                bgcolor: pageIndex < pageTotal ? 'grey.100' : 'inherit',
                color: pageIndex < pageTotal ? 'grey.500' : 'grey.300'
              }
            }}
            variant="text"
            shape="rounded"
            disabled={pageIndex >= pageTotal}
            onClick={() => handleChangePagination(pageIndex + 1)}
          >
            <KeyboardArrowRight sx={{ fontSize: '24px' }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ListPagination;
