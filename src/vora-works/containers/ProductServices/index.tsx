import { Button, CardActions, CardHeader, useTheme, Typography, Stack } from '@mui/material';
import { ProductPlans } from '@vora-works/config/constants';
import MainCard from '@base/components/App/MainCard';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { useState } from 'react';
import useDevice from '@base/hooks/useDevice';
import { useNavigate } from 'react-router-dom';
import useConfig from '@base/hooks/useConfig';
import * as keyNames from '@vora-works/config/keyNames';
interface ProductServicesProps {}
function ProductServices(props: ProductServicesProps) {
  const { i18n: userLang } = useConfig();
  const navigate = useNavigate();

  const theme = useTheme();
  const { isMobile } = useDevice();
  //This is product service
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isSelected = (menu: string) => selectedItems.includes(menu);
  const handleSelectProductService = (menu: string) => {
    let newSelectedItems: string[] = [];
    if (!selectedItems.includes(menu)) {
      newSelectedItems = [menu];
    } else {
      newSelectedItems = [];
    }
    setSelectedItems(newSelectedItems);
  };
  const getUrl = () => {
    let voraProduct = selectedItems;

    //If user select order product which is not IAM product, default product + IAM product
    if (!voraProduct.includes(keyNames.VORA_IAM)) {
      // voraProduct.push(keyNames.VORA_IAM);
    }
    ////?products=vora-desk+vora-iam&edition=free&language=en
    const product = selectedItems.join('+');
    const url = `?products=${product}&edition=free&language=${userLang}`;
    return url;
  };
  //========================================================================Debug=========================
  // console.log('Product Service selectedItems', selectedItems, isSelected('desk'));
  // ===============================================================================================
  return (
    <>
      <Typography marginBottom={2} variant="h4" component="div">
        Select Our Products for your Business
      </Typography>
      <Stack direction="column" justifyContent="center" spacing={1}>
        {ProductPlans.map((item) => {
          return (
            <MainCard
              sx={{
                p: 0,
                '& .MuiCardContent-root': {
                  p: '4px 8px',
                  ...(isMobile && {
                    p: '4px 0px'
                  })
                },
                ...(isSelected(item.menu) && {
                  borderColor: theme.palette.primary.main,
                  background: theme.palette.primary.lighter
                })
              }}
              key={item.value}
            >
              <CardHeader
                avatar={<HanAvatar name={item.value} size="sm" />}
                action={
                  <>
                    {!isMobile && (
                      <Button
                        onClick={() => {
                          handleSelectProductService(item.menu);
                        }}
                        size="small"
                        color="primary"
                        variant="outlined"
                        aria-label="settings"
                        sx={{
                          fontWeight: 'medium',
                          '&:hover': {
                            background: theme.palette.primary.dark,
                            color: theme.palette.primary.contrastText
                          }
                        }}
                      >
                        {isSelected(item.menu) ? 'Removed' : 'Select'}
                      </Button>
                    )}
                  </>
                }
                title={<Typography variant="h5"> {item.value}</Typography>}
                subheader={
                  <Typography marginRight={'5px'} variant="body2" color="secondary">
                    {item.label}
                  </Typography>
                }
              />
              {isMobile && (
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    onClick={() => {
                      handleSelectProductService(item.menu);
                    }}
                    size="small"
                    color="primary"
                    variant="outlined"
                    aria-label="settings"
                    sx={{
                      fontWeight: 'medium',
                      '&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.primary.contrastText
                      }
                    }}
                  >
                    {isSelected(item.menu) ? 'Removed' : 'Select'}
                  </Button>
                </CardActions>
              )}
            </MainCard>
          );
        })}
      </Stack>
      <Stack spacing={1} marginTop={2} direction="column" alignItems="flex-end">
        <Button
          sx={{
            '&.Mui-disabled': {
              backgroundColor: theme.palette.primary.main
            }
          }}
          disabled={selectedItems.length == 0}
          onClick={() => {
            navigate(getUrl());
          }}
          size="small"
          color="primary"
          variant="contained"
        >
          Next
        </Button>
        <Typography color="InfoText" fontWeight="bold">
          No Credit Card Required
        </Typography>
      </Stack>
    </>
  );
}
export default ProductServices;
