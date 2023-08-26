import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
//material
import { ArticleOutlined, History, NoteAltOutlined } from '@mui/icons-material';

//project
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import Timeline from '@base/containers/TimeLine';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import SurveyForm from '@settings/digital/survey/containers/SurveyForm';
import { SURVEY_TYPE_GENERAL } from '@settings/digital/survey/config/constants';

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
  let curSections: any[] = [];
  try {
    if (layoutData?.data?.sections) {
      curSections = JSON.parse(layoutData.data.sections);
    }
  } catch {
    // console.log('parse json error');
  }

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: t('ncrm_generalsetting_survey_design'),
        path: 'design',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <SurveyForm
            id={layoutData?.data?.id}
            type={layoutData?.data?.type || SURVEY_TYPE_GENERAL}
            survey={layoutData?.data}
            value={{
              headerImg: layoutData?.data?.headerImg,
              headerLineColor: layoutData?.data?.headerLineColor,
              bgColor: layoutData?.data?.bgColor,
              //image: surveyImage,
              sections: curSections
            }}
          />
        )
      },
      {
        default: false,
        label: t('ncrm_generalsetting_survey_timeline'),
        path: 'timeline',
        order: 1,
        icon: <History fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t('ncrm_generalsetting_survey_notes'),
        path: 'note',
        order: 2,
        icon: <NoteAltOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: <Notes menuSource={menuSource} menuSourceId={menuSourceId} />
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
