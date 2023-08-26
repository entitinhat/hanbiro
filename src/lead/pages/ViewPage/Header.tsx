import { useMemo, useState, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// mui import
import { useTheme } from '@mui/material';
import { SettingsOutlined } from '@mui/icons-material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { KEY_TICKET_SUBJECT } from '@desk/ticket/config/keyNames';
import Title from '@base/containers/ViewField/Title';
import WritePage from '../WritePage';
import { PageLayoutData } from '@base/types/pagelayout';
import { LEAD_MENUS } from '@base/config/routeMenus';
import { MENU_LEAD, MENU_SALES } from '@base/config/menus';
import { SET_TIMEOUT } from '@base/config/constant';
import { queryClient } from '@base/config/queryClient';

import { queryKeys } from '@lead/config/queryKeys';
import { KEY_LEAD_TITLE } from '@lead/config/keyNames';
import { useLeadsMutation } from '@lead/hooks/useLeadsMutation';
import { useLeadMutation } from '@lead/hooks/useLeadMutation';
import LeadQualify from '@lead/containers/Qualify';
import { LEAD_TYPE_DISQUALIFIED, LEAD_TYPE_UNQUALIFIED } from '@lead/config/constants';

interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  // menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();
  const { menu, isSplitMode, layoutData, menuSourceId } = props;
  const { menuSource, data } = layoutData;
  const layoutKey = `${MENU_SALES}_${MENU_LEAD}`;
  const navigate = useNavigate();

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showQualify, setShowQualify] = useState<boolean>(false);

  const titleKey = KEY_LEAD_TITLE;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  const { mDeleteLeads } = useLeadsMutation();
  const { mUpdateLead } = useLeadMutation();

  useEffect(() => {
    if ( mDeleteLeads.isSuccess) {
      // Navigate
      setTimeout(() => {
        queryClient.refetchQueries({ queryKey: [queryKeys.leadsGet]});
        navigate(`/${MENU_LEAD}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDeleteLeads.isSuccess]);


  const handleRefetch = () => {
    queryClient.refetchQueries({ queryKey: [queryKeys.leadsGet ]});
  }

  const title = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={data?.[titleKey]}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ ...userPermission, isEdit: data?.restore?.id ? false : userPermission?.isEdit ?? false, isShow: true }}
      />
    );
  }, [layoutData]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_common_print', //Print
      value: 'print',
      onClick: () => {}
    },
    {
      label: 'PDF', 
      value: 'pdf',
      onClick: () => {}
    },
    {
      label: 'ncrm_sales_lead_qualify', 
      value: 'qualified',
      onClick: () => {
        setShowQualify && setShowQualify(true);
      }
    },
    {
      label: 'ncrm_sales_lead_disqualify', 
      value: 'disqualified',
      onClick: () => {
        mUpdateLead.mutate({ lead:{ type: LEAD_TYPE_DISQUALIFIED }, id: menuSourceId });
      }
    },
    {
      label: 'ncrm_sales_lead_unqualify', 
      value: 'unqualified',
      onClick: () => {
        mUpdateLead.mutate({ lead:{ type: LEAD_TYPE_UNQUALIFIED }, id: menuSourceId });
      }
    },
    // {
    //   label: 'Add to Marketing List', 
    //   value: 'add_to_list',
    //   onClick: () => {}
    // },
    {
      label: 'sales_lead_field_basic_isprioritize', 
      value: 'prioritize',
      onClick: () => { 
        mUpdateLead.mutate({ lead: { isPrioritize : true, id: menuSourceId } })
       }
    },
    {
      label: 'ncrm_common_delete', 
      value: 'delete',
      onClick: () => {
        mDeleteLeads.mutate({ ids: [menuSourceId] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: LEAD_MENUS,
      menu: MENU_LEAD,
      isSplitMode,
      title,
      listTitle: {
        label: 'Sales Preferences', //Print
        value: 'title',
        icon: <SettingsOutlined fontSize="small" color="secondary" />,
        onClick: () => {}
      },
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menu, isSplitMode, title, moreActions]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}

      <WritePage
        isOpen={showWrite}
        onClose={() => setShowWrite(false)}
        onReload={handleRefetch}
        menuApi={layoutKey}
        // templateGroup='email'
      />
      {showQualify && (
      <LeadQualify 
        isOpen={showQualify}
        onClose={(qualifyData: any) => {
          console.log('showQualify', qualifyData);
          
          setShowQualify(false);
        }}
        leadId={menuSourceId}
        leadData={data}
        updateSingleLead={true}
       />)}
    </Suspense>
  );
};

export default Header;
