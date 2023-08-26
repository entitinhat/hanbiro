import _ from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { v4 as uuidv4 } from 'uuid';

import { OptionValue } from '@base/types/common';
import { removeItemAtIndex, replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { projectSettingSelector } from '@project/store/selectors/setting';
import { AssignRole } from '@project/types/project';

import Item from './Item';
import { useTranslation } from 'react-i18next';

export const memberRoles: OptionValue[] = [
  {
    keyName: 'ROLE_PM',
    languageKey: 'PM'
  },
  {
    keyName: 'ROLE_PL',
    languageKey: 'PL'
  },
  {
    keyName: 'ROLE_PE',
    languageKey: 'PE'
  },
  {
    keyName: 'ROLE_QA',
    languageKey: 'QA'
  }
];

interface MemberProps {
  value: AssignRole[];
  onChange?: (val: AssignRole[]) => void;
}

const Member = (props: MemberProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { value: members = [], onChange } = props;
  const [error, setError] = useState('');

  const fieldSettings = useRecoilValue(projectSettingSelector('TYPE_MEMBER_FIELD'));
  const fieldOptions = useMemo(() => {
    let defaultOption = {} as OptionValue;
    const options = fieldSettings.map((v) => {
      const option = { keyName: v.id, languageKey: v.name };
      if (v.default) {
        defaultOption = option;
      }
      return option;
    });
    return { defaultOption, options };
  }, [fieldSettings]);

  const handleAdd = () => {
    onChange &&
      onChange([
        ...members,
        {
          id: uuidv4(),
          role: 'ROLE_PE',
          fields: [
            {
              field: {
                id: fieldOptions.defaultOption?.keyName,
                name: fieldOptions.defaultOption?.languageKey
              },
              assignTo: []
            }
          ]
        }
      ]);
  };

  const handleChange = (newVal: AssignRole) => {
    console.log(members, newVal);
    const findRole = members.find((_v) => _v.id !== newVal.id && _v.role == newVal.role);
    if (findRole) {
      setError("The role can't duplicate.");
    } else {
      const findIndex = members.findIndex((_v) => _v.id == newVal.id);
      onChange && onChange(replaceItemAtIndex(members, findIndex, newVal));
      setError('');
    }
  };

  const handleRemove = (id: string) => {
    console.log('handle Remove');
    const findIndex = members.findIndex((v) => v.id == id);
    onChange && onChange(removeItemAtIndex(members, findIndex));
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}>
                {t('ncrm_project_role')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '20%', p: 0.5 }}>
                {t('ncrm_project_field')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ p: 0.5 }}>
                {t('ncrm_project_member')}
              </TableCell>
              <TableCell sx={{ width: '10%', p: 0.5 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((item) => (
              <Item key={item.id} item={item} handleChange={handleChange} fieldOptions={fieldOptions} handleRemove={handleRemove} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {error && (
        <Typography variant="h6" sx={{ color: 'error.main' }}>
          {error}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirction: 'flex-start' }}>
        <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAdd}>
          {t('ncrm_project_add_a_role')}
        </Button>
      </Box>
    </Stack>
  );
};

export default Member;
