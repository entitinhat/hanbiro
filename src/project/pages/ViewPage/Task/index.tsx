import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MENU_PROJECT } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

import Center from './Center';
import Header from './Header';
import Left from './Left';
import Right from './Right';

interface ViewProps {
  isSplitMode?: boolean;
}

const TaskViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_PROJECT;
  const menu = params.category as string;
  const menuSourceId = params?.id as string;

  const HeaderMemo = useMemo(() => {
    return <Header name="Dev Task" menu={menu} isSplitMode={isSplitMode} menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [menu, isSplitMode]);

  const LeftMemo = useMemo(() => {
    return <Left menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, []);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, []);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, []);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} componentRight={RightMemo} />;
  }, []);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default TaskViewPage;
