import { MENU_SETTING_SURVEY } from '@base/config/menus';
import { PageLayoutData } from '@base/types/pagelayout';
import { useSurvey } from '@public-page/survey/hooks/useSurvey';
import SurveyView from '@settings/digital/survey/containers/SurveyView';
import { useMemo } from 'react';

interface SurveyProps {
  id: string;
  readonly?: boolean;
  token: string;
}

const Survey = (props: SurveyProps) => {
  const { id, readonly = true, token } = props;

  // defined
  const menuSource = MENU_SETTING_SURVEY;
  const menuSourceId = id;

  const { data, isLoading, refetch } = useSurvey(token, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [ data]);

  const SurveyMemo = useMemo(() => {
    let curSections: any[] = [];
    try {
      if (layoutData?.data?.sections) {
        curSections = JSON.parse(layoutData?.data?.sections);
      }
    } catch {
      // console.log('parse json error');
    }

    return (
      <SurveyView
        id={layoutData?.data?.id}
        token={token}
        name={layoutData?.data?.name}
        previewData={{
          headerImg: layoutData?.data?.headerImg,
          headerLineColor: layoutData?.data?.headerLineColor,
          bgColor: layoutData?.data?.bgColor,
          sections: curSections
        }}
        isPublic
        readOnly={readonly}
      />
    );
  }, [layoutData]);

  return <>{SurveyMemo}</>;
};

export default Survey;
