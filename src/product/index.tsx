import React from 'react';
import { extractUrlParams } from '@public-page/landingpage/utils';

const ViewPage = () => {
  const publicParams = extractUrlParams();

  return <>{`This public page for landingPage`}</>;
};

export default ViewPage;
