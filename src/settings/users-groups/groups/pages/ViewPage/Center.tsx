import { useMemo } from 'react';

import { Box } from '@mui/material';
import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { Group } from '../../types/group';
import MembershipsContainer from '../../containers/Memberships';

import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import { useTranslation } from 'react-i18next';
import { GROUP_VIEW_MEMBERSHIPS } from '../../config/constants';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: Group;
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
        label: t(GROUP_VIEW_MEMBERSHIPS),
        path: 'membership',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: (
          <MembershipsContainer
            menuSourceId={menuSourceId}
            onSave={handleSave}
            value={(layoutData && layoutData[keyNames.KEY_GROUPS_MEMBERSHIPS]) ?? []}
          />
        )
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
