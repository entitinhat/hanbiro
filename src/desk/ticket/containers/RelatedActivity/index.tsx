import { ActivityStatusOptions, ACTIVITY_MENU_DEFAULT, ACTIVITY_MENU_KEYS, ACTIVITY_MENU_TASK } from '@activity/config/constants';
import { ACTIVITY_ADD_OPTIONS } from '@activity/pages/ListPage/Toolbar';
import WritePage from '@activity/pages/WritePage';
import { RelatedActivity } from '@activity/types/activity';
import AddingMenu, { AddingMenuProps } from '@base/components/@hanbiro/List/ListToolbar/AddingMenu';
import NoData from '@base/components/@hanbiro/NoData';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { MENU_ACTIVITY } from '@base/config/menus';
import useSnackBar from '@base/hooks/useSnackBar';
import { WriteOption } from '@base/types/common';
import { BaseMutationResponse } from '@base/types/response';
import { useRelatedActivity } from '@desk/ticket/hooks/useRelatedActivity';
import useRelatedActivityMutation from '@desk/ticket/hooks/useRelatedActivityMutation';
import { DeleteTwoTone } from '@ant-design/icons';
import { Chip, IconButton, List, ListItem, ListItemText, Stack, styled, useMediaQuery, useTheme } from '@mui/material';
import { Box } from '@mui/material';
import { keys } from 'lodash';
import { useEffect, useState } from 'react';
import { ActivityQuickView } from '@base/containers/QuickView';
const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';

interface RelatedActivityProps {
  menuSource: string;
  menuSourceId: string;
  isSmall?: boolean;
  addingMenuProps?: AddingMenuProps;
}

const RelatedActivity = (props: RelatedActivityProps) => {
  const { menuSourceId, isSmall } = props;
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: '', isOpenWrite: false });
  const theme = useTheme();
  const { enqueueSuccessBar } = useSnackBar();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const addOptions = keys(ACTIVITY_ADD_OPTIONS).map((k: string) => {
    return {
      label: ACTIVITY_ADD_OPTIONS[k].name,
      value: k,
      icon: ACTIVITY_ADD_OPTIONS[k].icon
    };
  });
  //state
  const [items, setItems] = useState<any>([]);

  // recoil
  const { mDeleteActivites } = useRelatedActivityMutation();
  const source = { menu: 'MODULE_TICKET', id: menuSourceId };
  //get list
  const { data, isLoading, refetch } = useRelatedActivity('MODULE_TICKET', menuSourceId);
  const handleDelete = (item: RelatedActivity) => {
    mDeleteActivites.mutate(
      { ids: [item.id] },
      {
        onSuccess: (res: BaseMutationResponse) => {
          const nItems = items.filter((temp: RelatedActivity) => {
            return item.id != temp.id;
          });
          setItems(nItems);
          enqueueSuccessBar('Activity has removed!');
        },
        onError: (res: any) => {
          enqueueSuccessBar('Activity has failed!');
        }
      }
    );
  };

  const addingMenuProps = {
    items: addOptions,
    onClick: (item: string) => {
      setWriteOption({
        writeType: item === ACTIVITY_MENU_DEFAULT ? ACTIVITY_MENU_TASK : item,
        isOpenWrite: true
      });
    }
  };

  //init list
  useEffect(() => {
    if (data?.results) {
      setItems(data.results);
    } else {
      setItems([]);
    }
  }, [data]);
  //items view
  const renderItems = () => {
    return (
      <>
        <ListWrapper>
          <List>
            {items.length == 0 && <NoData icon={'Package'} iconType={'feather'} />}
            {items.length > 0 &&
              !isLoading &&
              items.map((item: RelatedActivity, index: number) => {
                const foundStatusLang = ActivityStatusOptions.find((s: any) => {
                  return s.value === item.status;
                });
                return (
                  <ListItem
                    key={item.id || index}
                    secondaryAction={
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Chip
                          label={foundStatusLang ? <SpanLang keyLang={foundStatusLang.label} /> : item.status}
                          color="primary"
                          variant="light"
                        />
                        <IconButton
                          edge="end"
                          size="medium"
                          color="error"
                          onClick={(e: any) => {
                            handleDelete(item);
                          }}
                        >
                          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemText
                      primary={
                        <>
                          <ActivityQuickView value={{ id: item.id, name: item.subject }} type={item} />
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
          </List>
        </ListWrapper>
      </>
    );
  };
  return (
    <>
      <Box sx={{ postion: 'relative', mb: '10px' }}>{renderItems()}</Box>
      <AddingMenu iconOnly={matchesSm || isSmall} {...addingMenuProps} />
      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        type={writeOption.writeType}
        menuApi={writeOption.writeType !== '' ? `${MENU_ACTIVITY}_${writeOption.writeType}` : ''}
        onReload={() => {
          refetch();
        }}
        source={source}
      />
    </>
  );
};

export default RelatedActivity;
