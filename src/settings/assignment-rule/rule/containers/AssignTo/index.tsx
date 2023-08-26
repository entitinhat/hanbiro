import { useEffect, useState } from 'react';

//project
import { IdName } from '@base/types/common';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import { EAREntryAssignToMode } from '../../types/enums';

//material-ui
import { FormControlLabel, Grid, Radio, RadioGroup, useTheme } from '@mui/material';

//third-party
import { useTranslation } from 'react-i18next';
import AssignUserAutoComplete from '@settings/preferences/containers/AssignUserAutocomplete';

interface AssignValue {
  mode: EAREntryAssignToMode;
  assignsTo: { user?: IdName; group?: IdName }[];
}
interface AssignToProps {
  value: AssignValue;
  onChange: (val: AssignValue) => void;
}
const AssignTo = (props: AssignToProps) => {
  const { value, onChange } = props;
  const [curMode, setCurMode] = useState<EAREntryAssignToMode>(EAREntryAssignToMode.USER);
  const [curSelect, setCurSelect] = useState<IdName | null | undefined>(null);
  const theme = useTheme();
  const { t } = useTranslation();
  console.log('!~~~~ curMode', curMode);
  useEffect(() => {
    if (value) {
      if (value.mode) setCurMode(value.mode);
      if (value.assignsTo && value.assignsTo?.length > 0) setCurSelect(value.assignsTo[0]?.user ?? value.assignsTo[0]?.group);
      else setCurSelect(null);
    }
  }, [value]);
  const handleModeChange = (value: EAREntryAssignToMode) => {
    setCurMode(value);
    setCurSelect(null);
    onChange && onChange({ mode: value, assignsTo: [] });
  };
  const handleChange = (value: IdName) => {
    let nVal: any = {};
    if (curMode == EAREntryAssignToMode.USER) {
      nVal.user = value;
    } else nVal.group = value;
    onChange && onChange({ mode: curMode, assignsTo: [nVal] });
  };
  return (
    <Grid>
      <RadioGroup row value={curMode} onChange={(ev) => handleModeChange(ev.target.value as EAREntryAssignToMode)}>
        <FormControlLabel
          value={EAREntryAssignToMode.USER}
          control={<Radio />}
          label={t('ncrm_generalsetting_assignment_rule_field_basic_user')}
        />
        <FormControlLabel
          value={EAREntryAssignToMode.GROUP}
          control={<Radio />}
          label={t('ncrm_generalsetting_assignment_rule_field_basic_group')}
        />
      </RadioGroup>
      {curMode == EAREntryAssignToMode.USER ? (
        <AssignUserAutoComplete
          value={{ user: curSelect ?? { id: '', name: '' }, group: { id: '', name: '' } }}
          single={true}
          onChange={(user: any) => {
            const nUser = user.user;
            handleChange({
              id: nUser?.id,
              name: nUser?.name
            });
          }}
        />
      ) : (
        <AssignGroupAutoComplete
          value={curSelect}
          single={true}
          onChange={(nGroup: any) =>
            handleChange({
              id: nGroup?.id,
              name: nGroup?.name
            })
          }
        />
      )}
    </Grid>
  );
};
export default AssignTo;
