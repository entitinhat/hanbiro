import { DeleteTwoTone } from '@ant-design/icons';
import NoData from '@base/components/@hanbiro/NoData';
import { KnowledgeQuickView } from '@base/containers/QuickView';
import { KBInserted, KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { DeleteOutline } from '@mui/icons-material';
import { Box, Chip, Divider, IconButton, List, ListItem, ListItemText, Stack, styled, useTheme } from '@mui/material';
import KnowledgeAutoComplete from '@desk/knowledge-base/containers/KBAutoComplete';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';
interface KBsProps {
  items: KBInserted[];
  onDelete: (item: KBInserted, rowId: string) => void;
  onKnowledgeChange: (nVal: any, rowId: string) => void;
}

const KBs = (props: KBsProps) => {
  const theme = useTheme();
  const { items = [], onDelete, onKnowledgeChange } = props;
  return (
    <>
      <ListWrapper>
        <List sx={{ pt: 0, pb: 0 }}>
          {items.length == 0 && <NoData icon={'Package'} iconType={'feather'} />}
          {items.length > 0 &&
            items.map((item: any, index) => {
              if (item?.isEmptyRow) {
                return (
                  <ListItem
                    key={index}
                    divider
                    sx={{
                      ':hover': {
                        svg: {
                          visibility: 'visible'
                        }
                      }
                    }}
                    secondaryAction={
                      <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                          edge="end"
                          size="small"
                          color="error"
                          onClick={(e: any) => {
                            onDelete(item, item?.rowId);
                          }}
                          sx={{ visibility: 'hidden' }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <KnowledgeAutoComplete
                      visible={false}
                      value={item?.knowledge || undefined}
                      onChange={(nVal: KnowledgeBase | KnowledgeBase[] | null) => {
                        onKnowledgeChange && onKnowledgeChange(nVal, item?.rowId);
                      }}
                      single={true}
                    />
                  </ListItem>
                );
              }

              return (
                <ListItem
                  key={index}
                  divider
                  sx={{
                    ':hover': {
                      svg: {
                        visibility: 'visible'
                      }
                    }
                  }}
                  secondaryAction={
                    <Stack direction="row" spacing={2} alignItems="center">
                      <IconButton
                        edge="end"
                        size="small"
                        color="error"
                        onClick={(e: any) => {
                          onDelete(item, item?.rowId);
                        }}
                        sx={{ visibility: 'hidden' }}
                      >
                        <DeleteOutline fontSize="small" />
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <>
                        <Stack direction="row" alignItems="center">
                          <Stack>
                            <KnowledgeQuickView value={{ id: item.knowledge?.id, name: item.knowledge?.subject }} />
                          </Stack>
                          <Stack sx={{ marginLeft: 'auto' }}>
                            {item.knowledge &&
                              item.knowledge.tags &&
                              item.knowledge.tags.map((tag: any, index: number) => {
                                if (tag) {
                                  return <Chip label={tag.name} key={index} color="primary" variant="light" />;
                                }
                              })}
                          </Stack>
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

export default KBs;
