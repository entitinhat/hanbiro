import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//project
import { MENU_SOURCE } from '@base/config/menus';
import { Link } from 'react-router-dom';

import { queryKeys } from '@base/config/queryKeys';
import RawHTML from '@base/components/@hanbiro/RawHTML';

//Material-UI
import { Box, useTheme, Typography } from '@mui/material';

import ListProductURLs from './ListProductURLs';
import { productURLsFields } from './Helper';
import NoData from '@base/components/@hanbiro/NoData';
import useProductsMutation from '@settings/billing-license/hooks/products/useProductsMutation';

import ButtonGroup from '@mui/material/ButtonGroup';
import { FAKE_DATA_PRODUCT_URLS } from './fakeDataProductURLs';
// import { useProducts } from '@settings/billing-license/hooks/products/useProducts';

interface ProductURLsProps {
  menuSource: string;
  menuSourceId: string;
  sx?: any;
  hideWriteForm?: boolean;
  isRecent?: boolean;
  recentLimited?: number;
}

function ProductURLsContent(props: ProductURLsProps) {
  const { menuSource: inputMenuSource, menuSourceId, hideWriteForm, sx, isRecent, recentLimited = 3 } = props;
  const params = useParams();
  const id = menuSourceId != '' ? menuSourceId : params?.id ?? '';
  const theme = useTheme();
  const { t } = useTranslation();
  //state

  const [searchText, setSearchText] = useState<string>('');
  const [paging, setPaging] = useState<any>({ page: 1, size: 15 });
  const [currentPage, setCurrentPage] = useState<number>(0);

  // Fake data

  const data = FAKE_DATA_PRODUCT_URLS;

  const hasNextPage = null;
  const fetchNextPage = () => {};
  const refetch = () => {};
  const isError = false;

  // fake data ending

  const fields = productURLsFields;

  useEffect(() => {
    if (paging) {
      setCurrentPage(paging?.page - 1);
    }
    if (data && hasNextPage) {
      setCurrentPage(paging?.page - 1);
      fetchNextPage();
    }
  }, [paging, data]);

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    searchText.trim();
    refetch && refetch();
  };
  const ListProductURLsMemo = useMemo(() => {
    return <ListProductURLs itemsList={data || []} fields={fields} />;
  }, [currentPage, data]);

  return (
    <Box sx={{ ...sx }}>
      {!hideWriteForm && (
        <>
          {/* <Typography variant="body1" color={theme.palette.grey[600]}>
            Admin / tskwon
          </Typography> */}
          <Typography variant="h2">Product URLs</Typography>
          <Typography sx={{ fontWeight: 400, py: 2 }}>
            You can update a product's site URL up to 3 times. When you make a change, we'll redirect the previous URL to your new URL.
            Redirected URLs will be unavailable for new sites.{' '}
            <Link to="" style={{ textDecoration: 'none' }}>
              Learn more about product URLs
            </Link>
          </Typography>
        </>
      )}
      {!isError && data && <Box>{ListProductURLsMemo}</Box>}
    </Box>
  );
}

export default ProductURLsContent;
