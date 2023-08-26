import { KEY_TICKET_ASSIGN_GROUP, KEY_TICKET_ASSIGN_USER } from '@desk/ticket/config/keyNames';
import React, { useEffect, useState } from 'react';
// import AssignGroupAutoComplete from '../AssignGroupAutocomplete';
// import AssignRepAutoComplete, { AssignRepValue } from '../AssignRepAutocomplete';
import { Box, Typography } from '@mui/material';
import { IdName } from '@base/types/common';
import { useTranslation } from 'react-i18next';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';
import AssignUserAutoComplete, { AssignUserValue } from '@settings/preferences/containers/AssignUserAutocomplete';

export interface ValueProps {
  assignedGroup: IdName | null;
  assignedUser: AssignUserValue | null;
}
interface GroupRepProps {
  hideGroupLabel?: boolean;
  value?: ValueProps | null;
  onChange?: (nVal: ValueProps) => void;
}

const AssignGroupRep: React.FC<GroupRepProps> = (props) => {
  const { hideGroupLabel = false, value, onChange } = props;

  //state
  const [curGroup, setCurGroup] = useState<IdName | null>(null);
  const [curRep, setCurRep] = useState<AssignUserValue | null>(null);
  const { t } = useTranslation();

  //initial value
  useEffect(() => {
    if (value) {
      if (value?.[KEY_TICKET_ASSIGN_GROUP]) {
        if (value[KEY_TICKET_ASSIGN_GROUP]?.id !== curGroup?.id) {
          setCurGroup(value[KEY_TICKET_ASSIGN_GROUP]);
        }
      }
      if (value?.[KEY_TICKET_ASSIGN_USER]) {
        if (value[KEY_TICKET_ASSIGN_USER]?.user.id !== curRep?.user.id) {
          setCurRep(value[KEY_TICKET_ASSIGN_USER]);
        }
      }
    } else {
      setCurGroup(null);
      setCurRep(null);
    }
  }, [value]);

  //value change
  const handleGroupChange = (newGroup: any) => {
    setCurGroup(newGroup);
    setCurRep(null);
    //callback
    onChange && onChange({ [KEY_TICKET_ASSIGN_GROUP]: newGroup, [KEY_TICKET_ASSIGN_USER]: null });
  };

  //value change
  const handleRepChange = (newRep: any) => {
    setCurRep(newRep);
    //callback
    onChange && onChange({ [KEY_TICKET_ASSIGN_GROUP]: curGroup, [KEY_TICKET_ASSIGN_USER]: newRep });
  };

  return (
    <Box position="relative">
      <Box mb={1}>
        {!hideGroupLabel && (
          <Typography ml={1} mb={1} color="secondary">
            {t('ncrm_desk_ticket_assigned_group')}
          </Typography>
        )}
        <AssignGroupAutoComplete value={curGroup} onChange={handleGroupChange} />
      </Box>
      <Box>
        <Typography ml={1} mb={1} color="secondary">
          {t('ncrm_desk_ticket_assigned_rep')}
        </Typography>
        <AssignUserAutoComplete value={curRep} onChange={handleRepChange} />
      </Box>
    </Box>
  );
};

export default AssignGroupRep;
