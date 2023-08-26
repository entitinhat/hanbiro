import _ from 'lodash';
import { Suspense, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import SideBar from '@base/components/@hanbiro/Sidebar';
import { defaultPaging, LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROCESS, MENU_PROCESS_BUSINESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { useProcessList } from '@process/hooks/useProcess';
import { BusinessView, BusinessWrite } from '@process/pages/WritePage/Business';
import { GET_BUSINESS_PROCESSES } from '@process/services/process';
import { processOpenAtom } from '@process/store/atoms/process';

import PageBody from './Body';
import PageHeader from './Header';
import { fields, getQuery } from './Helper';
import PageToolbar from './Toolbar';

interface ListPageProps {
  isSplitMode: boolean;
}

const ProcessListPage = ({ isSplitMode }: ListPageProps) => {
  console.log('BusinessListPage');
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { category = MENU_PROCESS_BUSINESS } = useParams();
  const [processOpen, setProcessOpen] = useRecoilState(processOpenAtom);
  const pageDataKey = `${MENU_PROCESS}_${category}`;
  const { filtersQuery } = useListPageSettings(pageDataKey, getQuery);

  const { results: listData, refetch } = useProcessList(
    GET_BUSINESS_PROCESSES,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME
    }
  );

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={refetch} />;
  }, [isSplitMode, category]);

  const PageHeaderMemo = useMemo(() => {
    return <PageHeader isSplitMode={isSplitMode} onRefresh={refetch} category={category} />;
  }, [category, isSplitMode]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? defaultPaging}
      />
    );
  }, [listData, category]);

  const onCloseWrite = useCallback(() => {
    setProcessOpen({ open: false });
  }, []);

  return (
    <RetryErrorBoundary>
      <ListContainer>
        <Stack
          sx={{
            width: processOpen.open ? 'calc(100% - 400px)' : '100%',
            flexGrow: 1,
            overflow: 'hidden',
            height: '100%'
          }}
        >
          {PageToolbarMemo}
          {PageHeaderMemo}
          {PageBodyMemo}
        </Stack>
        <SideBar anchor="right" width={matchDownSM ? '100%' : 400} variant="permanent" open={processOpen.open}>
          <Suspense fallback={<></>}>
            {processOpen.data ? <BusinessView data={processOpen.data} onClose={onCloseWrite} /> : <BusinessWrite onClose={onCloseWrite} />}
            {/* <AutomationWrite open={writeOption.isOpenWrite} onClose={onCloseWrite} /> */}
          </Suspense>
        </SideBar>
      </ListContainer>
    </RetryErrorBoundary>
  );
};

export default ProcessListPage;
