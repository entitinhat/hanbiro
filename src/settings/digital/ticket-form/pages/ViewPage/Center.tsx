import { useMemo } from 'react';

//material
import { ArticleOutlined, History, NoteAltOutlined, PendingActions, SupportAgent } from '@mui/icons-material';

//project
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import Notes from '@base/containers/Notes';
import { PageLayoutData } from '@base/types/pagelayout';
import CenterPreview from '@settings/digital/ticket-form/containers/CenterPreview';
import { useTranslation } from 'react-i18next';

interface CenterProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  // showTabs: number;
  viewConfig?: any;
}

const Center = (props: CenterProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData, ignoreFields, viewConfig } = props;
  const { t } = useTranslation();

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: t('ncrm_generalsetting_ticket_form_preview'),
        path: 'detail',
        order: 0,
        icon: <ArticleOutlined fontSize="small" />,
        iconPosition: 'start',
        tabComponent: (
          <CenterPreview
            layoutData={layoutData}
            // menuSource={menuSource}
            menuSourceId={menuSourceId}
            // ignoreFields={ignoreFields }
            // viewConfig={ viewConfig }
            // groupTemplate='email'
          />
        )
      },
      {
        default: false,
        label: t('ncrm_generalsetting_ticket_form_notes'),
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
    return layoutData.layout?.keyNames.length === 0 ? '' : <ViewTabs {...viewTabsProps} swipeView={false} />;
  }, [layoutData]);

  return <>{centerMemo}</>;
  // return <div>Center</div>
};

export default Center;
