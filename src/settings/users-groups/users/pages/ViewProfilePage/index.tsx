import { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Center from './Center';

import Header from './Header';
import ViewLayout from '@base/layouts/ViewLayout';

interface ViewPageProps {}
const ViewPage = (props: ViewPageProps) => {
  // params

  const CenterMemo = useMemo(() => {
    return <></>;
  }, []);
  const HeaderMemo = useMemo(() => {
    return <></>;
  }, []);

  const ViewMemo = useMemo(() => {
    return <></>;
  }, []);
  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
