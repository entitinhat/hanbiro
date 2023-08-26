import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useWindowSize } from 'usehooks-ts';

import IconButton from '@base/components/@extended/IconButton';
import Dropdown from '@base/components/@hanbiro/Dropdown';
import { drawerWidth } from '@base/config/config';
import { menuWithDrawerOpen } from '@base/store/selectors/app';
import { LabelValueIcon } from '@base/types/app';
import { Close, MoreHoriz } from '@mui/icons-material';
import { Box, Button, Chip, Container, Portal, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface ListBottomToolbarProps {
  checkedIds: string[];
  onClick?: (v: LabelValueIcon['value']) => void;
  onCancel: (...params: any[]) => void;
}

interface Props extends ListBottomToolbarProps {
  items: LabelValueIcon[];
  visible?: boolean;
}

const ListBottomToolbar = (props: Props) => {
  const { checkedIds = [], items, onClick, onCancel, visible = false } = props;

  const theme = useTheme();
  const drawerOpen = useRecoilValue(menuWithDrawerOpen);
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* <Portal> */}

      {checkedIds?.length > 0 && (
        <Box
          sx={{
            maxWidth: '100%',
            position: 'absolute',
            top: '-6px',
            right: 0,
            left: 0,
            zIndex: '1',
            transition: 'all 0.1s',
            py: 1,
            px: 2,
            bgcolor: theme.palette.background.paper
          }}
        >
          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent={matchDownSM ? 'space-between' : 'flex-start'}>
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
              {matchDownSM ? (
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
                  onChange={(nVal: LabelValueIcon) => onClick && onClick(nVal.value)} //hover onClick for more options
                  title="More"
                  icon={<MoreHoriz />}
                  placement="top-end"
                  items={items}
                  disabledSelection
                />
              ) : (
                items.map((item, i) => (
                  <Button
                    size="small"
                    key={i}
                    onClick={item.onClick}
                    startIcon={item.icon}
                    color="secondary"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'transparent!important',
                        borderColor: `${theme.palette.grey[500]}!important`,
                        zIndex: 5
                      },
                      border: 'solid 1px transparent',
                      padding: '0.2rem 0.9rem'
                    }}
                  >
                    {item.label}
                  </Button>
                ))
              )}
            </Stack>
          </Stack>
        </Box>
      )}
      {/* </Portal> */}
    </>
  );
};

export default ListBottomToolbar;
