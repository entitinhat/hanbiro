import React, { useEffect, useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { AssignRule } from '@settings/assignment-rule/rule/types/rule';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { AvatarGroup, Box, Card, CardContent, Checkbox, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AssignmentTypeOptions } from '@settings/assignment-rule/rule/config/constants';
interface ListGridCardProps extends BaseListGridCardProps {
  data: AssignRule;
  category: string;
  isSplitMode?: boolean;
  selected?: {
    selected: any;
    setSelected: (id: string) => void;
  };
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, sx, isChecked, onChecked, columnsRendered: ColumnsRendered, isSplitMode, selected } = props;
  const { t } = useTranslation();
  const { id } = data;
  const theme = useTheme();

  let url = `/settings/assignment/rule/${data.id}`;
  const border = `1px solid ${theme.palette.divider}`;
  const createDate = new Date(data.createdAt as any);
  const updateDate = new Date(data.updatedAt as any);
  const createAt = createDate.getFullYear() + '-' + (createDate.getMonth() - 1) + '-' + createDate.getDate();
  const updateAt = updateDate.getFullYear() + '-' + (updateDate.getMonth() - 1) + '-' + updateDate.getDate();
  const module = AssignmentTypeOptions.filter((item) => item.value === data.module);

  const sxSplit = {
    position: 'relative',
    px: 0,
    py: 1,
    padding: 0,
    minHeight: 0,
    borderBottom: border,
    borderRadius: 'unset',
    backgroundColor: selected?.selected == data.id ? theme.palette.divider : '',
    cursor: 'pointer',
    '&:hover': { backgroundColor: theme.palette.divider }
  };
  let activityDate = new Date().toISOString();
  let dueDate = new Date().toISOString();

  useEffect(() => {}, [selected?.selected]);
  return (
    <>
      {!isSplitMode ? (
        <Card elevation={0} sx={sx} style={{ padding: 0, minHeight: 0 }}>
          <CardContent sx={{ height: '42px', borderBottom: border, padding: '10px' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RouteLink to={url} style={{ textDecoration: 'none' }}>
                  <Typography component="h4" variant="body1" noWrap color={'#1890FF'}>
                    {data?.name}
                  </Typography>
                </RouteLink>
              </Box>
            </Stack>
          </CardContent>
          <CardContent sx={{ padding: '10px' }}>
            <Stack sx={{ padding: 0 }} direction="row" justifyContent="space-between">
              <Stack direction="column" spacing={2} width={'45%'}>
                <Box>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {t('ncrm_generalsetting_assignment_rule_field_basic_module')}:{' '}
                  </Typography>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {module[0].label}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {t('ncrm_generalsetting_assignment_rule_field_basic_createddate')}:{' '}
                  </Typography>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {createAt}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="column" spacing={2} width={'45%'}>
                <Box>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {t('ncrm_generalsetting_assignment_rule_field_basic_owner')}:{' '}
                  </Typography>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {data?.createdBy?.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {t('ncrm_generalsetting_assignment_rule_field_basic_updateddate')}:{' '}
                  </Typography>
                  <Typography sx={{ display: 'inline' }} component="h6">
                    {updateAt}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Card
          elevation={0}
          sx={sxSplit}
          onClick={() => {
            selected?.setSelected(data.id);
          }}
        >
          <Stack direction="column" padding={1}>
            <Stack direction="row" spacing={1} padding={'0 0 10px 10px'} alignItems="center">
              <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <RouteLink to={url} style={{ textDecoration: 'none' }}>
                  <Typography component="h4" variant="body1" noWrap color={'#1890FF'}>
                    {data?.name}
                  </Typography>
                </RouteLink>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} paddingLeft={1}>
              <Stack direction="column" spacing={2} width={'45%'}>
                <Typography sx={{ display: 'inline' }} component="h6">
                  {module[0].label}
                </Typography>
              </Stack>
              <Stack direction="column" spacing={2} width={'45%'}>
                <Typography sx={{ display: 'inline' }} component="h6">
                  {data?.createdBy?.name}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default ListGridCard;
