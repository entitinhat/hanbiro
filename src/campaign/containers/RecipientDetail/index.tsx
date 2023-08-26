import React, { Fragment, useMemo, useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';
import MuiPopper from '@base/components/@hanbiro/Popper';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, INTERACTION_ACTIONS, STEP_FIELDS } from '@campaign/config/constants';
import ContentEditor from '@campaign/components/ContentEditor';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import DateRangePicker from '@base/components/@hanbiro/Date/DateRangePicker';
import {
  ArrowForward,
  ArrowForwardIos,
  CheckOutlined,
  MailOutlined,
  ManageSearch,
  MoreHorizOutlined,
  PhoneOutlined,
  SearchOutlined
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { ResponsiveFunnel, Funnel } from '@nivo/funnel';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import MainCard from '@base/components/App/MainCard';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator
} from '@mui/lab';

interface RecipientDetailProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const RecipientDetail = (props: RecipientDetailProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const defaultValues = [
    {
      id: '111',
      pageTitle: true,
      pageName: true,
      recipient: { id: '1', name: 'Adventure works 1', email: 'ad1@works.com' }
    },
    {
      id: '112',
      pageTitle: true,
      pageName: true,
      recipient: { id: '2', name: 'Adventure works 2', email: 'ad2@works.com' }
    },
    {
      id: '113',
      pageTitle: false,
      pageName: true,
      recipient: { id: '3', name: 'Adventure works 3', email: 'ad3@works.com' }
    }
  ];
  const [items, setItems] = useState<any>(defaultValues);

  //render columns components
  const getMapColumns = () => {
    return {
      recipient(col: string, data: any) {
        return <Typography>{`${data[col].name} <${data[col].email}>`}</Typography>;
      },
      pageTitle(col: string, data: any) {
        return data[col] ? (
          <Stack justifyContent={'center'} alignItems="center">
            <CheckOutlined color="success" />
          </Stack>
        ) : (
          ''
        );
      },
      pageName(col: string, data: any) {
        return data[col] ? (
          <Stack justifyContent={'center'} alignItems="center">
            <CheckOutlined color="success" />
          </Stack>
        ) : (
          ''
        );
      },
      action(col: string, data: any) {
        return (
          <Stack justifyContent={'center'} alignItems="center">
            <MuiPopper disablePortal={false} sx={matchesSm ? { maxWidth: '100%' } : {}} icon={<ManageSearch />}>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">2023-02-08 09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="primary" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>CTA 1 clicked</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">2023-02-08 10:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="warning" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Page 1 viewed</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">2023-02-08 12:30 pm</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot variant="outlined" color="error" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>CTA 2 clicked</TimelineContent>
              </TimelineItem>
            </MuiPopper>
          </Stack>
        );
      }
    };
  };

  //table columns
  const fields = useMemo(() => {
    return [
      { languageKey: 'Recipient', keyName: 'recipient', enableSorting: false, width: 'auto' },
      { languageKey: 'Page Title', keyName: 'pageTitle', enableSorting: false, width: 'auto' },
      { languageKey: 'Page Name', keyName: 'pageName', enableSorting: false, width: 'auto' },
      { languageKey: '', keyName: 'action', enableSorting: false, width: 'auto' }
    ];
  }, [menuSourceId]);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  return (
    <Box className="detail-view scroll-box" sx={{ pr: 2 }}>
      <Stack direction={'row'} justifyContent={'end'} alignItems="center">
        <CheckOutlined color="success" />
        <Typography>:View</Typography>
      </Stack>
      <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
        <ReactTable8 columns={columns} data={[...items]} paging={{ pageSize: 100 }} />
      </Box>
    </Box>
  );
};

export default RecipientDetail;
