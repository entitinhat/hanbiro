import React from 'react';
import { extractUrlParams } from '@public-page/site/utils';
import { ESiteType, ETrackingType } from '@public-page/site/types/enums';
import DeskTicketView from '@public-page/site/containers/desk/TicketView';

interface ViewPageProps {
  param?: string;
}
const ViewPage = (props: ViewPageProps) => {
  const { param } = props;
  const siteParams = extractUrlParams(param);
  console.log('siteParams', siteParams);
  return (
    <>
      {siteParams.trackingType === ETrackingType.SITE && siteParams.siteType === ESiteType.DESK && (
        <DeskTicketView siteParams={siteParams} />
      )}
      {/* {siteParams.trackingType !== ETrackingType.SITE && <ViewContainer />} */}
    </>
  );
};

export default ViewPage;
