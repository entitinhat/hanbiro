import ViewTabs from '@base/components/@hanbiro/ViewTabs';
import { TabProps } from '@base/components/@hanbiro/ViewTabs/interface';
import { Box } from '@mui/material';
import { useMemo } from 'react';

interface CenterProps {
  menuSource: string;
  menuSourceId: string;
  handleSave: (keyName: string, isSuccess: boolean, value: any) => void;
  refetch?: () => void;
}
const Center = (props: CenterProps) => {
  const { menuSource, menuSourceId, handleSave, refetch } = props;

  const tabs: TabProps[] = useMemo(() => {
    return [
      {
        default: true,
        label: 'Infomation', //Timeline
        path: 'information',
        order: 1,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <></>
      },
      {
        default: false,
        label: 'Contact', //Notes
        path: 'contact',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <></>
      },
      {
        default: false,
        label: 'Roles', //Notes
        path: 'roles',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <></>
      },
      {
        default: false,
        label: 'Groups', //Notes
        path: 'groups',
        order: 2,
        icon: <></>,
        iconPosition: 'start',
        tabComponent: <></>
      }
    ];
  }, []);
  const viewTabsProps = { menuSource, menuSourceId, tabs };
  const centerMemo = useMemo(() => {
    return <ViewTabs {...viewTabsProps} />;
  }, []);

  return <Box className="scroll-box">{centerMemo}</Box>;
};

export default Center;
