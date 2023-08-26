import { BorderColorRounded } from '@mui/icons-material';
import { Box, Divider, Stack, Typography, useTheme } from '@mui/material';
import MemberQuickView from '@project/components/Member/QuickView';
import { AssignRole } from '@project/types/project';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { memberRoles } from '../../../components/Member';

interface AssignedRepProps {
  members?: AssignRole[];
}

function AssignedRep({ members }: AssignedRepProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const params = useParams();
  const menuSourceId = params?.id as string;
  const totalMember = members?.length ?? 0;

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('crm_project_project_member')}
        </Typography>
        <MemberQuickView
          value={{ id: menuSourceId, icon: <BorderColorRounded sx={{ color: 'primary.main', fontSize: 18 }} /> }}
          data={members}
          size={650}
        />
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <>
          {members?.map((member, index) => {
            const role = memberRoles.find((v) => v.keyName == member.role)!!;
            return (
              <React.Fragment key={member.id}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography color="textSecondary">{role.languageKey}</Typography>
                  <Stack spacing={1} textAlign="right">
                    {member.fields?.map((field) => {
                      return (
                        <React.Fragment key={field.field.id}>
                          {field.assignTo?.map((v) => {
                            return (
                              <Stack spacing={0.5} key={v.id}>
                                <Typography>{v.name}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {field.field.name}
                                </Typography>
                              </Stack>
                            );
                          })}
                        </React.Fragment>
                      );
                    })}
                  </Stack>
                </Stack>
                {totalMember !== index + 1 && <Divider />}
              </React.Fragment>
            );
          })}
        </>
        {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">PM</Typography>
          <Typography>DHKim (Dept Cheif)</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">PL</Typography>
          <Typography>MSR (Section Cheif)</Typography>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">PE</Typography>
          <Stack spacing={1} textAlign="right">
            <Typography>SGPark (Manager)</Typography>
            <Typography color="textSecondary">Backend</Typography>
            <Typography>Thien (Staff)</Typography>
            <Typography color="textSecondary">Frontend</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">QA</Typography>
          <Typography>Phoung Dofu (Manager)</Typography>
        </Stack> */}
      </Stack>
    </Box>
  );
}

export default AssignedRep;
