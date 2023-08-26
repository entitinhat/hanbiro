import { useMemo, useState, Suspense, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ViewHeaderProps } from '@base/layouts/ViewLayout/types/interface';
import { LabelValueIcon, ListType } from '@base/types/app';
import { default as ViewHeader } from '@base/layouts/ViewLayout/Header';
import Title from '@base/containers/ViewField/Title';
import WritePage from '../WritePage';
import { PageLayoutData } from '@base/types/pagelayout';
import { DeleteOutlineOutlined } from '@mui/icons-material';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { REPORT_NAME } from '@analytic/report/config/keyNames';
import { MENU_ANALYTIC, MENU_ANALYTIC_REPORT } from '@base/config/menus';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { ANALYTIC_MENU } from '@base/config/routeMenus';
import useReportMutation from '@analytic/report/hooks/useReportMutation';
import { SET_TIMEOUT } from '@base/config/constant';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  menu: string;
  isSplitMode?: boolean;
  layoutData: PageLayoutData;
}

const Header = (props: HeaderProps) => {
  const { menu, isSplitMode, layoutData } = props;
  const { menuSource, menuSourceId, data } = layoutData;
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const titleKey = REPORT_NAME;
  const keySubIndex = layoutData?.layout?.data[0]?.children?.findIndex((_ele: any) => _ele.keyName === REPORT_NAME);
  const { listQueryKey } = useListQueryKeys(MENU_ANALYTIC_REPORT);
  const { mDeleteReport, mCopyReport } = useReportMutation(listQueryKey);

  const navigate = useNavigate();
  const title = useMemo(() => {
    return (
      <Title
        value={data?.[titleKey]}
        keyName={titleKey}
        menuSourceId={menuSourceId ?? ''}
        menuSource={menuSource ?? ''}
        userPermission={{ isEdit: true, isShow: true }}
      />
    );
  }, [layoutData]);

  useEffect(() => {
    if (mDeleteReport.isSuccess || mCopyReport.isSuccess) {
      setTimeout(() => {
        // back to list router
        navigate(`/${MENU_ANALYTIC}/report`, { replace: true });
      }, SET_TIMEOUT);
    }
  }, [mDeleteReport.isSuccess, mCopyReport.isSuccess]);

  const moreActions: LabelValueIcon[] = [
    {
      label: 'Clone',
      value: 'clone',
      icon: <CopyAllIcon fontSize="small" />,
      onClick: () => {
        mCopyReport.mutate({ id: menuSourceId });
      }
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <DeleteOutlineOutlined fontSize="small" color="error" />,
      onClick: () => {
        mDeleteReport.mutate({ ids: [menuSourceId ?? ''] });
      }
    }
  ];

  const HeaderMemo = useMemo(() => {
    const viewHeaderProps: ViewHeaderProps = {
      menus: ANALYTIC_MENU,
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
      {showWrite && (
        <WritePage
          isOpen={showWrite}
          onClose={() => setShowWrite(false)}
          category={menuSource}
          type={'view'}
          listType={ListType.LIST}
          menuApi={MENU_ANALYTIC_REPORT}
        />
      )}
    </Suspense>
  );
};

export default Header;
