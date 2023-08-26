import { lazy } from 'react';

import Loadable from '@base/components/App/Loadable';
import { Navigate } from 'react-router-dom';
import HorizontalFlow from '../pages/flowChart';

// render - menu page
const SamplePage = Loadable(lazy(() => import('@demo-page/pages/samples/sample-page')));
const DiagramPage = Loadable(lazy(() => import('@demo-page/pages/samples/process-diagram')));
const MainPage = Loadable(lazy(() => import('@demo-page/pages/MainPage')));
const WebRpcPage = Loadable(lazy(() => import('@demo-page/pages/WebRpcPage')));
const StoragePage = Loadable(lazy(() => import('@demo-page/pages/StoragePage')));
const EditorPage = Loadable(lazy(() => import('@demo-page/pages/EditorPage')));
const FlowChartPage = Loadable(lazy(() => import('@demo-page/pages/flowChart')));

const Routes = {
  path: 'demo-page',
  element: <MainPage />,
  children: [
    {
      index: true,
      element: <Navigate to={`sample`} />
    },
    {
      path: 'sample',
      element: <SamplePage />
    },
    {
      path: 'diagram',
      element: <DiagramPage />
    },
    {
      path: 'webrpc',
      element: <WebRpcPage />
    },
    {
      path: 'storage',
      element: <StoragePage />
    },
    {
      path: 'editor',
      element: <EditorPage />
    },
    {
      path: 'flowchart',
      element: <FlowChartPage />
    }
  ]
};
export default Routes;
