import { MoreOutlined } from '@ant-design/icons';
import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { ListGridCardProps as BaseListGridCardProps } from '@base/components/@hanbiro/List/ListGrid';
import { Box, Card, Checkbox, Chip, IconButton, Stack, Typography, Grid } from '@mui/material';
import { Ticket } from '@desk/ticket/types/ticket';
import { blueGrey } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';
import RouteName from '@base/components/@hanbiro/RouteName';
import { dataRegex } from '@desk/ticket/pages/ListPage/Helper';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { priorityConfigs } from '@activity/config/list-field/column';

interface ListGridCardProps extends BaseListGridCardProps {
  data: Ticket;
  category: string;
  iSplitMode?: boolean;
  disableCheckBox?: boolean;
}

const ListGridCard = (props: ListGridCardProps) => {
  const { category, data, sx, isChecked, onChecked, columnsRendered: ColumnsRendered, iSplitMode = false, disableCheckBox = false } = props;
  const { t } = useTranslation();

  const { id, assignedUser, assignedGroup, product, category: dataCategory, status, customer, resolutionDue, priority } = data;

  let url = `/mdesk/ticket/${data.id}`;
  console.log('disableCheckBox:', disableCheckBox);

  const assignedRep = assignedUser?.user;

  let time: string | null = '';
  if (resolutionDue) {
    // Check regex format
    if (dataRegex.test(resolutionDue)) {
      // If resolutionDue format is time
      let dateStr: string | null = convertDateTimeServerToClient({ date: resolutionDue });

      // Handle to convert date according to YYYY-MM-DD format
      if (dateStr && typeof dateStr === 'string') {
        let dateParts: string[] = dateStr.split('-');
        time = dateParts[2] + '-' + dateParts[0] + '-' + dateParts[1];
      } else time = '-';
    } else {
      // If resolutionDue format is not time
      time = resolutionDue;
    }
  }

  return (
    <Card elevation={0} sx={{ ...sx, minHeight: 0 }}>
      <Stack spacing={0.8}>
        {iSplitMode ? (
          // Split mode
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                <RouteName url={url} name={data?.subject} />
              </Stack>
            </Box>
            <Box sx={{ minHeight: '36px' }}>
              <Stack direction="row" sx={{ my: 2 }}>
                <Grid xs={6}>
                  {priority && (
                    <Chip
                      sx={{
                        color: priorityConfigs?.[data?.priority?.keyName]?.textColor,
                        backgroundColor: priorityConfigs?.[data?.priority?.keyName]?.backgroundColor
                      }}
                      label={t(priorityConfigs?.[data?.priority?.keyName]?.name)}
                      size="small"
                    />
                  )}
                </Grid>
                <Grid xs={6}>{customer && <Typography sx={{ textAlign: 'end' }}>{customer.name}</Typography>}</Grid>
              </Stack>
              <Stack direction="row">
                <Grid xs={6}>{resolutionDue && <Typography>{time}</Typography>}</Grid>
                <Grid xs={6}> {assignedRep && <Typography sx={{ textAlign: 'end' }}>{assignedRep.name}</Typography>}</Grid>
              </Stack>
            </Box>
          </>
        ) : (
          // Grid mode
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Stack direction="row" spacing={1} alignItems="center">
                {!disableCheckBox && (
                  <Checkbox sx={{ p: 0 }} color="secondary" checked={isChecked ?? false} onClick={() => onChecked && onChecked(id)} />
                )}
                <RouteName url={url} name={data?.subject} />
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton edge="end" color="secondary">
                  <MoreOutlined style={{ fontSize: '1.15rem' }} />
                </IconButton>
              </Stack>
            </Box>
            <Box>
              <Stack direction="row">
                <Grid xs={6}>
                  <Stack direction="row">
                    <Typography color="secondary" mr={1}>
                      Priority:
                    </Typography>
                    <Chip
                      sx={{
                        color: priorityConfigs?.[data?.priority?.keyName]?.textColor,
                        backgroundColor: priorityConfigs?.[data?.priority?.keyName]?.backgroundColor
                      }}
                      label={t(priorityConfigs?.[data?.priority?.keyName]?.name)}
                      size="small"
                    />
                  </Stack>
                </Grid>
                <Grid xs={6}>
                  <Stack direction="row">
                    <Typography color="secondary" mr={1}>
                      {t('ncrm_desk_ticket_customer')}:
                    </Typography>
                    <Typography>{customer?.name ?? ''}</Typography>
                  </Stack>
                </Grid>
              </Stack>
              <Stack direction="row">
                <Grid xs={6}>
                  <Stack direction="row" sx={{ my: 2 }}>
                    <Typography color="secondary" mr={1}>
                      {t('ncrm_desk_ticket_category')}:
                    </Typography>
                    <Typography>{dataCategory?.name ?? ''}</Typography>
                  </Stack>
                </Grid>
                <Grid xs={6}>
                  <Stack direction="row" sx={{ my: 2 }}>
                    <Typography color="secondary" mr={1}>
                      {t('ncrm_desk_ticket_status')}:
                    </Typography>
                    <Typography>{t(status?.languageKey ?? '')}</Typography>
                  </Stack>
                </Grid>
              </Stack>
              <Stack direction="row">
                <Grid xs={6}>
                  <Stack direction="row">
                    {assignedRep && (
                      <>
                        <Typography color="secondary" mr={1}>
                          Assigned Rep:
                        </Typography>
                        <Typography>{assignedRep.name ?? ''}</Typography>
                      </>
                    )}
                  </Stack>
                </Grid>
                <Grid xs={6}>
                  <Stack direction="row">
                    <Typography color="secondary" mr={1}>
                      Resolution Due:
                    </Typography>
                    <Typography>{time ?? ''}</Typography>
                  </Stack>
                </Grid>
              </Stack>
            </Box>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ListGridCard;
