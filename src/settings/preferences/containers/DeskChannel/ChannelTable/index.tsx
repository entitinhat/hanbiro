// Hooks
import { useChannels, useChannelsType } from '@settings/preferences/hooks/desk/useChannels';
import AssignRepMenu from './AssignRepMenu';
import WriteChangeModal from '../WriteChangeModal';
import { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { DeleteOutlineOutlined, ModeEditOutlineOutlined } from '@mui/icons-material';
import Toolbar from '../Toolbar';
import { useChannelMutation } from '@settings/preferences/hooks/desk/useChannelMutation';
import { DeskChannel, DeskChannelType } from '@settings/preferences/types/desk/channel';
import { useTranslation } from 'react-i18next';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { ChannelType } from '@settings/preferences/types/desk/common';

// Styles
const rowSx = {
  '&:last-child td, &:last-child th': {
    border: 0
  },
  '&:hover': {
    '& .item-option': {
      visibility: 'visible'
    }
  }
};

// Data
const label = { inputProps: { 'aria-label': 'Switch demo' } };

function ChannelTable() {
  const { data, refetch } = useChannels('');
  const theme = useTheme();
  const { t } = useTranslation();

  // handle Update modal
  const [openModal, setOpenModal] = useState(false);
  const [channelData, setChannelData] = useState<DeskChannel | null>(null);
  const { mUpdate, mDelete } = useChannelMutation();

  // State option to get type when create channel
  const [option, setOption] = useState<ChannelType | string>('');

  // Function => get value selected option via getOption props of ChannelTypeBox
  const handleSetOption = (item: ChannelType) => {
    setOption(item);
  };

  const handleClose = () => {
    setOpenModal(false);

    // Set default option is CTYPE_LANDING_PAGE to display the create channel screen when clicking close button of modal
    setOption(ChannelType.LANDING_PAGE);
  };

  const handleUpdate = (row: DeskChannel) => {
    setChannelData(row);
    setOpenModal(true);
    setOption(row.type.keyName); // Set option to display the update channel screen when clicking update button
  };

  const handleActive = (row: DeskChannel) => {
    const channel = {
      id: row.id,
      active: !row.active
    };
    mUpdate.mutate({ channel });
  };

  const handleDelete = (row: DeskChannel) => {
    mDelete.mutate({ ids: [row.id] });
  };

  // Check type of data when passed
  const handleCheck = (row: DeskChannel) => {
    const isCheck = row?.type?.keyName === ChannelType.LANDING_PAGE || row?.type?.keyName === ChannelType.WEBHOOK ? true : false;
    return isCheck;
  };

  // Handle to convert date according to YYYY-MM-DD format
  const handleDate = (time: string) => {
    let dateStr = convertDateTimeServerToClient({ date: time });
    if (dateStr && typeof dateStr === 'string') {
      let dateParts = dateStr.split('-');
      let newDateStr = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
      return newDateStr;
    }
    return '-';
  };

  return (
    <>
      <Toolbar
        reloadList={() => {
          refetch();
        }}
      />
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ border: 0, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell sx={{ width: '35%' }}>{t('ncrm_generalsetting_preferences_desk_channel_name')}</TableCell>
              <TableCell sx={{ width: '35%' }}>{t('ncrm_generalsetting_preferences_desk_channel_type')}</TableCell>
              <TableCell sx={{ width: '10%' }}>{t('ncrm_generalsetting_preferences_active')}</TableCell>
              <TableCell>{t('ncrm_generalsetting_preferences_desk_create_date')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.results?.map((row, index) => (
              <TableRow key={row.id} sx={rowSx}>
                <TableCell sx={{ width: '35%' }}>{row.name}</TableCell>
                <TableCell sx={{ width: '35%' }}>{t(row.type.languageKey)}</TableCell>

                {/* Display Switch active button */}
                <TableCell sx={{ width: '10%' }}>
                  <Switch
                    // checked={row.active}
                    defaultChecked={row.active} // Set checked active according to data
                    {...label}
                    // size="small"
                    size="medium" // Set size of Switch button
                    onChange={() => handleActive(row)}
                    sx={{ ml: 0 }} // Set margin left 0 of span Switch
                  />
                </TableCell>

                <TableCell>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={8}>
                      <Typography>{handleDate(row.createdAt)}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {row.type.keyName !== ChannelType.NONE && (
                        <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_edit')} placement="left" disableInteractive>
                          <IconButton onClick={() => handleUpdate(row)}>
                            <ModeEditOutlineOutlined
                              sx={{ cursor: 'pointer', visibility: 'hidden' }}
                              color="primary"
                              fontSize="small"
                              className="item-option"
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      {/* Check to display Delete button => (row.type.keyName === ChannelType.LANDING_PAGE || row.type.keyName === ChannelType.WEBHOOK) */}
                      {handleCheck(row) && (
                        <Tooltip title={t('ncrm_generalsetting_preferences_tooltip_title_delete')} placement="left" disableInteractive>
                          <IconButton onClick={() => handleDelete(row)}>
                            <DeleteOutlineOutlined
                              sx={{ cursor: 'pointer', visibility: 'hidden' }}
                              className="item-option"
                              fontSize="small"
                              color="error"
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {openModal && (
          <WriteChangeModal
            channelData={channelData}
            openModal={openModal}
            handleClose={handleClose}
            option={option}
            handleSetOption={handleSetOption}
          />
        )}
      </TableContainer>
    </>
  );
}

export default ChannelTable;
