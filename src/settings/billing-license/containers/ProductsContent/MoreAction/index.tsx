import { useState } from 'react';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Box, useTheme, SxProps } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { MENU_SALES_LEAD } from '@base/config/menus';
import Dropdown, { DropdownProps, LabelValueIcon } from '@base/components/@hanbiro/Dropdown';
import { LabelValue } from '@base/types/app';
import useProductsMutation from '@settings/billing-license/hooks/products/useProductsMutation';
import { queryClient } from '@base/config/queryClient';
import { queryKeys } from '@base/config/queryKeys';
import { useParams } from 'react-router-dom';

import WriteNotePage from '@base/containers/Notes/WriteNotePage';

interface MoreActionProps {
  id: string;
  sx?: SxProps;
  value: any;
  menuSourceId?: string;
  refetch?: () => void;
}

const MoreAction = (props: MoreActionProps) => {
  const menuSource = MENU_SALES_LEAD;
  const { id, sx, value, menuSourceId, refetch } = props;
  const theme = useTheme();
  const { id: idLead } = useParams();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { mUpdateNote, mDeleteNote } = useProductsMutation(menuSourceId ? menuSourceId : id);
  const [hideWriteForm, setHideWriteForm] = useState<boolean>(true);

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

  const dropDownMoreOption: DropdownProps = {
    disableChangeTitle: true,
    items: moreOptions,
    icon: <MoreHorizIcon sx={{ cursor: 'pointer', width: '16px' }} />,
    minWidth: 100,
    size: 'small',
    variant: 'text',
    color: 'secondary'
  };

  const handleUpdate = (value: LabelValue) => {
    switch (value.value) {
      case 'edit':
        handleEdit();
        break;
      case 'delete':
        handleDelete();
        break;
      default:
        break;
    }
  };

  const handleEdit = () => {
    setHideWriteForm(false);
  };

  const handleDelete = () => {
    mDeleteNote.mutate(
      { id: id },
      {
        onSuccess: () => {
          // queryClient.refetchQueries({ queryKey: [queryKeys.notes, menuSourceId] });
          refetch && refetch();
        }
      }
    );
  };

  return (
    <>
      <Box
        sx={{
          ...sx,
          ml: -2,
          mr: -2
        }}
      >
        <Dropdown
          {...dropDownMoreOption}
          sx={{
            width: 0
          }}
          sxIcon={{
            border: 0
          }}
          onChange={handleUpdate}
        />
      </Box>
      {!hideWriteForm && (
        <WriteNotePage
          value={value}
          isOpen={!hideWriteForm}
          onClose={() => {
            setHideWriteForm(true);
          }}
          sourceId={idLead || ''}
          source={menuSource}
          isEdit={true}
          id={id}
        />
      )}
    </>
  );
};

export default MoreAction;
