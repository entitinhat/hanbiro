import { DeleteTwoTone } from '@ant-design/icons';
import NoData from '@base/components/@hanbiro/NoData';
import { ProductQuickView } from '@base/containers/QuickView/Product';
import { IdName } from '@base/types/common';
import { IconButton, List, ListItem, ListItemText, Stack, styled, Tooltip, useTheme } from '@mui/material';

const ListWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper
}));
ListWrapper.displayName = 'ListWrapper';

interface ProductsProps {
  items: IdName[];
  onDelete: (item: IdName) => void;
}

const Products = (props: ProductsProps) => {
  const theme = useTheme();
  const { items = [], onDelete } = props;
  return (
    <>
      <ListWrapper>
        <List>
          {items.length == 0 && <NoData />}
          {items.length > 0 &&
            items.map((item: IdName, index) => {
              if (item) {
                return (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Tooltip title="Delete">
                          <IconButton
                            edge="end"
                            size="medium"
                            color="error"
                            onClick={(e: any) => {
                              onDelete(item);
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
                          <ProductQuickView value={{ id: item?.id, name: item?.name }} />
                        </>
                      }
                    />
                  </ListItem>
                );
              } else {
                return null;
              }
            })}
        </List>
      </ListWrapper>
    </>
  );
};

export default Products;
