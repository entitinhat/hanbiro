import { useMemo } from 'react';

import { Link } from '@mui/icons-material';

import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { PageLayoutData } from '@base/types/pagelayout';
import * as keyNames from '@settings/digital/cta/config/keyNames';
import { t } from 'i18next';
import PageViewLinked from '../../containers/PageViewLinked';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, ignoreFields } = props;

  const contentType = layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_CONTENT_TYPE)
    ?.data?.value;
  const resource =
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_LANDINGPAGE)?.data ||
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_SITE)?.data ||
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_SURVEY)?.data;

  const resourceType =
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE)?.data ||
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_SITE_TYPE)?.data ||
    layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_SURVEY_TYPE)?.data;

  const linkType = layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_LINK_TYPE)?.data
    ?.value;
  const linkURL = layoutData?.layout?.data?.[0]?.children?.find((_item: any) => _item?.keyName == keyNames.KEY_SETTING_CTA_LINK_URL)?.data
    ?.link;

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: t('ncrm_generalsetting_cta_view_page_link'),
        path: 'link',
        order: 0,
        icon: <Link fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <PageViewLinked contentType={contentType} resource={resource} resourceType={resourceType} linkType={linkType} linkURL={linkURL} />
        )
      }
    ];
  }, [layoutData]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
};

export default Center;
