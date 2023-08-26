import React, { useEffect, useState } from 'react';
//project
import useDevice from '@base/hooks/useDevice';
import Section from '@settings/preferences/components/Section';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useMenuSetting, useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';
import WritePage from '../../pages/Lead/General/WriteForm';
import useSnackBar from '@base/hooks/useSnackBar';
import { CollectionMethodSetting, LeadSettingValue } from '@settings/preferences/types/lead/lead';
import { generateUUID } from '@base/utils/helpers';
//material-ui
import { Add, DeleteOutlineTwoTone } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemText, useTheme, Grid, Button, Stack, TextField, Box } from '@mui/material';
//third-party
import { useTranslation } from 'react-i18next';

interface LeadSectionProps {
  settingKey: string;
  menu: string;
  title: string;
}

const LeadSection = (props: LeadSectionProps) => {
  const { menu, settingKey, title } = props;
  const { t } = useTranslation();
  const theme = useTheme();
  const { enqueueSuccessBar } = useSnackBar();

  const { isMobile } = useDevice();

  const [data, setData] = useState<LeadSettingValue[] | CollectionMethodSetting[]>([]);
  const [writeType, setWriteType] = useState<string>('');
  const [isAddChildren, setIsAddChildren] = useState<number>(-1);
  const [addValue, setAddValue] = useState<string>('');
  //get data

  const { data: postData, refetch } = useMenuSetting({ key: settingKey, menu: menu });
  const mSettingUpdate = useMenuSettingUpdate();

  useEffect(() => {
    if (postData?.value) setData(JSON.parse(postData.value));
  }, [postData]);
  const onAdd = () => {
    setWriteType(settingKey);
  };

  const handleSave = () => {
    setWriteType('');
    refetch();
  };
  const handleDeleteItem = (index: number, parentIdx: number | null = null) => {
    const nVal: any = [...data];
    if(parentIdx){
      nVal?.[parentIdx]?.children.splice(index, 1)
    } else {
      nVal.splice(index, 1);
    }

    const params: any = {
      menu: menu,
      key: settingKey,
      value: JSON.stringify([...nVal])
    };

    mSettingUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Delete item successfully!');
        }
      }
    );
    setData(nVal);
    setIsAddChildren(-1);
    setAddValue('');
  };
  const handleSaveChildren = (index: number) => {
    let nVal = [...data] as CollectionMethodSetting[];
    nVal[index].children!.push({ id: generateUUID(), name: addValue });
    const params: any = {
      menu: menu,
      key: settingKey,
      value: JSON.stringify([...nVal])
    };
    mSettingUpdate.mutate(
      { menuSetting: params },
      {
        onSuccess: (res: any) => {
          enqueueSuccessBar('Add item successfully!');
        }
      }
    );
    setData(nVal);
    setIsAddChildren(-1);
    setAddValue('');
  };

  return (
    <>
      <Grid item xs={12}>
        <Section header={t(title)} isAdd onAdd={onAdd}>
          <List sx={{ p: 0 }}>
            {data?.map((item: any, index: number) => (
              <React.Fragment key={index}>
                <ListItem
                  sx={{
                    ':hover': {
                      svg: {
                        visibility: 'visible'
                      }
                    }
                  }}
                  divider
                  secondaryAction={
                    <IconButton
                      size="small"
                      edge="end"
                      aria-label="delete"
                      color="error"
                      sx={{
                        visibility: isMobile ? 'visible' : 'hidden'
                      }}
                      onClick={() => {
                        handleDeleteItem(index);
                      }}
                    >
                      <DeleteOutlineTwoTone fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText primary={item?.name} />
                </ListItem>
                {item?.children && (
                  <List sx={{ p: 0 }}>
                    {item?.children?.map((child: any, iChild: number) => {
                      return (
                        <ListItem 
                          key={`${index}-${iChild}`}
                          sx={{
                            ':hover': {
                              svg: {
                                visibility: 'visible'
                              }
                            }
                          }}
                          divider
                          secondaryAction={
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="delete"
                              color="error"
                              sx={{
                                visibility: isMobile ? 'visible' : 'hidden'
                              }}
                              onClick={() => {
                                handleDeleteItem(iChild, index);
                              }}
                            >
                              <DeleteOutlineTwoTone fontSize="small" />
                            </IconButton>
                          }
                        >
                          <ListItemText sx={{ ml: 2 }} primary={''} secondary={child?.name} />
                        </ListItem>
                      );
                    })}
                    <ListItem key={`new-line-${index}`} divider>
                      {isAddChildren === index ? (
                        <Stack direction="row" sx={{ width: '100%' }} spacing={1}>
                          <TextField
                            fullWidth
                            value={addValue}
                            onChange={(e) => {
                              setAddValue(e.target.value);
                            }}
                          />
                          <Stack direction="row" spacing={1} sx={{ height: '50%' }} alignItems="center">
                            <Button
                              size="small"
                              variant="outlined"
                              color="secondary"
                              onClick={() => {
                                setIsAddChildren(-1);
                                setAddValue('');
                              }}
                            >
                              {t('ncrm_common_btn_cancel')}
                            </Button>
                            <Button
                              // disabled={mutationAdd.isLoading || mUpload.isLoading || !isValid}
                              color="primary"
                              variant="contained"
                              onClick={() => {
                                handleSaveChildren(index);
                              }}
                              size="small"
                            >
                              {t('ncrm_common_btn_save')}
                            </Button>
                          </Stack>
                        </Stack>
                      ) : (
                        <Button
                          size="small"
                          fullWidth
                          startIcon={<Add />}
                          sx={{ justifyContent: 'start' }}
                          onClick={() => {
                            setIsAddChildren(index);
                          }}
                        >
                          <SpanLang keyLang={'ncrm_common_add_new_line'} textOnly />
                        </Button>
                      )}
                    </ListItem>
                  </List>
                )}
              </React.Fragment>
            ))}
          </List>
        </Section>
      </Grid>

      {writeType && (
        <WritePage
          value={data}
          isOpen={writeType !== ''}
          onClose={() => {
            handleSave();
          }}
          settingKey={settingKey}
          header={title}
        />
      )}
    </>
  );
};

export default LeadSection;
