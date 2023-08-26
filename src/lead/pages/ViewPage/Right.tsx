import { useMemo, lazy, useState } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { useTheme } from '@mui/material';
import { PageLayoutData } from '@base/types/pagelayout';
import CollectionMethod from '@lead/components/CollectionMethod';
// import ActivityList from '@lead/containers/ActivityList';
import Activities from '@base/containers/Activities';
import AddingMenu from '@base/components/@hanbiro/List/ListToolbar/AddingMenu';
import useDevice from '@base/hooks/useDevice';
import { WriteOption } from '@base/types/common';
import { ACTIVITY_ADD_OPTIONS } from '@activity/pages/ListPage/Toolbar';
import { keys } from 'lodash';
import WritePage from '@activity/pages/WritePage';
import { ListType } from '@base/types/app';
import { MENU_ACTIVITY } from '@base/config/menus';
import Notes from '@base/containers/Notes';
import WriteNotePage from '@base/containers/Notes/WriteNotePage';
interface RightProps {
  menuSource: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}
const Right = (props: RightProps) => {
  const { menuSource, menuSourceId, layoutData } = props;
  const { data } = layoutData;
  //states
  const [activityWrite, setActivityWrite] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const [noteWrite, setNoteWrite] = useState<boolean>(false);

  //hooks
  const theme = useTheme();
  const { isMobile } = useDevice();

  //Activity add items
  const pagelayoutMenu = `${MENU_ACTIVITY}_${activityWrite.writeType}`;

  const addOptions = keys(ACTIVITY_ADD_OPTIONS).map((k: string) => {
    return {
      label: ACTIVITY_ADD_OPTIONS[k].name,
      value: k,
      icon: ACTIVITY_ADD_OPTIONS[k].icon
    };
  });

  const cards = useMemo(() => {
    return [
      {
        title: 'sales_lead_field_basic_collectionmethod',
        component: <CollectionMethod data={data?.collectionMethod ?? null} />
      },
      {
        title: 'ncrm_common_recent_activities',
        component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        cardContentSx: { p: '0px !important' },
        addBtn: (
          <AddingMenu
            iconOnly={isMobile}
            items={addOptions}
            label="ncrm_common_btn_add"
            onClick={(item: string) => {
              setActivityWrite({
                writeType: item,
                isOpenWrite: true
              });
            }}
          />
        ),
        isExpandable: true
      },
      {
        title: 'ncrm_common_recent_notes',
        component: <Notes menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
        cardContentSx: { p: '0px !important' },
        isExpandable: true
      }
    ];
  }, [menuSource, menuSourceId, data]);

  return (
    <>
      <ViewAsideContainer theme={theme}>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
      {activityWrite.isOpenWrite && (
        <WritePage
          isOpen={activityWrite.isOpenWrite}
          onClose={() => {
            setActivityWrite({ ...activityWrite, isOpenWrite: false });
          }}
          category={'activity'}
          type={activityWrite.writeType}
          listType={ListType.LIST}
          menuApi={activityWrite.writeType !== '' ? pagelayoutMenu : ''}
        />
      )}
      {noteWrite && (
        <WriteNotePage
          value={''}
          isOpen={noteWrite}
          onClose={() => {
            setNoteWrite(false);
          }}
          sourceId={menuSourceId}
          source={menuSource}
        />
      )}
    </>
  );
};

export default Right;
