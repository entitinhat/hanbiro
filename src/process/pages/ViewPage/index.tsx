import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MENU_PROCESS } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { useGetProcess } from '@process/hooks/useProcess';

import Center from './Center';
import Header from './Header';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;
  const params = useParams();
  const menuSource = MENU_PROCESS;
  const menu = params.category as string;
  const menuSourceId = params?.id as string;

  const processData = useGetProcess(menuSourceId);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        menu={menu}
        isSplitMode={isSplitMode}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        name={processData?.name}
        // onRefresh={refetch}
      />
    );
  }, [menu, isSplitMode, processData]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [processData]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentCenter={CenterMemo} />;
  }, [processData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
