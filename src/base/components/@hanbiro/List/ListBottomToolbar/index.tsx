import React from 'react';
import { useRecoilValue } from 'recoil';

import IconButton from '@base/components/@extended/IconButton';
import Dropdown from '@base/components/@hanbiro/Dropdown';
import { drawerWidth, SPLIT_MAX_SIZE } from '@base/config/config';
import { menuWithDrawerOpen } from '@base/store/selectors/app';
import { LabelValueIcon } from '@base/types/app';
import { Close, MoreHoriz } from '@mui/icons-material';
import { Box, Button, Chip, Portal, Stack, useMediaQuery } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import useDevice from '@base/hooks/useDevice';

import DropdownListBottomToolBar from './DropdownListBottomToolBar';
import { LabelValueData } from '@base/types/app';
//project
import { FilterByOption } from '@base/types/common';
export interface ListBottomToolbarProps {
  isSplitMode?: boolean;
  checkedIds: string[];
  onClick?: (v: LabelValueIcon['value']) => void;
  onCancel: (...params: any[]) => void;
}

interface Props extends ListBottomToolbarProps {
  items: LabelValueIcon[];
  visible?: boolean;
  isSplitMode?: boolean;
  sx?: SxProps;
}

const ListBottomToolbar = (props: Props) => {
  const { checkedIds = [], items, onClick, onCancel, visible = false, sx, isSplitMode } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);
  const { isMobile } = useDevice();

  return (
    <Portal>
      {checkedIds?.length > 0 && (
        <Box
          sx={{
            maxWidth: isSplitMode ? 350 : '100%',
            position: 'absolute',
            top: isMobile || isSplitMode ? 112 : 108,
            right: 0,
            left: drawerOpen ? drawerWidth : 0,
            zIndex: 1100,
            transition: 'all 0.1s',
            // py: 1,
            // px: 2,
            // bgcolor: theme.palette.background.paper,
            bgcolor: theme.palette.secondary[200],
            mx: 2,
            px: 1,
            py: 0.5,
            ...sx
          }}
        >
          <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            justifyContent={isMobile || isSplitMode ? 'space-between' : 'flex-start'}
          >
            <Stack spacing={0.5} direction="row" alignItems="center">
              <IconButton
                size="small"
                color="secondary"
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent!important',
                    svg: {
                      transform: 'scale(1.2)'
                    }
                  }
                }}
                onClick={onCancel}
              >
                <Close fontSize="small" />
              </IconButton>
              <Chip size="small" variant="combined" label={checkedIds?.length ?? 0} />
            </Stack>
            <Stack spacing={0.2} direction="row" alignItems="center">
              {isMobile || isSplitMode ? (
                <Dropdown
                  sx={{
                    '> .MuiButtonBase-root': {
                      border: 'solid 1px transparent',
                      padding: '0.2rem 0.9rem',
                      '&:hover': {
                        backgroundColor: 'transparent!important',
                        borderColor: `${theme.palette.grey[500]}!important`,
                        zIndex: 5
                      }
                    }
                  }}
                  onChange={(item: LabelValueIcon) => {
                    console.log('item', item);
                    if (!!item?.onClick) {
                      item.onClick();
                    } else {
                      onClick && onClick(item.value);
                    }
                  }} //hover onClick for more options
                  title="More"
                  icon={<MoreHoriz />}
                  placement="top-end"
                  items={items}
                  disableChangeTitle
                />
              ) : (
                items.map((item, i) =>
                  item?.moreAction ? (
                    // In case List bottom tool bar have updated more option
                    <DropdownListBottomToolBar
                      sx={{ position: 'relative' }}
                      key={i}
                      items={item.moreAction}
                      title={item.label}
                      placement={'bottom-start'}
                      onChange={(nValue: any) => {
                        nValue && item.excuteMoreAction && item.excuteMoreAction(nValue);
                      }}
                    />
                  ) : (
                    <Button
                      size="small"
                      key={i}
                      onClick={() => {
                        if (!!item?.onClick) {
                          item.onClick();
                        } else {
                          onClick && onClick(item.value);
                        }
                      }}
                      startIcon={item.icon}
                      color="inherit"
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent!important',
                          borderColor: `${theme.palette.grey[500]}!important`,
                          zIndex: 5
                        },
                        border: 'solid 1px transparent',
                        padding: '0.2rem 0.9rem',
                        position: 'relative'
                      }}
                    >
                      {t(item.label)}
                    </Button>
                  )
                )
              )}
            </Stack>
          </Stack>
        </Box>
      )}
    </Portal>
  );
};

export default ListBottomToolbar;
