import React, { useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import { MENU_CUSTOMER, MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import { CUSTOMER_MENUS, OPPORTUNITY_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';
import { queryKeys } from '@opportunity/config/queryKeys';

import Icon from '@base/assets/icons/svg-icons';

//menu
import * as keyNames from '@opportunity/config/keyNames';
import WritePage from '@opportunity/pages/WritePage';

//material
import { useTranslation } from 'react-i18next';
// import useMarketingDelete from '@marketing-list/hooks/useMarketingDelete';
import { Opportunity } from '@opportunity/types/interfaces';
import useOpportunityUpdate from '@opportunity/hooks/useOpportunityUpdate';
import { CLOSE_TYPE_HOLD } from '@opportunity/config/constants';
import WriteOpportunityClose from '@opportunity/containers/WriteOpportunityClose';
import useOpportunityDelete from '@opportunity/hooks/useOpportunityDelete';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {
  routeCategory: string;
  menuSource: string; //e.g: customer
  menuCategory: string; //e.g: account
  menuSourceId: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: () => void;
}

const Header = (props: HeaderProps) => {
  const { routeCategory, menuSource, menuCategory, menuSourceId = '', isSplitMode, layoutData, ignoreFields = [], onRefresh } = props;
  const { t } = useTranslation(); //state
  const queryClient = useQueryClient();
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showOpportunityWrite, setShowOpportunityWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);
  const mUpdate = useOpportunityUpdate();
  // delete
  const mDelete = useOpportunityDelete({ onReload: onRefresh });

  // //restore deleted items
  const handleDelete = () => {
    mDelete.mutate(
      { ids: [menuSourceId] },
      {
        onSuccess: () => {
          // queryClient.invalidateQueries({
          //   queryKey: [queryKeys.opportunityList],
          //   refetchType: 'inactive'
          // });
          setTimeout(() => {
            // back to list router
            navigate(`/opportunity/opportunity`, { replace: true });
          }, SET_TIMEOUT);
        }
      }
    );
  };

  //constants
  const titleKey = keyNames.KEY_NAME_OPPORTUNITY_TITLE;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();

  const handleOnSave = (keyName: string, isSuccess: boolean, value: any) => {
    //console.log('...Activity > View > handleOnSave ', keyName, isSuccess, value);

    // optimisticQueryKey
    const cohesionFields: string[] = []; //this field value change will be impact on other fields;
    if (isSuccess && cohesionFields.indexOf(keyName) >= 0) {
      queryClient.setQueryData([queryKeys.opportunityGet], (old: Opportunity | undefined) => {
        return { ...old, ...value };
      });
    }

    setTimeout(() => {
      onRefresh && onRefresh();
    }, SET_TIMEOUT);
  };

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? <em>(none)</em>}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={{ ...userPermission, isEdit: layoutData?.data?.restore?.id ? false : userPermission?.isEdit ?? false }}
        onSave={handleOnSave}
      />
    );
  }, [titleField]);

  const handleCloseAsHold = () => {
    const params = {
      opportunity: {
        [keyNames.KEY_NAME_OPPORTUNITY_CLOSE_TYPE]: CLOSE_TYPE_HOLD,
        id: menuSourceId
      }
    };

    mUpdate.mutate(params, {
      onSettled: () => {
        setTimeout(() => {
          onRefresh && onRefresh();
        }, SET_TIMEOUT);
      }
    });
  };

  //action events
  const moreActions: LabelValueIcon[] = [
    {
      label: t('Sales Perferences'),
      value: 'print',
      // icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        // setShowPrint(true);
      }
    },
    {
      label: t('Closed as Lost'),
      value: 'refresh',
      // icon: <CachedOutlined fontSize="small" />,
      onClick: () => setShowOpportunityWrite(true)
    },
    {
      label: t('Closed as Hold'),
      value: 'closed_as_hold',
      onClick: handleCloseAsHold
    },
    {
      label: t('ncrm_common_btn_canceled'),
      value: 'canceled',
      // icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        // handleDelete();
      }
    },
    {
      label: t('ncrm_common_btn_delete'),
      value: 'delete',
      // icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        handleDelete();
      }
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: OPPORTUNITY_MENUS,
      menu: routeCategory,
      isSplitMode,
      title: TitleRender,
      moreActions,
      onNew: (mode?: string) => {
        setShowWrite(true);
      }
    };
    return <ViewHeader {...viewHeaderProps} />;
  }, [menuCategory, isSplitMode, titleField, moreActions]);

  return (
    <>
      {HeaderRender}

      <WritePage
        fullScreen={false}
        isOpen={showWrite}
        onClose={() => setShowWrite(false)}
        menuApi={MENU_OPPORTUNITY_OPPORTUNITY}
        onReload={onRefresh}
      />
      <WriteOpportunityClose
        isOpen={showOpportunityWrite}
        onClose={() => {
          setShowOpportunityWrite(false);
        }}
        menuSourceId={menuSourceId}
      />
    </>
  );
};

export default Header;
