import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Box } from '@mui/material';
import { useGroups } from '@settings/users-groups/groups/hooks/useGroups';
import { useOrg } from '@base/hooks/iam/useOrg';
import { ListGroupsRequest } from '@settings/users-groups/groups/types/group';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
interface UserGroupSelectProps {
  onChange?: (v: any) => void;
  value?: any[];
}
export default function UserGroupSelect(props: UserGroupSelectProps) {
  const { onChange = (v: any) => {}, value = [] } = props;
  const { id } = useOrg();
  const groupsReq: ListGroupsRequest = {
    orgId: id
  };
  const { results, isLoading } = useGroups(groupsReq);

  return (
    <Autocomplete
      multiple
      id="checkboxes-user-group"
      fullWidth
      options={results?.items ?? []}
      disableCloseOnSelect
      value={value}
      getOptionLabel={(option) => option.name}
      onChange={(e: any, v: any) => {
        onChange && onChange(v);
      }}
      renderOption={(props, option, { selected }) => (
        <Box component="li" sx={{ display: 'flex', alignItems: 'center' }} {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} sx={{ mr: 1 }} checked={selected} />
          <PersonOutlineOutlinedIcon sx={{ mr: 1 }} color="info" />
          {option.displayName ?? ''}
        </Box>
      )}
      renderInput={(params) => <TextField {...params} placeholder="Click to select a user group..." />}
    />
  );
}
