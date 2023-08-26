import { useState } from 'react';

import { Box, useTheme, SxProps, Button } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';

interface UpdateURLProps {
  id: string;
  sx?: SxProps;
  value: any;
  menuSourceId?: string;
  refetch?: () => void;
}

const UpdateURL = (props: UpdateURLProps) => {
  const { id, sx, refetch } = props;
  const theme = useTheme();

  const moreOptions: LabelValueIcon[] = [
    {
      label: 'Edit',
      value: 'edit',
      icon: <ModeEditOutlineOutlinedIcon fontSize="small" color="primary" />
    },
    {
      label: 'Delete',
      value: 'delete',
      icon: <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
    }
  ];

  return (
    <>
      <Box
        sx={{
          ...sx,
          ml: -2,
          mr: -2,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          disabled
          sx={{
            '&.Mui-disabled': {
              color: theme.palette.grey[500],
              backgroundColor: theme.palette.grey[200]
            }
          }}
        >
          Update URL
        </Button>
      </Box>
    </>
  );
};

export default UpdateURL;
