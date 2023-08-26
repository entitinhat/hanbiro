import { useMemo } from 'react';

import { Box } from '@mui/material';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { User } from '../../types';
import UserRoles from '../../containers/UserRoles';
import UserGroups from '../../containers/UserGroups';
import { useTranslation } from 'react-i18next';
import { USER_VIEW_GROUP, USER_VIEW_ROLE } from '../../config/constants';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: User;
  handleSave: (keyName: string, isSuccess: boolean, value: any) => void;
  refetch?: () => void;
}
const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, layoutData, handleSave, refetch } = props;
  const { t } = useTranslation();
  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: false,
        label: t(USER_VIEW_ROLE),
        path: 'roles',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <UserRoles menuSource={menuSource} menuSourceId={menuSourceId} />
      },
      {
        default: false,
        label: t(USER_VIEW_GROUP),
        path: 'groups',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <UserGroups menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
  }, [layoutData]);
  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, [layoutData]);

  return <Box className="scroll-box">{centerMemo}</Box>;
};

export default Center;
