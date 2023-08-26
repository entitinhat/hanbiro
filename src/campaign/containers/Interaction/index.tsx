import React, { Fragment, useMemo, useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import {
  Box,
  Button,
  Divider,
  Grid,
  InputLabel,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme
} from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, INTERACTION_ACTIONS, STEP_FIELDS } from '@campaign/config/constants';
import ContentEditor from '@campaign/components/ContentEditor';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import DateRangePicker from '@base/components/@hanbiro/Date/DateRangePicker';
import { ArrowForward, ArrowForwardIos, MailOutlined, MoreHorizOutlined, PhoneOutlined, SearchOutlined } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { ResponsiveFunnel, Funnel } from '@nivo/funnel';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';

interface InteractionProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const Interaction = (props: InteractionProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const theme = useTheme();
  const defaultActiveValues = [
    {
      id: '111',
      timestamp: '2023-02-17 08:00',
      emailUsed: 'ad1@works.com',
      recipient: { id: '1', name: 'Adventure works 1', email: 'ad1@works.com' }
    },
    {
      id: '112',
      timestamp: '2023-02-18 08:00',
      emailUsed: 'ad2@works.com',
      recipient: { id: '2', name: 'Adventure works 2', email: 'ad2@works.com' }
    }
  ];
  const defaultBlockValues = [
    {
      id: '111',
      timestamp: '2023-02-17 08:00',
      emailUsed: 'ad1@works.com',
      recipient: { id: '1', name: 'Adventure works 1', email: 'ad1@works.com' },
      blockReason: 'cannot contact'
    },
    {
      id: '112',
      timestamp: '2023-02-18 08:00',
      emailUsed: 'ad2@works.com',
      recipient: { id: '2', name: 'Adventure works 2', email: 'ad2@works.com' },
      blockReason: 'cannot contact'
    }
  ];
  const [activeItems, setActiveItems] = useState<any>(defaultActiveValues);
  const [blockItems, setBlockItems] = useState<any>(defaultBlockValues);

  //render columns components
  const getMapColumns = () => {
    return {
      recipient(col: string, data: any) {
        return <Typography>{`${data[col].name} <${data[col].email}>`}</Typography>;
      },
      emailUsed(col: string, data: any) {
        return <Typography>{data[col]}</Typography>;
      },
      timestamp(col: string, data: any) {
        return <Typography>{data[col]}</Typography>;
      }
    };
  };

  //table columns
  const activeFields = useMemo(() => {
    return [
      { languageKey: 'Recipient', keyName: 'recipient', enableSorting: false, width: 'auto' },
      { languageKey: 'Email Used', keyName: 'emailUsed', enableSorting: false, width: 'auto' },
      { languageKey: 'Timestamp', keyName: 'timestamp', enableSorting: false, width: 'auto' }
    ];
  }, [menuSourceId]);

  const blockFields = useMemo(() => {
    return [
      { languageKey: 'Recipient', keyName: 'recipient', enableSorting: false, width: 'auto' },
      { languageKey: 'Block Reason', keyName: 'blockReason', enableSorting: false, width: 'auto' },
      { languageKey: 'Email Used', keyName: 'emailUsed', enableSorting: false, width: 'auto' },
      { languageKey: 'Timestamp', keyName: 'timestamp', enableSorting: false, width: 'auto' }
    ];
  }, [menuSourceId]);

  //build columns for table v8
  const activeColumns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(activeFields, getMapColumns(), {}, [])], [activeFields]);
  const blockColumns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(blockFields, getMapColumns(), {}, [])], [blockFields]);

  //chart data
  const overtimeSeries = [
    {
      name: 'Open',
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: 'Clicked',
      data: [12, 11, 14, 18, 17, 13, 13]
    },
    {
      name: 'Replied',
      data: [8, 9, 13, 26, 31, 22, 15]
    },
    {
      name: 'Bounced',
      data: [2, 16, 24, 38, 17, 33, 23]
    }
  ];
  const overtimeOptions = {
    chart: {
      height: 450,
      //type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#77B6EA', '#545454', '#61B6EA', '#521454'],
    dataLabels: {
      enabled: true
    },
    // stroke: {
    //   curve: 'smooth'
    // },
    // title: {
    //   text: 'Average High & Low Temperature'
    //   align: 'left'
    // },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      }
    },
    markers: {
      size: 1
    },
    xaxis: {
      categories: ['30m', '1h', '1h30m', '2h', '2h30m', '3h', '3h30m', '4h', '4h30m']
      // title: {
      //   text: 'Hour'
      // }
    },
    yaxis: {
      // title: {
      //   text: 'Temperature'
      // },
      min: 5,
      max: 40 //TODO: get max
    },
    legend: {
      //position: 'top',
      //horizontalAlign: 'right',
      //floating: true,
      //offsetY: -25,
      //offsetX: -5
    }
  };

  return (
    <Box className="detail-view scroll-box" sx={{ pr: 2 }}>
      <Box sx={{ my: 2 }}>
        <Stack direction={'row'} justifyContent="space-between" alignItems={'center'} sx={{ mb: 1 }}>
          <Typography variant="h6">Responses over time</Typography>
        </Stack>
        <ReactApexChart options={overtimeOptions} series={overtimeSeries} type="line" height={450} />
      </Box>
      <Stack spacing={1}>
        <Stack spacing={1}>
          <Stack direction={'row'} spacing={1}>
            {INTERACTION_ACTIONS.map((_ele: any) => (
              <Button key={_ele.keyName} variant="outlined" color={_ele.color} size="small">
                {_ele.languageKey}
              </Button>
            ))}
          </Stack>
          <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <ReactTable8 columns={activeColumns} data={[...activeItems]} paging={{ pageSize: 100 }} />
          </Box>
        </Stack>
        <Stack spacing={1}>
          <Stack direction={'row'} spacing={1}>
            {INTERACTION_ACTIONS.map((_ele: any) => (
              <Button key={_ele.keyName} variant="outlined" color={_ele.color} size="small">
                {_ele.languageKey}
              </Button>
            ))}
          </Stack>
          <Box sx={{ border: `1px solid ${theme.palette.divider}` }}>
            <ReactTable8 columns={blockColumns} data={[...blockItems]} paging={{ pageSize: 100 }} />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Interaction;
