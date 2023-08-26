import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

//third-party
import _ from 'lodash';

//material
import { AddOutlined, Check, Close, CloseOutlined } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';

//project
import LoadingButton from '@base/components/@extended/LoadingButton';
//import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
//import NoData from '@base/components/@hanbiro/NoData';
import { getCurrentLang } from '@base/services/i18n';
import { useSelectionFields } from '@settings/general/hooks/useSelectionFields';
import { useSelectionCreate, useSelectionDelete, useSelectionUpdate } from '@settings/general/hooks/useSelectionMutations';

//local
import ItemTable from './ItemTable';
import WriteForm from './WriteForm';
import { useTranslation } from 'react-i18next';
import { LabelValue } from '@base/types/app';
import { TABS } from '.';

interface OptionsProps {
  keyRoot: string;
}

const Options = (props: OptionsProps) => {
  const { keyRoot } = props;
  const { t } = useTranslation();

  //state
  const [isShowWrite, setIsShowWrite] = useState(false);

  const [keyItems, setKeyItems] = useState<any>({}); //{keyRoot: []}
  const [debItems, setDebItems] = useState<any>([]);
  const setItemsDebounced = useRef(_.debounce((newItems) => setDebItems(newItems), 1000)).current;
  const [deleteItem, setDeleteItem] = useState<any>(null);
  //write form
  const [formData, setFormData] = useState<any>({ id: '', langNames: [], isDefault: false });
  const [error, setError] = useState({ name: false });
  const initialLoad = useRef<any>(false);
  const userLang = getCurrentLang();

  //hook
  const { data: resultPost, isLoading } = useSelectionFields({ filter: { query: `keyRoot=${keyRoot}` } });
  //console.log('resultPost', resultPost);
  const mUpdate: any = useSelectionUpdate();
  const mUpdateDefault: any = useSelectionUpdate();
  const mCreate: any = useSelectionCreate();
  const mDelete: any = useSelectionDelete();

  //set items
  useEffect(() => {
    if (resultPost?.data) {
      const newKeyItems = { ...keyItems };
      newKeyItems[keyRoot] = resultPost.data;
      setKeyItems(newKeyItems);
    }
  }, [resultPost]);

  //debounced saving for input text
  useEffect(() => {
    if (initialLoad?.current) {
      handleSaveDebounce(debItems);
    } else {
      initialLoad.current = true;
    }
    () => {
      initialLoad.current = false;
    };
  }, [debItems]);

  //create success
  useEffect(() => {
    if (mCreate.isSuccess) {
      //add new item to current items
      const newKeyItems = { ...keyItems };
      const createdItem = { id: mCreate.data.id, ...mCreate.variables.selection };
      createdItem.languageKey = mCreate.variables.selection.languageData[userLang];
      createdItem.isBase = false;
      //reset default
      if (mCreate.variables.selection.isDefault) {
        newKeyItems[keyRoot].map((_ele: any) => (_ele.isDefault = false));
      }
      newKeyItems[keyRoot].unshift(createdItem);
      setKeyItems(newKeyItems);
      //reset form
      setFormData({ langNames: [], isDefault: false });
    }
  }, [mCreate.isSuccess]);

  //set saving option
  useEffect(() => {
    if (mUpdate.isSuccess) {
      if (formData?.id) {
        const newKeyItems = { ...keyItems };
        const fIdx = newKeyItems[keyRoot].findIndex((_ele: any) => _ele.id === formData.id);
        if (fIdx > -1) {
          newKeyItems[keyRoot][fIdx].languageKey = mUpdate.variables.selection.languageData[userLang];
          setKeyItems(newKeyItems);
        }
        //reset
        setFormData({ langNames: [], isDefault: false });
        setIsShowWrite(false);
      }
    }
  }, [mUpdate.isSuccess]);

  //delete success
  useEffect(() => {
    if (mDelete.isSuccess) {
      const newKeyItems = { ...keyItems };
      const fIdx = newKeyItems[keyRoot].findIndex((_ele: any) => _ele.id === deleteItem.id);
      if (fIdx > -1) {
        newKeyItems[keyRoot].splice(fIdx, 1);
        setKeyItems(newKeyItems);
      }
      setDeleteItem(null);
    }
  }, [mDelete.isSuccess]);

  //save item
  const handleSave = (newItems: any) => {
    const newDefaultItem = newItems.find((_ele: any) => _ele.isDefault === true);
    const params: any = {
      id: newDefaultItem.id,
      isDefault: true,
      keyGroup: newDefaultItem.keyGroup
    };
    mUpdateDefault.mutate({ selection: params });
  };
  //debounce function
  const handleSaveDebounce = useCallback(_.debounce(handleSave, 500), [keyItems]);

  //delete an item
  const handleDelete = (item: any) => {
    if (item) {
      setDeleteItem(item);
      const params = {
        id: item.id,
        selectType: 'options_items'
      };
      mDelete.mutate(params);
    }
  };

  //value change
  const handleValueChange = (id: string, keyName: string, keyValue: string) => {
    const newItems = [...keyItems[keyRoot]];
    const itemIdx = newItems.findIndex((_ele: any) => _ele.id === id);
    if (itemIdx > -1) {
      newItems[itemIdx][keyName] = keyValue;
      if (keyName === 'isDefault') {
        //reset other to false
        newItems.map((_item: any, _index: number) => {
          if (itemIdx !== _index) {
            _item.isDefault = false;
          }
        });
      }
      //setItems(newItems);
      setKeyItems((curKeyItems: any) => ({ ...curKeyItems, [keyRoot]: newItems }));
      setItemsDebounced(newItems); //for saving...
    }
  };

  //new form data change
  const handleFormChange = (keyName: string, keyValue: string) => {
    const newFormData = { ...formData };
    newFormData[keyName] = keyValue;
    if (keyName === 'langNames') {
      setError((error) => ({ ...error, name: false }));
    }
    setFormData(newFormData);
  };

  //new/update
  const handleAddUpdate = () => {
    // validate
    if (formData.langNames.length === 0) {
      setError((error) => ({ ...error, name: true }));
      return;
    }

    let languageValue: any = {};
    for (const name of formData.langNames) {
      languageValue[name.id] = name.value;
    }

    const newParams: any = {
      keyGroup: 'options_items',
      keyName: `${keyRoot}_${languageValue['en']}`,
      languageData: languageValue,
      isDefault: formData.isDefault,
      keyRoot: keyRoot
    };
    if (formData.id) {
      newParams.id = formData.id;
      mUpdate.mutate({ selection: newParams });
    } else {
      mCreate.mutate({ selection: newParams });
    }
  };

  //handle edit item to form
  const handleEditItem = (selectedItem: any) => {
    if (!mUpdate.isLoading) {
      const curlangNames: any = [];
      if (selectedItem.languageData) {
        Object.keys(selectedItem.languageData).map((_key: string) => {
          curlangNames.push({ id: _key, value: selectedItem.languageData[_key] });
        });
      }
      setFormData({ id: selectedItem.id, langNames: curlangNames, isDefault: selectedItem.isDefault });
      setIsShowWrite(true);
    }
  };

  //add footer
  const AddButtonRender = useMemo(() => {
    return (
      <Stack sx={{ mt: 1 }} direction={'row'} spacing={1} alignItems="center">
        <Button
          variant={isShowWrite ? 'outlined' : 'contained'}
          size="small"
          color={isShowWrite ? 'secondary' : 'primary'}
          startIcon={isShowWrite ? <CloseOutlined /> : <AddOutlined />}
          onClick={() => {
            setIsShowWrite(!isShowWrite);
            setFormData({ langNames: [], isDefault: false });
          }}
        >
          {isShowWrite ? t('ncrm_common_btn_cancel') : t('Add another line')}
        </Button>
        {isShowWrite && (
          <LoadingButton
            variant="contained"
            color="success"
            loading={mCreate.isLoading || mUpdate.isLoading}
            disabled={mCreate.isLoading || mUpdate.isLoading}
            loadingPosition="start"
            startIcon={<Check fontSize="small" />}
            onClick={handleAddUpdate}
          >
            {t('ncrm_common_btn_save')}
          </LoadingButton>
        )}
      </Stack>
    );
  }, [isShowWrite, formData, mCreate.isLoading, mUpdate.isLoading]);

  return (
    <Box sx={{ pb: 2, maxHeight: 'calc(100vh - 180px)' }} className="scroll-box">
      {/* {isLoading && <LoadingCircular loading={isLoading} />} */}
      <Stack p={2}>
        <Typography fontWeight={'500'}>{t(TABS.find((v: LabelValue) => v.value === keyRoot)?.label || '')}</Typography>
      </Stack>
      <ItemTable
        keyRoot={keyRoot}
        items={keyItems[keyRoot] || []}
        onEdit={handleEditItem}
        onChange={handleValueChange}
        onDelete={handleDelete}
      />
      {isShowWrite && (
        <Box sx={{ mt: 2 }}>
          <WriteForm keyRoot={keyRoot} value={formData} error={error} onChange={handleFormChange} />
        </Box>
      )}
      {AddButtonRender}
    </Box>
  );
};

export default Options;
