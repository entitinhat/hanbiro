import { useEffect, useState } from 'react';

//third-party
import { StarOutlineRounded } from '@mui/icons-material';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';

//project
import { DropdownProps } from '@base/components/@hanbiro/Dropdown';
import ListToolbar from '@base/components/@hanbiro/List/ListToolbar';
import { MENU_SETTING } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { WriteOption } from '@base/types/common';

//menu
import WritePage from '@settings/digital/cta/pages/WritePage';
import { SETTING_CTA_TOOLBAR_MORE_OPTIONS } from '../../config/constants';
import useUpdateUserSettings from '../../hooks/useFavoriteListMutation';
import useSettingUserSettings from '../../hooks/useSettingUserSettings';
import { useNavigate } from 'react-router-dom';
import { t } from 'i18next';

interface ToolbarProps {
  isSplitMode?: boolean;
  category?: string;
  onRefresh?: () => void;
  onDelete?: () => void;
  moreMenuProps?: DropdownProps;
}

const CtaPageToolbar = (props: ToolbarProps) => {
  const { isSplitMode, category, onRefresh, onDelete, moreMenuProps } = props;
  const navigate = useNavigate();
  //state
  const [writeOption, setWriteOption] = useState<WriteOption>({ writeType: 'cta', isOpenWrite: false });
  const [favoriteList, setFavoriteList] = useState<any>([]);

  const pageDataKey = `${MENU_SETTING}_${category}`;
  const { listType, setListType } = useListPageSettings(pageDataKey);

  const handelChangeListType = (nType: ListType) => {
    setListType(nType);
  };

  // update favorites list
  const mUpdate: any = useUpdateUserSettings();

  // get favorite  list
  const { data, isLoading } = useSettingUserSettings();

  useEffect(() => {
    if (data?.results && !isLoading && data?.results.length > 0) {
      const favoriteData = data.results.find((item: any) => item.menu === 'common' && item.key === 'menu_favorites');
      if (favoriteData) {
        const listData = JSON.parse(favoriteData.value ?? '{}');
        setFavoriteList(listData);
      }
    }
  }, [data]);

  const handleOnFavourite = () => {
    const addItem: any = {
      menuKey: 'cta',
      menuTitle: 'Call To Action',
      menuPath: `/setting_cta/cta`
    };
    const newFavorites: any[] = favoriteList.filter((_item: any) => {
      if (_item.menuKey != addItem.menuKey) {
        return _item;
      }
    });
    if (newFavorites?.length === favoriteList?.length) {
      newFavorites.push(addItem);
    }

    setFavoriteList(newFavorites);
    const params = {
      menu: 'common',
      key: 'menu_favorites',
      value: JSON.stringify(newFavorites)
    };
    mUpdate.mutate({ userSetting: params });
  };

  const CheckFavorited = () => {
    if (favoriteList.length === 0) return false;
    const index = favoriteList.findIndex((_item: any) => _item.menuKey === 'cta');
    if (index > -1) {
      return true;
    } else return false;
  };

  return (
    <>
      {/* <Stack direction="row" justifyContent="space-between" alignItems="center"> */}
      {/* <Stack direction="row" alignItems="center">
          <Typography sx={{ fontSize: '16px', lineHeight: 1, pl: 2, pr: 1 }}>CALL TO ACTION</Typography>
          <Tooltip title="Add Favorite">
            <IconButton
              color="secondary"
              size="small"
              onClick={() => handleOnFavourite()}
              sx={{
                '&:hover': {
                  bgcolor: 'transparent',
                  color: '#faad14'
                }
              }}
            >
              <StarOutlineRounded fontSize="small" sx={{ color: `${CheckFavorited() && '#faad14'}` }} />
            </IconButton>
          </Tooltip>
        </Stack> */}

      <ListToolbar
        // menu={MENU_SETTING}
        menu={category}
        isSmall={isSplitMode}
        onRefresh={onRefresh}
        onDelete={onDelete}
        categoryMenuProps={{
          items: [
            {
              value: 'cta',
              label: t('ncrm_generalsetting_cta_menu_name'),
              path: '/settings/digital/cta'
            }
          ],
          selected: category,
          onClick: (category: string) => {
            navigate(`/settings/digital/cta`);
          }
        }}
        addingMenuProps={{
          label: t('ncrm_common_btn_new') as string,
          onClick: (addKey: string) => {
            setWriteOption({
              ...writeOption,
              isOpenWrite: true
            });
          }
        }}
        listTypeMenuProps={{
          allowTypes: [ListType.GRID, ListType.LIST, ListType.SPLIT],
          selectedType: listType ?? ListType.LIST,
          onChange: (type: ListType) => {
            handelChangeListType(type);
          }
        }}
        moreMenuProps={{
          items: SETTING_CTA_TOOLBAR_MORE_OPTIONS
          // onChange: (key: LabelValueIcon) => handleMoreChange(key.value)
        }}
      />
      {/* </Stack> */}

      <WritePage
        isOpen={writeOption.isOpenWrite}
        onClose={() => setWriteOption({ ...writeOption, isOpenWrite: false })}
        menuApi={writeOption.writeType !== '' ? pageDataKey : ''}
        onReload={onRefresh}
      />
    </>
  );
};

export default CtaPageToolbar;
