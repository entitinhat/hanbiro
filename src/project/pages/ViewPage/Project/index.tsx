import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { MENU_PROJECT } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { useGetProject } from '@project/hooks/useProject';

import Center from './Center';
import Header from './Header';
import Left from './Left';
import Top from './Top';
import { GET_PROJECT } from '../../../services/project';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_PROJECT;
  const menu = params.category as string;
  const menuSourceId = params?.id as string;

  const projectData = useGetProject(GET_PROJECT, { id: menuSourceId });

  console.log('projectData', projectData);

  const HeaderMemo = useMemo(() => {
    return <Header name={projectData?.name} menu={menu} isSplitMode={isSplitMode} menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [menu, isSplitMode, projectData]);

  const LeftMemo = useMemo(() => {
    return <Left menuSource={menuSource} menuSourceId={menuSourceId} data={projectData} />;
  }, [projectData]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, []);

  const TopMemo = useMemo(() => {
    return <Top />;
  }, []);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentTop={TopMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} />;
  }, [projectData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
