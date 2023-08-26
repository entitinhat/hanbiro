import { useMemo, useState, Suspense } from 'react';

// mui import
import { useTheme } from '@mui/material';

// types
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';

// project import
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import { DESK_MENUS } from '@base/config/routeMenus';
import { KEY_KNOWLEDGE_BASE_SUBJECT } from '@desk/knowledge-base/config/keyNames';
import Title from '@base/containers/ViewField/Title';
import WritePage from '../WritePage';
import { PageLayoutData } from '@base/types/pagelayout';
import { ArrowDownward, ArrowUpward, CopyAllOutlined, DeleteOutlineOutlined, Link, PrintOutlined } from '@mui/icons-material';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import useSnackBar from '@base/hooks/useSnackBar';
import useKBContentMutation from '@desk/knowledge-base/hooks/useKBContentMutation';
import { queryClient } from '@base/config/queryClient';
import { useNavigate } from 'react-router-dom';
import useKBClone from '@desk/knowledge-base/hooks/useKBClone';
import useKBDelete from '@desk/knowledge-base/hooks/useKBDelete';
import useCopyLink from '@base/hooks/shorten-url/useShortenUrls';
import PrintPreview from '@desk/knowledge-base/containers/PrintPreview';
import { DEFAULT_ROUTE } from '@desk/knowledge-base/config/constants';
import { queryKeys } from '@desk/knowledge-base/config/queryKeys';

interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  onRefresh?: (updateData: any) => void;
  isViewMode?: boolean;
}

const Header = (props: HeaderProps) => {
  const theme = useTheme();

  const { menu, isSplitMode, layoutData, menuSource, menuSourceId = '', onRefresh, isViewMode = true } = props;
  const { data } = layoutData;

  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [showPrint, setShowPrint] = useState<boolean>(false);

  const titleKey = KEY_KNOWLEDGE_BASE_SUBJECT;
  const titleField = layoutData?.layout?.data?.[0]?.children?.find((_ele: any) => _ele.keyName === titleKey);
  console.log(titleField, layoutData);
  const titleMemo = useMemo(() => {
    const userPermission = titleField?.config?.viewProps?.userPermission ?? titleField?.userPermission;
    return (
      <Title
        value={titleField?.data ?? ''}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        config={titleField?.config}
        userPermission={{ ...userPermission, isEdit: data?.restore?.id ? false : userPermission?.isEdit ?? false }}
      />
    );
  }, [layoutData]);
  //SnackBars
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  //mutation
  const { mCopyLink } = useCopyLink();
  const { mDeleteKB } = useKBDelete();
  const { mCloneKB } = useKBClone();
  const { mChangePublishStatus } = useKBContentMutation();

  //MoreActions Calls
  const onCopyLink = () => {
    const cUrl = document.location.href;
    mCopyLink.mutate(
      { longUrls: [cUrl] },
      {
        onSuccess: (res: any) => {
          // console.log('mCopyLink', res);
          if (res && res?.results.length) {
            navigator?.clipboard?.writeText(res.results[0].shortUrl);
            enqueueSuccessBar('Link has copied!');
          }
        }
      }
    );
  };
  const kbId = layoutData?.menuSourceId ?? '';
  const isPublish = layoutData?.data?.isPublish ?? false;

  const onChangePublishStatus = (isPublish: boolean) => {
    mChangePublishStatus.mutate(
      { ids: [kbId], isPublish: isPublish },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
          // console.log('doisPublish', isPublish);
          onRefresh && onRefresh({ isPublish: isPublish });
        },
        onError: () => {
          enqueueErrorBar('There was an error!');
        }
      }
    );
  };

  const onClone = () => {
    mCloneKB.mutate(
      { id: kbId },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was saved!');
        }
      }
    );
  };

  const navigate = useNavigate();

  const goList = () => {
    queryClient.invalidateQueries([queryKeys.listKnowledgebases]);
    navigate(DEFAULT_ROUTE);
  };

  const onDelete = () => {
    mDeleteKB.mutate(
      { ids: [kbId] },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Data was removed!');
          goList();
        }
      }
    );
  };
  //==============

  const moreActions: LabelValueIcon[] = [
    {
      label: 'ncrm_common_print',
      value: 'print',
      icon: <PrintOutlined fontSize="small" />,
      onClick: () => setShowPrint(true)
    },
    {
      label: 'ncrm_desk_knowledge_base_detail_more_copy_link',
      value: 'copy',
      icon: <Link fontSize="small" />,
      onClick: () => onCopyLink()
    },
    {
      label: isPublish ? 'ncrm_desk_knowledge_base_detail_unpublish' : 'ncrm_desk_knowledge_base_detail_publish',
      value: isPublish ? 'unpublish' : 'publish',
      icon: isPublish ? <ArrowDownward fontSize="small" /> : <ArrowUpward fontSize="small" />,
      onClick: () => {
        const newStatus = !isPublish;
        onChangePublishStatus(newStatus);
      }
    },
    {
      label: 'ncrm_common_clone',
      value: 'clone',
      icon: <CopyAllOutlined fontSize="small" />,
      onClick: () => onClone()
    },
    {
      label: 'Divider',
      value: 'divider'
    },
    {
      label: 'ncrm_common_btn_delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        onDelete();
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: DESK_MENUS,
      menu,
      isSplitMode,
      title: titleMemo
      // moreActions,
      // onNew: (mode?: string) => {
      //   setShowWrite(true);
      // }
    };
    return <ViewHeader {...viewHeaderProps} hideChangeMenu={!isViewMode} hideBackButton={!isViewMode} />;
  }, [menu, isSplitMode, layoutData, moreActions]);

  return (
    <Suspense fallback={<></>}>
      {HeaderMemo}
      {showWrite && (
        <WritePage
          isOpen={showWrite}
          onClose={() => setShowWrite(false)}
          category={menuSource}
          type={'view'}
          listType={ListType.LIST}
          menuApi={MENU_DESK_KNOWLEDGE}
          // onReload={onRefresh}
        />
      )}
      {showPrint && (
        <PrintPreview
          title="ncrm_desk_knowledge_print_preview"
          isOpen={showPrint}
          onClose={() => setShowPrint(false)}
          layoutData={layoutData}
        />
      )}
    </Suspense>
  );
};

export default Header;
