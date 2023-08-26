import React, { Suspense, useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//project
import { SET_TIMEOUT } from '@base/config/constant';
import { DIGITAL_SURVEY_MENUS } from '@base/config/routeMenus';
import Title from '@base/containers/ViewField/Title';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@settings/digital/survey/config/keyNames';
import WritePage from '@settings/digital/survey/pages/WritePage';
import { useSurveyDelete } from '@settings/digital/survey/hooks/useSurveyMutations';
import PrintPreview from '@settings/digital/survey/containers/PrintPreview';

//material
import { CachedOutlined, DeleteOutlineOutlined, PrintOutlined } from '@mui/icons-material';

interface HeaderProps {
  //menu: string;
  menuSource: string; //e.g: setting_survey
  menuCategory: string; //e.g: survey
  menuSourceId: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData; // can get from recoil
  ignoreFields?: string[];
  onRefresh?: () => void;
}

const Header = (props: HeaderProps) => {
  const {
    //menu,
    menuSource,
    menuCategory,
    menuSourceId = '',
    isSplitMode,
    layoutData,
    ignoreFields = [],
    onRefresh
  } = props;

  //state
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  //constants
  const titleKey = keyNames.KEY_SURVEY_NAME;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);

  //hooks
  const navigate = useNavigate();
  const mutationDelete = useSurveyDelete({ onCancel: undefined });
  const { t } = useTranslation();

  useEffect(() => {
    if (mutationDelete.isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/settings/digital/${menuCategory}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mutationDelete.isSuccess]);

  // useEffect(() => {
  //   if (mutationClone.isSuccess) {
  //     if (mutationClone.data?.id) {
  //       setTimeout(() => {
  //         // back to list router
  //         navigate(`/settings/digital/${menuCategory}/${mutationClone.data.id}`, { replace: true });
  //       }, SET_TIMEOUT);
  //     }
  //   }
  // }, [mutationClone.isSuccess]);

  //render title
  const TitleRender = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? <em>({t('ncrm_common_setting_none')})</em>}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={userPermission}
      />
    );
  }, [titleField]);

  //action events
  const moreActions: LabelValueIcon[] = [
    {
      label: t('ncrm_generalsetting_survey_more_print'),
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => {
        setShowPrint(true);
      }
    },
    // {
    //   label: 'Clone',
    //   value: KEY_CUSTOMER_CLONE,
    //   icon: <ContentCopyOutlined fontSize="small" />,
    //   onClick: () => {
    //     mutationClone.mutate({id: menuSourceId});
    //   }
    // },
    {
      label: t('ncrm_generalsetting_survey_more_refresh'),
      value: 'refresh',
      icon: <CachedOutlined fontSize="small" />,
      onClick: () => {
        onRefresh && onRefresh();
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: t('ncrm_common_btn_delete'),
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mutationDelete.mutate({ ids: [menuSourceId] });
      }
    }
  ];

  //render header
  const HeaderRender = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: DIGITAL_SURVEY_MENUS,
      menu: menuCategory,
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
      <WritePage isOpen={showWrite} onClose={() => setShowWrite(false)} menuApi={'setting_survey'} onReload={onRefresh} />
      <PrintPreview isOpen={showPrint} onClose={() => setShowPrint(false)} layoutData={layoutData} />
    </>
  );
};

export default Header;
