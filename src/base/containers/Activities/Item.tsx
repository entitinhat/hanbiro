import dayjs from 'dayjs';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import RawHTML from '@base/components/@hanbiro/RawHTML';
import { Timeline } from '@base/types/timeLine';
import { removeTags } from '@base/utils/helpers/stringUtils';
import { EditOutlined, LockClockOutlined } from '@mui/icons-material';
import TimelineMUI from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Stack, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Activity } from '@activity/types/activity';
import { useMemo } from 'react';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { convertDateTimeServerToClient } from '@base/utils/helpers/generalUtils';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';

interface ItemProps {
  data: Activity;
}

const Item = ({ data }: ItemProps) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const Task = useMemo(() => {
    return (
      <Grid>
        <TimelineMUI
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: '0px',
              margin: '0px'
            },
            margin: '0px',
            paddingTop: '0px',
            paddingBottom: '0px'
          }}
          onResize={undefined}
          onResizeCapture={undefined}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot sx={{ color: theme.palette.common.white, backgroundColor: theme.palette.primary.main, margin: 0, borderRadius: '.25rem' }}>
                {/* <EditOutlined fontSize='small' /> */}
                <FormIcon icon="task" iconType="icon" />
              </TimelineDot>
              <TimelineConnector sx={{ backgroundColor: theme.palette.secondary.light }} />
            </TimelineSeparator>
            <TimelineContent variant="body2" sx={{ m: 'auto 0', paddingBottom: '1.25rem' }}>
              <Card variant="outlined" sx={{ minWidth: 275 }}>
                <CardContent>
                  <Stack direction="row" justifyContent={"space-between"} alignItems="center">
                    <Typography color="textSecondary">
                      {data.subject}
                    </Typography>
                    <Typography color="textSecondary" sx={{ textAlign: 'left', display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                      <LockClockOutlined />
                      {convertDateTimeServerToClient({ date: data?.createdAt?.toString(), isTime: true })}
                    </Typography>
                  </Stack>
                  <Box sx={{ fontSize: 14 }}>
                    <RawHTML>{data.content}</RawHTML>
                  </Box>
                  <Stack direction={"row"} alignItems="center">
                    <IconAvatar
                      url={data?.createdBy?.photo}
                      alt={data?.createdBy?.name}
                    />
                    <Typography sx={{ textAlign: 'right' }} color="textSecondary">
                      {data.createdBy?.name}, {dayjs(data.createdAt).format('HH:mm')}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        </TimelineMUI>
      </Grid>
    );
  }, [data]);

  const renderItem = () => {
    switch (data.type) {
      case 'TYPE_TASK': {
        return Task;
      }
      // case 'TYPE_MEETING': {
      //   return renderMeeting(data);
      // }
      // case 'TYPE_CALL': {
      //   return renderCall(data);
      // }
      // case 'TYPE_MAIL': {
      //   return renderMail(data);
      // }
      // case 'TYPE_SMS': {
      //   return renderSms(data);
      // }
      // case 'TYPE_FAX': {
      //   return renderFax(data);
      // }
      // case 'TYPE_DM': {
      //   return renderDm(data);
      // }
      // default: {
      //   return renderGeneral(data);
      // }
    }
  };

  return (
    <>{renderItem()}</>
  );
};

export default Item;
