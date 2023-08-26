import { FC, useEffect, useMemo, useState } from 'react';

import { Selection } from '@settings/general/types/selection';

import { getCurrentLang, updateLanguageI18n } from '@base/services/i18n';
import { useTranslation } from 'react-i18next';
import { BaseMutationResponse } from '@base/types/response';
import CardManagement from '@settings/general/components/CardManagement';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import ItemManagement from '@settings/general/components/ItemManagement';
import {
  Box,
  Button,
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
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import NoData from '@base/components/@hanbiro/NoData';
import LangInput from '@base/components/@hanbiro/LangInput';
import { useListSelectionGroups } from '@settings/general/hooks/useListSelectionGroups';
import { useListSelectionGroupItems } from '@settings/general/hooks/useListSelectionGroupItems';
import { LanguageData } from '@base/types/common';
import TreeFolder from '../TreeFolder';
import useSnackBar from '@base/hooks/useSnackBar';
import { useSelectionCreate, useSelectionDelete, useSelectionUpdate } from '@settings/general/hooks/useSelectionMutations';
// let loadDataCallback: any = {};
const ManageGroupFieldsPage: FC<any> = (props: any) => {
  const NAME_ITEM_INIT = [
    { id: 'en', value: '' },
    { id: 'ko', value: '' },
    { id: 'vi', value: '' },
    { id: 'jp', value: '' },
    { id: 'zh', value: '' },
    { id: 'ido', value: '' }
  ];
  const regexCleanString = new RegExp(/[^\w]/gi);
  //lang
  const { t, i18n } = useTranslation();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const [categoryChoosed, setCategoryChoosed] = useState<Selection>();
  const [openAddItem, setOpenAddItem] = useState(false);
  const [nameItem, setNameItem] = useState(NAME_ITEM_INIT);
  const [itemChoosed, setItemChoosed] = useState<Selection>({
    id: '',
    keyName: '',
    languageKey: ''
  });
  const [itemParentChoosed, setItemParentChoosed] = useState<Selection>({
    id: '',
    keyName: '',
    languageKey: ''
  });
  const userLang = getCurrentLang();
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
  const [parentId, setParentId] = useState('');
  const [groupId, setGroupId] = useState('');
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState({ time: 0, data: {} });
  const [groups, setGroups] = useState<Selection[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);

  const { data: fieldsResponse, isLoading: isFieldLoading } = useListSelectionGroups();
  const { data: fieldItemsResponse, isFetching: isFieldItemLoading, refetch } = useListSelectionGroupItems(parentId);
  const { data: subItemsResponse, isLoading: isSubItemLoading, refetch: reloadSubItem } = useListSelectionGroupItems(groupId);

  console.log('fieldRespone:', fieldsResponse);
  // console.log('render component', itemChoosed);
  const handleReloadSubGroups = (reloadGId: string) => {
    if (reloadGId != groupId) {
      setGroupId(reloadGId);
    } else {
      reloadSubItem();
    }
  };
  const deleteSection = (id: string, groups: Selection[]) => {
    let nGroups = groups;
    if (groups.length) {
      nGroups = [];
      groups.map((g) => {
        if (g.id != id) {
          let nG = {
            ...g,
            children: deleteSection(id, g.children ?? [])
          };
          nGroups.push(nG);
        }
      });
    }
    return nGroups;
  };
  const reloadGroupChildren = (id: string, subItems: Selection[]) => {
    // console.log('reloadGroupChildren', id, parentId);
    if (id === parentId) {
      refetch();
      return;
    }
    let newGroups = updateGroupData(id, { children: subItems, expand: true, isLoaded: true }, groups);
    refetch();
    setGroups(newGroups);
  };
  const mCreate = useSelectionCreate({
    onSuccess: (res: any) => {
      // update language in local
      let languageValue: any = {};
      for (const name of nameItem) {
        languageValue[name.id] = name.value;
      }
      let { keyName } = itemParentChoosed;
      keyName += '_' + languageValue.en.toLowerCase().replace(regexCleanString, '_');
      let languageKey = 'options_groups_' + keyName + '__' + res.id.replaceAll('-', '_');
      updateLanguageI18n(languageKey, languageValue);
      // turn off loading
      setLoading(false);
      // turn off Add modal
      setOpenAddItem(false);
      // reloadGroupChildren(itemParentChoosed.id);
      enqueueSuccessBar('Data was added!');
      handleReloadSubGroups(itemParentChoosed.id);
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
      // console.log('itemChoosed', itemChoosed);
      updateLanguageI18n(languageKey, languageValue);
      // reload group parent
      handleReloadSubGroups(itemChoosed?.parentId ?? '');
      enqueueSuccessBar('Data was updated!');
    },
    onError: (res: any) => {
      setLoading(false);
    }
  });
  const mDelete = useSelectionDelete({
    onSuccess: (res: any) => {
      // console.log('delete item', itemChoosed);
      setLoading(false);
      if (itemChoosed?.parentId) {
        handleReloadSubGroups(itemChoosed?.parentId);
      }

      enqueueSuccessBar('Data has deleted!');
    },
    onError: (res: any) => {
      setLoading(false);
    }
  });

  useEffect(() => {
    setLoading(isFieldLoading);
    if (!isFieldLoading && fieldsResponse?.results) {
      // get frist category
      let category = fieldsResponse.results.length ? fieldsResponse.results[0] : null;
      if (category) {
        setParentId(category.id);
        setCategoryChoosed(category);
      }
    }
  }, [fieldsResponse]);

  useEffect(() => {
    setLoading(isFieldItemLoading);
    if (!isFieldItemLoading && fieldItemsResponse?.results) {
      setGroups(fieldItemsResponse.results);
    }
  }, [fieldItemsResponse]);
  useEffect(() => {
    if (expand.time) {
      onExpandHandle(expand.data);
    }
  }, [expand.time]);

  useEffect(() => {
    if (!isSubItemLoading && subItemsResponse) {
      reloadGroupChildren(groupId, subItemsResponse.results ?? []);
    }
  }, [subItemsResponse]);
  const closeAddItem = () => {
    setIsValid(true);
    setOpenAddItem(false);
  };

  const onSaveItem = () => {
    if (!categoryChoosed) {
      return;
    }
    for (const item of groups) {
      if (nameItem[0].value == item.language?.en) {
        setIsValid(false);
        return;
      }
    }
    setLoading(true);
    let languageValue: any = {};
    for (const name of nameItem) {
      if (name.value) languageValue[name.id] = name.value;
      else languageValue[name.id] = nameItem[0].value;
    }
    if (itemChoosed.id) {
      // edit category
      let input = {
        id: itemChoosed.id,
        parentId: itemChoosed.parentId,
        languageKey: itemChoosed.languageKey,
        languageData: languageValue,
        keyGroup: 'options_groups'
      };
      // update selection item
      mSelectionUpdate.mutate({ selection: input });
    } else {
      // add
      let keyName = languageValue.en;
      keyName = keyName.toLowerCase().replace(regexCleanString, '_');
      // create new selection
      let selection = {
        parentId: itemParentChoosed.id,
        languageData: languageValue,
        keyRoot: categoryChoosed.keyName,
        keyName: keyName,
        keyGroup: 'options_groups'
      };
      console.log('form data:', selection);
      mCreate.mutate({ selection: selection });
    }
  };
  const handleAlertClose = () => {
    setIsOpenAlert(false);
  };
  const onDeleteItem = ({ item, index }: any) => {
    // delete item
    setLoading(true);
    // console.log('itemChoosed', item);
    mDelete.mutate({ id: item.id, selectType: 'options_groups' });
    let nGroups = deleteSection(item.id, groups);
    setGroups(nGroups);
  };

  const onStartAddItem = ({
    item = { id: '', keyName: '', languageKey: '' },
    loadData = () => {},
    setLoading = () => {},
    setIsExpand = () => {}
  }) => {
    setNameItem(NAME_ITEM_INIT);
    setItemChoosed({ id: '', keyName: '', languageKey: '' });
    setItemParentChoosed(item);
    setOpenAddItem(true);
  };

  const onStartEditItem = ({ item, index }: any) => {
    setItemParentChoosed({ id: '', keyName: '', languageKey: '' });
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
    setParentId(category.id);
  };

  const onExpand = (data: any) => {
    //// console.log("data", data);
    setExpand({
      time: new Date().getTime(),
      data: data
    });
  };

  const updateExpandInGroups = ({ expand = false, item = {} }: any) => {
    return updateGroupData(item.id, { expand }, groups);
  };
  const updateGroupData = (id: string, newData: any, parentGroups: Selection[]) => {
    let newGroups = parentGroups;
    if (newGroups.length > 0) {
      newGroups = parentGroups.map((group) => {
        let newGroup = group;
        if (newGroup.id == id) {
          // console.log('found', id, newData);
          newGroup = {
            ...newGroup,
            ...newData
          };
          return newGroup;
        }
        if (newGroup.children && newGroup.children.length > 0) {
          newGroup.children = updateGroupData(id, newData, newGroup.children);
        }
        return newGroup;
      });
    }
    return newGroups;
  };

  const onExpandHandle = (params: any) => {
    const { item, isExpand, setLoading = (input: boolean) => {} } = params;
    // console.log('onExpandHandle', params);
    const itemParentChoosed = item;
    if (isExpand) {
      if (itemParentChoosed.isLoaded) {
        let nGroups = updateExpandInGroups({
          expand: isExpand,
          item: itemParentChoosed
        });
        setGroups(nGroups);
        return;
      }
      setLoading(true);
      handleReloadSubGroups(itemParentChoosed.id);
    } else {
      let nGroups = updateExpandInGroups({ expand: isExpand, item: itemParentChoosed });
      setGroups(nGroups);
    }
  };

  const handleDelete = (item: Selection) => {
    setItemChoosed(item);
    setIsOpenAlert(true);
    console.log('isOpenAlert', isOpenAlert);
  };
  //=========RENDER FORM=====
  console.log('groups:', groups);
  const theme = useTheme();
  const header = useMemo(() => {
    return (
      <>
        <Box sx={{ p: 1, height: '48px' }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ px: 1 }}>
            <Grid item>
              <SpanLang
                sx={{ color: theme.palette.text.primary, fontSize: '18px', fontWeight: '700' }}
                keyLang={itemChoosed.id ? 'ncrm_generalsetting_general_edit_group' : 'ncrm_generalsetting_general_add_group'}
              />
            </Grid>
          </Grid>
        </Box>
        <Divider />
      </>
    );
  }, [itemChoosed]); // fix to render header label edit or add
  const footer = useMemo(() => {
    return (
      <FormGroup sx={{ display: 'flex', padding: '10px 15px' }}>
        <Divider />
        <Box sx={{ marginLeft: 'auto', mt: '20px' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" variant="outlined" color="secondary" onClick={() => closeAddItem()}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <Button
              size="small"
              // disabled={mutationAdd.isLoading || mUpload.isLoading || !isValid}
              color="primary"
              variant="contained"
              onClick={onSaveItem}
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
      <Grid className="scroll-box" sx={{ height: 'calc(100vh - 140px)', p: 2 }}>
        {itemParentChoosed.id ? (
          <Grid sx={{ pr: 2, mb: 1 }}>
            <Typography sx={{ padding: '10px' }}>
              <SpanLang keyLang="crm_generalsetting_general_parent_group" />
            </Typography>
            <TextField
              fullWidth
              value={
                itemParentChoosed.language && itemParentChoosed.language[userLang as keyof LanguageData]
                  ? itemParentChoosed.language[userLang as keyof LanguageData]
                  : ''
              }
              placeholder={t('ncrm_generalsetting_general_parent_group_name') ?? 'Parent Group Name'}
              disabled
            />
          </Grid>
        ) : (
          ''
        )}
        <Typography sx={{ padding: '10px' }}>
          <SpanLang keyLang="crm_generalsetting_general_group_name" />
        </Typography>
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

  return (
    <Grid container sx={{ width: '100%', height: '100vh' }}>
      <Grid item xs={5} sx={{ pr: 2 }}>
        <CardManagement title={t('ncrm_generalsetting_general_categories')} isAdd={false}>
          <div className="content-categories" style={{ paddingTop: 0 }}>
            <nav className="nav nav-sidebar tx-13">
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
            </nav>
          </div>
        </CardManagement>
      </Grid>
      <Grid item xs={7}>
        <CardManagement
          title={t('ncrm_generalsetting_general_groups')}
          labelBtn="ncrm_generalsetting_general_add_group"
          isAdd={categoryChoosed?.isBase ? false : true}
          disabled={loading}
          onAdd={() => onStartAddItem({ item: categoryChoosed })}
        >
          <div className="content-items">
            {!isFieldItemLoading && (!fieldItemsResponse?.results || fieldItemsResponse?.results?.length == 0) ? (
              <Grid sx={{ py: 'auto', height: 'calc(100vh - 240px)', display: 'flex', justifyContent: 'center' }}>
                <NoData />
              </Grid>
            ) : (
              <TreeFolder
                groups={groups}
                onStartEditItem={onStartEditItem}
                onDeleteItem={handleDelete}
                onStartAddItem={onStartAddItem}
                onExpand={onExpand}
              />
            )}
          </div>
          <Drawer anchor="right" open={openAddItem} sx={{ zIndex: theme.zIndex.modal }} onClose={() => closeAddItem()}>
            <Stack sx={{ width: '500px' }} direction="column" divider={<Divider />}>
              <>
                {header}
                {renderFields()}
                {footer}
              </>
            </Stack>
          </Drawer>
        </CardManagement>
      </Grid>
      <Dialog open={isOpenAlert} onClose={handleAlertClose}>
        <DialogTitle id="alert-dialog-title">{t('ncrm_common_delete')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <SpanLang keyLang="ncrm_common_delete_msg" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" color="secondary" variant="outlined" onClick={handleAlertClose}>
            {t('ncrm_common_btn_no')}
          </Button>
          <Button
            size="small"
            onClick={() => {
              handleAlertClose();
              onDeleteItem(itemChoosed);
            }}
          >
            {t('ncrm_common_btn_yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};
export default ManageGroupFieldsPage;
