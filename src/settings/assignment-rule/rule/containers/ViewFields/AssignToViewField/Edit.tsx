import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { EAREntryAssignToMode, IAssignToName } from '@settings/assignment-rule/rule/types/rule';
import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { IdName } from '@base/types/common';
import { useEffect, useState } from 'react';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import AssignGroupAutoComplete from '@settings/preferences/containers/AssignGroupAutocomplete';
import AssignUserAutoComplete from '@settings/preferences/containers/AssignUserAutocomplete';

interface EditProps extends CommonEditProps {
  value: {
    mode: EAREntryAssignToMode;
    assignsTo: IAssignToName[];
  };
  onChange: (nValue: { mode: EAREntryAssignToMode; assignsTo: IAssignToName[] }) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  const [curMode, setcurMode] = useState<EAREntryAssignToMode>(EAREntryAssignToMode.USER);
  const [curAssign, setCurAssign] = useState<IdName>();
  const { t } = useTranslation();

  useEffect(() => {
    if (value && value.assignsTo) {
      setcurMode(value.mode);
      if (value.mode == EAREntryAssignToMode.USER) setCurAssign(value.assignsTo[0].user);
      else setCurAssign(value.assignsTo[0].group);
    }
  }, [value]);
  const handleModeChange = (val: EAREntryAssignToMode) => {
    onChange && onChange({ assignsTo: value?.assignsTo, mode: val });
    setcurMode(val);
  };
  const handleAssignChange = (val: IdName) => {
    if (curMode == EAREntryAssignToMode.USER) {
      onChange && onChange({ assignsTo: [{ user: { ...val } }], mode: curMode });
    } else {
      onChange && onChange({ assignsTo: [{ group: { ...val } }], mode: curMode });
    }
  };
  console.log('!!~~ curAssign', curAssign);
  return (
    <Grid container direction="column">
      <Grid item>
        <RadioGroup row value={curMode ?? ''} onChange={(ev) => handleModeChange(ev.target.value as EAREntryAssignToMode)}>
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
      </Grid>
      <Grid item>
        {curMode == EAREntryAssignToMode.USER ? (
          <AssignUserAutoComplete
            value={{ user: { id: curAssign?.id ?? '', name: curAssign?.name ?? '' }, group: { id: '', name: '' } }}
            single={true}
            onChange={(user: any) => {
              console.log('~~~~ user', user);
              const nUser = user?.user;
              handleAssignChange({
                id: nUser?.id,
                name: nUser?.name
              });
            }}
          />
        ) : (
          <AssignGroupAutoComplete
            single={true}
            value={curAssign}
            onChange={(nGroup: any) =>
              handleAssignChange({
                id: nGroup?.id,
                name: nGroup?.name
              })
            }
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Edit;
