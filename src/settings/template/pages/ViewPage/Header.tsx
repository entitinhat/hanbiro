import React, { useMemo, useState, Suspense, useEffect } from 'react';
import * as keyNames from '@settings/template/config/key-names';
// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { SETTING_TEMPLATE_MENUS } from '@base/config/routeMenus';

import Title from '@base/containers/ViewField/Title';

import { PageLayoutData } from '@base/types/pagelayout';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

import WritePage from '@settings/template/pages/WritePage/index';
import useMenuTemplateMutation from '@settings/template/hooks/useMenuTemplateMutation';
import { useNavigate } from 'react-router-dom';
import { SET_TIMEOUT } from '@base/config/constant';
import Icon from '@base/assets/icons/svg-icons';

import { queryKeys } from '@settings/template/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { useListQueryKeyTemplate } from '@settings/template/hooks/useListQueryKeyTemplate';
import { TemplateGroup } from '@settings/template/types/template';
import ModalPreview from '@settings/template/containers/ModalPreview';

import useMenuTemplateClone from '@settings/template/hooks/useMenuTemplateClone';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  titleWrite: string;
  templateGroup: TemplateGroup;
  layoutData: PageLayoutData;
  viewConfig: any;
  groupTemplate: string;
}

const Header = (props: HeaderProps) => {
  const { menu, isSplitMode, layoutData, titleWrite, templateGroup, viewConfig, groupTemplate } = props;
  const { menuSource, menuSourceId, data } = layoutData;

  //state
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [dataPreview, setDataPreview] = useState<{ html: string; css: string } | undefined>({ html: '', css: '' });

  const navigate = useNavigate();
  const id = menuSourceId as string;
  const { t } = useTranslation();

  const { mutationDelete, isSuccess } = useMenuTemplateMutation();
  const mutationClone = useMenuTemplateClone();

  const filter = useListQueryKeyTemplate(menuSource, groupTemplate);
  const queryClient = useQueryClient();

  //constants
  const titleKey = keyNames.KEY_MENU_TEMPLATE_NAME;
  const subTypeKey = keyNames.KEY_MENU_TEMPLATE_SUB_TYPE;

  const subType = layoutData?.layout?.data[0]?.children?.find((_ele: any) => _ele?.keyName === subTypeKey);
  const subTypeData = t(subType?.data)
  const isSequenceTask = subTypeData === 'Check list' || subTypeData === 'Sequence';

  const handlePreviewClick = () => {
    const html = layoutData?.layout?.data[0]?.children?.find((_field: any) => _field?.keyName === keyNames.KEY_MENU_TEMPLATE_DESIGN);

    let htmlData = '';
    if (html == undefined || html?.data == '') {
      htmlData = JSON.stringify({ html: '', css: '' });
    } else {
      htmlData = html.data;
    }
    setDataPreview(JSON.parse(htmlData));
    setIsPreview(true);
  };

  const handleOnSave = async (keyName: string, isSuccess: boolean, value: any) => {
    //GET query View Page and List Page
    let queryKey = [queryKeys.settingMenuTemplateNew, menuSourceId];
    let queryListKey = [queryKeys.settingMenuTemplatesGet, filter];

    if (isSuccess) {
      await queryClient.cancelQueries(queryKey);
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          [keyName]: value[keyName]
        };
      });
      await queryClient.cancelQueries(queryListKey);
      queryClient.setQueryData(queryListKey, (old: any) => {
        const newData = [...old.data];
        const fIdx = newData.findIndex((_ele: any) => _ele.id === menuSourceId);
        if (newData[fIdx][keyName]) {
          newData[fIdx][keyName] = value[keyName];
        }
        return {
          data: newData,
          paging: old.paging
        };
      });
    }
  };

  const title = useMemo(() => {
    return (
      <Title
        value={data?.[titleKey]}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ isEdit: true, isShow: true }}
        onSave={handleOnSave}
      />
    );
  }, [layoutData]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/settings/template/${menu}`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (mutationClone.isSuccess) {
      if (mutationClone.data?.id) {
        setTimeout(() => {
          // back to list router
          navigate(`/settings/template/${menu}/${mutationClone.data.id}`, { replace: true });
        }, SET_TIMEOUT);
      }
    }
  }, [mutationClone.isSuccess]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_setting_template_preview', //Preview
      value: 'preview',
      icon: Icon('preview_template'),
      onClick: () => {
        handlePreviewClick();
      }
    },
    {
      label: 'ncrm_setting_template_clone', //Clone
      value: 'clone',
      icon: <FileCopyIcon fontSize="small" />,
      onClick: () => {
        mutationClone.mutate({ id: menuSourceId });
      }
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'ncrm_setting_template_delete', //Delete
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mutationDelete({ ids: [id] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: SETTING_TEMPLATE_MENUS,
      menu,
      isSplitMode,
      title,
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
      {showWrite && <WritePage isOpen={showWrite} onClose={() => setShowWrite(false)} title={titleWrite} templateGroup={templateGroup} />}
      {isPreview && (
        <ModalPreview
          isSequenceTask={isSequenceTask}
          isOpen={isPreview}
          size="xl"
          title="ncrm_setting_template_preview_template" //Preview Template
          value={dataPreview}
          handleClose={() => setIsPreview(false)}
        />
      )}
    </Suspense>
  );
};

export default Header;
