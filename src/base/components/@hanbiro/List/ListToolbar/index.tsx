import React from 'react';

import IconButton from '@base/components/@extended/IconButton';
import Dropdown, { DropdownProps } from '@base/components/@hanbiro/Dropdown';
// import MoreMenu, {MoreMenuProps} from "./MoreMenu";
import { ListType } from '@base/types/app';
import { Close, CreditCardOutlined, DeleteOutline, MoreHoriz, Sync } from '@mui/icons-material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';

import AddingMenu, { AddingMenuProps } from './AddingMenu';
import CategoryMenu, { CategoryMenuProps } from './CategoryMenu';
import ListTypeMenu, { ListTypeMenuProps } from './ListTypeMenu';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';

interface ListToolbarProps {
  menu?: string;
  onRefresh?: () => void;
  onDelete?: () => void;
  categoryMenuProps?: CategoryMenuProps;
  addingMenuProps?: AddingMenuProps;
  listTypeMenuProps?: ListTypeMenuProps;
  moreMenuProps?: DropdownProps;
  isSmall?: boolean;
  moreAction?: any;
  setIsSplitMode?: (isSplitMode: boolean) => void;
  categoryOptions?: any;
  categorySelected?: string;
  onCategoryChange?: (category: string) => void;
  addOptionType?: string; // category , tab
  addOptions?: any;
  onAdd?: (category?: any) => void;
  canAdd?: boolean;
  useNewFilter?: boolean;
  hideHeaderTitle?: boolean;
  favoriteList?: any | [];
  onChangeWishList?: (title: string, selected: any) => any;
}

const ListToolbar = (props: ListToolbarProps) => {
  const {
    menu,
    onRefresh,
    onDelete,
    categoryMenuProps,
    addingMenuProps,
    listTypeMenuProps,
    moreMenuProps,
    isSmall = false,
    moreAction
  } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        minHeight: 60,
        px: 2,
        justifyContent: 'space-between',
        bgcolor: isSmall || isMobile ? theme.palette.background.default : theme.palette.background.paper
      }}
    >
      {categoryMenuProps && <CategoryMenu menu={menu} isSmall={isSmall || isMobile} {...categoryMenuProps} />}
      <Stack direction="row" alignItems="center" spacing={1}>
        {/* write btn */}
        {addingMenuProps && (
          <AddingMenu
            // iconOnly={isMobile || isSmall}
            {...addingMenuProps}
            value={menu}
          />
        )}
        {/* list type */}
        {listTypeMenuProps && !isSmall && !isMobile && <ListTypeMenu {...listTypeMenuProps} />}
        {/* more action */}
        {moreMenuProps && (
          <Dropdown color="secondary" size="small" variant="outlined" icon={<MoreHoriz />} {...moreMenuProps} disabledSelection />
        )}
        {/* refresh btn */}
        {onRefresh && !isSmall && !isMobile && (
          // <Tooltip title={t('ncrm_common_btn_refresh')}>
          <IconButton size={'small'} variant="outlined" color="secondary" onClick={onRefresh}>
            <RefreshIcon fontSize="small" />
          </IconButton>
          // </Tooltip>
        )}
        {/* close splip mode */}
        {!isMobile && isSmall && (
          <IconButton
            variant="text"
            size="small"
            color="secondary"
            onClick={() => listTypeMenuProps?.onChange && listTypeMenuProps?.onChange(ListType.LIST)}
          >
            <Close fontSize={'small'} />
          </IconButton>
        )}
        {/* mobile more action */}
        {!isMobile && moreAction && moreAction()}
      </Stack>
    </Box>
  );
};

export default ListToolbar;
