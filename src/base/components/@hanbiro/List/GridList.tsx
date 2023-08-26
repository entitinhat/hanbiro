import React from 'react';
import ListPagination from '@base/components/@hanbiro/List/ListPagination';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';

interface GridListProps {
  [x: string]: any;
}

const GridList = (props: GridListProps) => {
  const { pagingProps, onPageChange, isSmall, children } = props;

  const theme = useTheme();
  const { isMobile } = useDevice();

  return (
    <Grid container spacing={3} sx={{ px: 2, py: 1, ...(isSmall && { mt: 0, p: 0 }) }}>
      {children}
      {pagingProps ? (
        <Grid
          item
          xs={12}
          sx={
            isMobile
              ? {
                  position: 'absolute',
                  bottom: 0,
                  zIndex: 1005,
                  // bgcolor: theme.palette.divider,
                  bgcolor: theme.palette.background.default,
                  maxWidth: `calc(100% + 24px)`,
                  width: `calc(100% + 24px)`,
                  display: 'flex',
                  justifyContent: 'flex-end'
                }
              : {}
          }
        >
          <ListPagination
            gotoPage={(page: number) => onPageChange && onPageChange(page, pagingProps.pageSize)}
            setPageSize={(size: number, pageIndex) => onPageChange && onPageChange(pageIndex ?? pagingProps.pageIndex, size)}
            pageSize={pagingProps.pageSize}
            pageIndex={pagingProps.pageIndex}
            pageTotal={pagingProps.pageTotal}
            pageCount={pagingProps.pageCount}
            isSmall={isSmall}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default GridList;
