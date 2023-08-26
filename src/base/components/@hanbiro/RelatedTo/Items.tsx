import { DeleteTwoTone } from '@ant-design/icons';
import Icon from '@base/assets/icons/svg-icons';
import NoData from '@base/components/@hanbiro/NoData';
import { LabelValue } from '@base/types/app';
import { IconButton, List, ListItem, ListItemText, Stack, styled, SvgIcon, Tooltip, Typography, useTheme } from '@mui/material';
import { RelatedValue } from './interface';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';

interface ItemsProps {
  items: RelatedValue[];
  relatedToOptions: LabelValue[];
  onDelete: (itemId: string) => void;
}

const Items = (props: ItemsProps) => {
  const theme = useTheme();
  const { items = [], onDelete, relatedToOptions } = props;
  return (
    <>
      <ListWrapper>
        <List>
          {items.length == 0 && <NoData icon={'Package'} iconType={'feather'} />}
          {items.length > 0 &&
            items.map((item: RelatedValue, index) => {
              const type = relatedToOptions.find((_v) => _v.extra == item.type)!!;
              return (
                <ListItem
                  key={index}
                  divider
                  sx={{
                    border: 0,
                    pt: 0,
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tooltip title="Delete">
                        <IconButton
                          edge="end"
                          size="medium"
                          color="error"
                          onClick={(e: any) => {
                            onDelete(item.id);
                          }}
                        >
                          <DeleteTwoTone twoToneColor={theme.palette.error.main} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Tooltip title={type.label}>
                            <SvgIcon fontSize="small" sx={{ mt: 0.8 }}>{Icon(type.value as string)}</SvgIcon>
                          </Tooltip>
                          <Typography>{item.name}</Typography>
                        </Stack>
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

export default Items;
