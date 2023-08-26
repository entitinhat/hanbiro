import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MENU_PROJECT_PLANNING } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { useGetPlanning } from '@project/hooks/usePlanning';

import Center from './Center';
import Header from './Header';
import Left from './Left';
import Top from './Top';
// import Right from './Right';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_PROJECT_PLANNING;
  const menu = params.category as string;
  const menuSourceId = params?.id as string;

  const planningData = useGetPlanning('main', menuSourceId);

  console.log('planningData', planningData);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        projectId={planningData?.projectId}
        name={planningData?.name}
        menu={menu}
        isSplitMode={isSplitMode}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
      />
    );
  }, [menu, isSplitMode, planningData]);

  const LeftMemo = useMemo(() => {
    return <Left menuSource={menuSource} menuSourceId={menuSourceId} data={planningData} />;
  }, [planningData]);

  const CenterMemo = useMemo(() => {
    return <Center projectId={planningData?.projectId} menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [planningData]);

  // const RightMemo = useMemo(() => {
  //   return <Right menuSource={menuSource} menuSourceId={menuSourceId} />;
  // }, []);

  const TopMemo = useMemo(() => {
    return <Top />;
  }, []);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        componentTop={TopMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        // componentRight={RightMemo}
      />
    );
  }, [planningData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
