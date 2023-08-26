import { useMemo } from 'react';

//material
import {
  ArticleOutlined,
  HighlightAlt,
  History,
  MapOutlined,
  NoteAltOutlined,
  PendingActions,
  PeopleOutline,
  SettingsAccessibility,
  TimerOutlined
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

//project
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { PageLayoutData } from '@base/types/pagelayout';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import Activities from '@base/containers/Activities';

//menu
import ConfigurationView from '@campaign/containers/ConfigurationView';
import ContentView from '@campaign/containers/ContentView';
import TargetMember from '@campaign/containers/TargetMember';
import JourneyProcess from '@campaign/containers/JourneyProcess';
import { CAMPAIGN_CATEGORY_EMAIL } from '@campaign/config/constants';
import Overview from '@campaign/containers/Overview';
import LinkMap from '@campaign/containers/LinkMap';
import OpenTimeline from '@campaign/containers/OpenTimeline';
import Interaction from '@campaign/containers/Interaction';
import RecipientDetail from '@campaign/containers/RecipientDetail';

interface CenterProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData, ignoreFields } = props;
  const { t } = useTranslation();

  const tabs: TabProps[] = useMemo(() => {
    const defaultTabs: TabProps[] = [
      {
        default: true,
        label: t('Target Members'),
        path: 'target',
        order: 2,
        icon: <PeopleOutline fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <TargetMember menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('Configuration'),
        path: 'configuration',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ConfigurationView
            menuSource={menuSource}
            menuCategory={menuCategory}
            menuSourceId={menuSourceId}
            layoutData={layoutData}
            ignoreFields={ignoreFields}
            readOnly={layoutData?.data?.restore?.id ? true : false}
          />
        )
      },
      // {
      //   default: false,
      //   label: t('Target Members'),
      //   path: 'target',
      //   order: 2,
      //   icon: <PeopleOutline fontSize="small" />,
      //   iconPosition: 'start',
      //   tabComponent: <TargetMember menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} />
      // },
      {
        default: false,
        label: t('Journey Process'),
        path: 'journey',
        order: 3,
        icon: <PendingActions fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <JourneyProcess menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_timeline'),
        path: 'timeline',
        order: 4,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_notes'),
        path: 'note',
        order: 5,
        icon: <NoteAltOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_customer_activities'),
        path: 'activity',
        order: 6,
        icon: <PendingActions fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Activities menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
    if (menuCategory === CAMPAIGN_CATEGORY_EMAIL) {
      const contentTab: TabProps = {
        default: false,
        label: t('Email Content'),
        path: 'content',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <ContentView
            menuSource={menuSource}
            menuCategory={menuCategory}
            menuSourceId={menuSourceId}
            layoutData={layoutData}
            ignoreFields={ignoreFields}
            readOnly={layoutData?.data?.restore?.id ? true : false}
          />
        )
      };
      defaultTabs.splice(1, 0, contentTab);
    }

    //TODO - chart tabs
    defaultTabs.push({
      default: false,
      label: t('Overview'),
      path: 'overview',
      order: 1,
      icon: <History fontSize="small" />,
      iconPosition: 'start',
      tabComponent: (
        <Overview
          menuSource={menuSource}
          menuCategory={menuCategory}
          menuSourceId={menuSourceId}
          layoutData={layoutData}
          ignoreFields={ignoreFields}
          readOnly={layoutData?.data?.restore?.id ? true : false}
        />
      )
    });
    defaultTabs.push({
      default: false,
      label: t('Link Map'),
      path: 'linkmap',
      order: 1,
      icon: <MapOutlined fontSize="small" />,
      iconPosition: 'start',
      tabComponent: (
        <LinkMap
          menuSource={menuSource}
          menuCategory={menuCategory}
          menuSourceId={menuSourceId}
          layoutData={layoutData}
          ignoreFields={ignoreFields}
          readOnly={layoutData?.data?.restore?.id ? true : false}
        />
      )
    });
    defaultTabs.push({
      default: false,
      label: t('Open Timeline'),
      path: 'opentimeline',
      order: 1,
      icon: <TimerOutlined fontSize="small" />,
      iconPosition: 'start',
      tabComponent: (
        <OpenTimeline
          menuSource={menuSource}
          menuCategory={menuCategory}
          menuSourceId={menuSourceId}
          layoutData={layoutData}
          ignoreFields={ignoreFields}
          readOnly={layoutData?.data?.restore?.id ? true : false}
        />
      )
    });
    defaultTabs.push({
      default: false,
      label: t('Interaction'),
      path: 'interaction',
      order: 1,
      icon: <HighlightAlt fontSize="small" />,
      iconPosition: 'start',
      tabComponent: (
        <Interaction
          menuSource={menuSource}
          menuCategory={menuCategory}
          menuSourceId={menuSourceId}
          layoutData={layoutData}
          ignoreFields={ignoreFields}
          readOnly={layoutData?.data?.restore?.id ? true : false}
        />
      )
    });
    defaultTabs.push({
      default: false,
      label: t('Recipient Detail'),
      path: 'recipient-detail',
      order: 1,
      icon: <SettingsAccessibility fontSize="small" />,
      iconPosition: 'start',
      tabComponent: (
        <RecipientDetail
          menuSource={menuSource}
          menuCategory={menuCategory}
          menuSourceId={menuSourceId}
          layoutData={layoutData}
          ignoreFields={ignoreFields}
          readOnly={layoutData?.data?.restore?.id ? true : false}
        />
      )
    });

    return defaultTabs;
  }, [layoutData, menuCategory]);

  const viewTabsProps = { menuSource, menuSourceId, tabs };

  const centerMemo = useMemo(() => {
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
};

export default Center;
