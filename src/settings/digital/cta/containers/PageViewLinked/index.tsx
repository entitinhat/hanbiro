import { Box } from '@mui/material';

import {
  SETTING_CTA_CONTENT_TYPE_LANDING_PAGE,
  SETTING_CTA_CONTENT_TYPE_SITE,
  SETTING_CTA_CONTENT_TYPE_SURVEY,
  SETTING_CTA_LINK_TYPE_INTERNAL,
  SETTING_CTA_LINK_TYPE_EXTERNAL
} from '@settings/digital/cta/config/constants';

import LandingPageViewLinked from './LandingPage';
import SiteViewLinked from './Site';
import SurveyViewLinked from './Survey';

interface PageViewLinkedProps {
  contentType?: string;
  resource?: any;
  resourceType?: string;
  linkType: string;
  linkURL?: string;
}

const PageViewLinked = (props: PageViewLinkedProps) => {
  const { contentType, resource, linkType, linkURL, resourceType } = props;

  const height = 'calc(100vh - 220px)';
  return (
    <>
      {/* Site linked */}
      {contentType == SETTING_CTA_CONTENT_TYPE_SITE && linkType == SETTING_CTA_LINK_TYPE_INTERNAL && (
        <Box sx={{ height: height, p: 1 }}>
          <SiteViewLinked id={resource?.id} />
        </Box>
      )}
      {/* Survey linked */}
      {contentType == SETTING_CTA_CONTENT_TYPE_SURVEY && linkType == SETTING_CTA_LINK_TYPE_INTERNAL && (
        <Box sx={{ height: height, p: 1 }}>
          <SurveyViewLinked id={resource?.id} />
        </Box>
      )}
      {/* Landing Page linked */}
      {contentType == SETTING_CTA_CONTENT_TYPE_LANDING_PAGE && linkType == SETTING_CTA_LINK_TYPE_INTERNAL && (
        <Box sx={{ height: height, p: 1 }}>
          <LandingPageViewLinked id={resource?.id} />
        </Box>
      )}
      {/* External type */}
      {linkType == SETTING_CTA_LINK_TYPE_EXTERNAL && linkURL && (
        <Box sx={{ height: height, p: 1 }}>
          <iframe src={linkURL} height="100%" width="100%" style={{ borderStyle: 'none' }}></iframe>
        </Box>
      )}
    </>
  );
};

export default PageViewLinked;
