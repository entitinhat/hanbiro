import React, { FC, useEffect, useMemo, useState } from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useListSelectionFieldItems } from '@settings/general/hooks/useListSelectionFieldItems';

import { Selection } from '@settings/general/types/selection';
// import { confirmAlert } from '@base/components/confirm-alert';
import useSnackBar from '@base/hooks/useSnackBar';
import { updateLanguageI18n } from '@base/services/i18n';
import { nanoid } from '@base/utils/helpers';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useListSelectionFields } from '@settings/general/hooks/useListSelectionFields';
import {
  Box,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  FormGroup,
  Grid,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import Section from '@settings/preferences/components/Section';
import CardManagement from '@settings/general/components/CardManagement';
import ItemManagement from '@settings/general/components/ItemManagement';
import { useTranslation } from 'react-i18next';
import NoData from '@base/components/@hanbiro/NoData';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import LangInput from '@base/components/@hanbiro/LangInput';
import {
  useSelectionCreate,
  useSelectionDelete,
  useSelectionMove,
  useSelectionUpdate
} from '@settings/general/hooks/useSelectionMutations';
import MainCard from '@base/components/App/MainCard';
import { LANGUAGES } from '@base/config/constant';

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const ManageFieldsPage = (props: any) => {
  // const NAME_ITEM_INIT = [
  //   { id: 'en', value: '' },
  //   { id: 'ko', value: '' },
  //   { id: 'vi', value: '' },
  //   { id: 'jp', value: '' },
  //   { id: 'zh', value: '' },
  //   { id: 'ido', value: '' }
  // ];
  const NAME_ITEM_INIT = LANGUAGES?.map((lang: any) => ({ id: lang.value as string, value: '' }));

  const regexCleanString = new RegExp(/[^\w]/gi);

  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const [categoryChoosed, setCategoryChoosed] = useState<Selection>();
  const [openAddItem, setOpenAddItem] = useState(false);
  const [nameItem, setNameItem] = useState(NAME_ITEM_INIT);
  const [itemChoosed, setItemChoosed] = useState<Selection>({
    id: '',
    keyName: '',
    languageKey: ''
  });
  const [keyName, setKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [items, setItems] = useState<Selection[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);

  //lang
  const { t, i18n } = useTranslation();

  const { data: fieldsResponse, isLoading: isFieldLoading } = useListSelectionFields();
  const { data: fieldItemsResponse, isLoading: isFieldItemLoading, refetch } = useListSelectionFieldItems(keyName);

  const mCreate = useSelectionCreate({
    onSuccess: (res: any) => {
      // update language in local
      let languageValue: any = {};
      for (const name of nameItem) {
        languageValue[name.id] = name.value;
      }
      let keyName = categoryChoosed?.keyName + '_' + languageValue.en.toLowerCase().replace(regexCleanString, '_');
      let languageKey = 'options_items_' + keyName + '__' + res.id.replaceAll('-', '_');
      updateLanguageI18n(languageKey, languageValue);
      // turn off loading
      setLoading(false);
      // turn off Add modal
      setOpenAddItem(false);
      enqueueSuccessBar('Data was added!');
      refetch();
    },
    onError: (res: any) => {
      setLoading(false);
    }
  });

  const mSelectionUpdate = useSelectionUpdate({
    onSuccess: (res: any) => {
      setLoading(false);
      setOpenAddItem(false);
      let languageValue: any = {};
      for (const name of nameItem) {
        languageValue[name.id] = name.value;
      }
      let { languageKey } = itemChoosed;
      updateLanguageI18n(languageKey, languageValue);
      enqueueSuccessBar('Data was updated!');
      refetch();
    },
    onError: (res: any) => {
      setLoading(false);
    }
  });

  const mDelete = useSelectionDelete({
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data has deleted!');
      refetch();
    }
  });

  const mMoveSelection = useSelectionMove({
    onSuccess: (res: any) => {
      setLoading(false);
      enqueueSuccessBar('Data was updated!');
    },
    onError: (res: any) => {
      setLoading(false);
      refetch();
    }
  });

  useEffect(() => {
    setLoading(isFieldLoading);
    if (!isFieldLoading && fieldsResponse) {
      // get frist category
      let category = fieldsResponse.results.length ? fieldsResponse.results[0] : null;
      if (category) {
        setKeyName(category.keyName);
        setCategoryChoosed(category);
      }
    }
  }, [fieldsResponse]);

  useEffect(() => {
    setLoading(isFieldItemLoading);
    if (!isFieldItemLoading && fieldItemsResponse) {
      setItems(fieldItemsResponse.results ?? []);
    }
  }, [fieldItemsResponse]);

  const onDragEnd = (result: any) => {
    // dropped outside the list

    if (!result.destination) {
      return;
    }

    const itemsNew = reorder(fieldItemsResponse?.results, result.source.index, result.destination.index);
    const ids = itemsNew.map((item) => item.id);
    // setItems(itemsNew);
    setLoading(true);

    mMoveSelection.mutate({ ids: ids });
    setItems(itemsNew);
  };

  const closeAddItem = () => {
    setIsValid(true);
    setOpenAddItem(false);
  };

  const onSaveItem = () => {
    if (!categoryChoosed) {
      return;
    }
    for (const item of items) {
      if (nameItem[0].value == item.language?.en) {
        setIsValid(false);
        return;
      }
    }
    // if (nameItem in items.langue) {
    //   console.log('already existed');
    //   return;
    // }
    setLoading(true);
    let languageValue: any = {};
    for (const name of nameItem) {
      if (name.value) languageValue[name.id] = name.value;
      else languageValue[name.id] = nameItem[0].value;
    }
    if (itemChoosed.id) {
      let params = {
        id: itemChoosed.id,
        parentId: categoryChoosed.id,
        languageKey: itemChoosed.languageKey,
        languageData: languageValue,
        keyGroup: 'options_items'
      };
      // update selection item
      console.log('update params:', params);
      mSelectionUpdate.mutate({ selection: params });
    } else {
      let keyName = languageValue.en;
      keyName = categoryChoosed.keyName + '_' + keyName.toLowerCase().replace(regexCleanString, '_');
      // create new selection
      let input = {
        parentId: categoryChoosed.id,
        languageData: languageValue,
        keyRoot: categoryChoosed.keyName,
        keyName: keyName,
        keyGroup: 'options_items'
      };
      mCreate.mutate({ selection: input });
    }
  };

  const onDeleteItem = (item: Selection) => {
    // delete item
    let nItems = items.filter((sel) => {
      return item.id != sel.id;
    });
    mDelete.mutate({ id: item.id, selectType: 'options_items' });
    setItems(nItems);
  };

  const onStartAddItem = ({ item = { id: '', label: '' }, index }: any) => {
    setNameItem(NAME_ITEM_INIT);
    setItemChoosed(item);
    setOpenAddItem(true);
  };

  const onStartEditItem = ({ item, index }: any) => {
    if (!item) {
      return;
    }
    setNameItem(
      NAME_ITEM_INIT.map((itemName) => {
        return {
          ...itemName,
          value: item.language && item.language[itemName.id] ? item.language[itemName.id] : ''
        };
      })
    );
    setItemChoosed(item);
    setOpenAddItem(true);
  };

  const onChangeCategory = (category: Selection) => {
    // console.log(category);
    setLoading(true);
    // load Field item
    setCategoryChoosed(category);
    setKeyName(category.keyName);
  };
  const handleAlertClickOpen = () => {
    setIsOpenAlert(true);
  };

  const handleAlertClose = () => {
    setIsOpenAlert(false);
  };
  const handleDelete = (item: Selection) => {
    setItemChoosed(item);
    handleAlertClickOpen;
  };
  //============RENDER_FORM======
  const theme = useTheme();

  const footer = useMemo(() => {
    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Box sx={{ marginLeft: 'auto' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={() => closeAddItem()}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button
              // disabled={mutationAdd.isLoading || mUpload.isLoading || !isValid}
              color="primary"
              variant="contained"
              onClick={onSaveItem}
              size="small"
            >
              {t('ncrm_common_btn_save')}
            </Button>
          </Stack>
        </Box>
      </FormGroup>
    );
  }, [nameItem]);

  const renderFields = () => {
    return (
      <Grid className="scroll-box" sx={{ p: 0, height: 'calc(100vh - 165px)', width: 600 }}>
        <LangInput
          uid={'name_category'} //DOM unique key in one page
          disabled={false}
          value={nameItem} //ex: [{id, value}]
          onChange={(data) => {
            setNameItem(data);
            setIsValid(true);
          }}
        />
        {!isValid && (
          <Typography sx={{ mt: '10px' }} color="error">
            {t('ncrm_generalsetting_item_already_existed')}
          </Typography>
        )}
      </Grid>
    );
  };
  //============DEBUG============
  console.log('items:', items);
  console.log('fieldItemsResponse', fieldItemsResponse);
  console.log('isOpenAlert', isOpenAlert);
  console.log('nameItem', nameItem);
  console.log('categoryChoosed:', categoryChoosed);
  return (
    <Grid container sx={{ width: '100%', height: 'calc(100vh - 200px)' }} direction="row">
      <Grid item xs={5} sx={{ pr: 2 }}>
        <CardManagement title={t('ncrm_generalsetting_general_categories')} isAdd={false}>
          <Box>
            {isFieldLoading || isFieldItemLoading ? <LoadingCircular loading={isFieldLoading || isFieldItemLoading} /> : ''}
            {!isFieldLoading &&
              fieldsResponse?.results?.map((category: Selection) => (
                <ItemManagement
                  key={category.id}
                  isLoading={false}
                  isActive={categoryChoosed && category.id == categoryChoosed.id}
                  label={t(category.languageKey)}
                  onClick={() => onChangeCategory(category)}
                  icon="Folder"
                  iconType="feather"
                />
              ))}
          </Box>
        </CardManagement>
      </Grid>
      <Grid item xs={7}>
        <CardManagement
          title={t('ncrm_generalsetting_general_items')}
          labelBtn="ncrm_generalsetting_general_add_item"
          isAdd={categoryChoosed && categoryChoosed.isBase ? false : true}
          disabled={loading}
          onAdd={() => onStartAddItem({ item: { id: '', label: '' } })}
        >
          <Box>
            {isFieldLoading || isFieldItemLoading ? <LoadingCircular loading={isFieldLoading || isFieldItemLoading} /> : ''}

            <Box className="content-items">
              {!isFieldItemLoading && items?.length == 0 ? (
                <Box sx={{ py: 'auto', height: 'calc(100vh - 240px)', display: 'flex', justifyContent: 'center' }}>
                  <NoData />
                </Box>
              ) : (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={`droppable-${nanoid()}`}>
                    {(provided, snapshot) => (
                      <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {items.map((item: Selection, index) => (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <Box ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <ItemManagement
                                  background={true}
                                  isLoading={isFieldItemLoading}
                                  label={t(item.languageKey)}
                                  icon={'Move'}
                                  iconType={'feather'}
                                  isDelete={item.isBase ? false : true}
                                  isEdit={item.isBase ? false : true}
                                  onDelete={() => {
                                    setIsOpenAlert(true);
                                    handleDelete(item);
                                  }}
                                  onEdit={() =>
                                    onStartEditItem({
                                      item: item,
                                      index: index
                                    })
                                  }
                                />
                              </Box>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </Box>
                    )}
                  </Droppable>
                </DragDropContext>
              )}
            </Box>
          </Box>
        </CardManagement>
      </Grid>
      <Dialog open={isOpenAlert} onClose={handleAlertClose}>
        <DialogTitle>{t('ncrm_common_btn_delete')}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <SpanLang keyLang="ncrm_common_delete_msg" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" variant="outlined" color="secondary" onClick={handleAlertClose}>
            {t('ncrm_common_btn_cancel')}
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleAlertClose();
              onDeleteItem(itemChoosed);
            }}
          >
            {t('ncrm_common_btn_yes')}
          </Button>
        </DialogActions>
      </Dialog>
      <Drawer anchor="right" open={openAddItem} sx={{ zIndex: theme.zIndex.modal }} onClose={() => closeAddItem()}>
        {/* fix to render header label edit or add */}
        <MainCard
          title={t(itemChoosed.id ? 'ncrm_generalsetting_general_edit_item' : 'ncrm_generalsetting_general_add_item')}
          content={false}
        >
          <CardContent>{renderFields()}</CardContent>
          <Divider />
          {footer}
        </MainCard>
      </Drawer>
    </Grid>
  );
};
export default ManageFieldsPage;
