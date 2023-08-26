import React, { useState } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//material
import { Box, Divider, Grid, InputLabel, List, ListItem, ListItemIcon, ListItemText, Stack, Typography, useTheme } from '@mui/material';

//project
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@campaign/config/keyNames';
import { CAMPAIGN_CATEGORY_EMAIL, STEP_FIELDS } from '@campaign/config/constants';
import ContentEditor from '@campaign/components/ContentEditor';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useCampaignUpdate from '@campaign/hooks/useCampaignUpdate';
import DatePicker from '@base/components/@hanbiro/Date/DatePicker';
import DateRangePicker from '@base/components/@hanbiro/Date/DateRangePicker';
import { MailOutlined, PhoneOutlined } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { ResponsiveFunnel, Funnel } from '@nivo/funnel';

interface OverviewProps {
  menuSource?: string;
  menuCategory: string;
  menuSourceId: string;
  column?: number;
  layoutData: PageLayoutData;
  ignoreFields?: string[];
  readOnly?: boolean;
}

const Overview = (props: OverviewProps) => {
  const { menuCategory, menuSourceId, ignoreFields = [], layoutData, readOnly } = props;
  const theme = useTheme();

  const funnelData = [
    {
      id: 'step_sent',
      value: 0.402,
      label: 'Sent'
    },
    {
      id: 'step_viewed',
      value: 0.232,
      label: 'Viewed'
    },
    {
      id: 'step_clicked',
      value: 0.153,
      label: 'Clicked'
    },
    {
      id: 'step_add_to_card',
      value: 0.121,
      label: 'Add To Card'
    },
    {
      id: 'step_purchased',
      value: 0.085,
      label: 'Purchased'
    }
  ];

  const overtimeSeries = [
    {
      name: 'Open',
      data: [28, 29, 33, 36, 32, 32, 33]
    },
    {
      name: 'Clicked',
      data: [12, 11, 14, 18, 17, 13, 13]
    }
  ];

  const overtimeOptions = {
    chart: {
      height: 350,
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
    colors: ['#77B6EA', '#545454'],
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
      max: 40
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
    <Box className="detail-view scroll-box">
      <Stack spacing={2}>
        <Stack spacing={2}>
          <Stack direction={'row'} justifyContent="space-between" alignItems={'center'}>
            <Typography variant="h6">Conversion Funnel</Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <InputLabel>Date Range</InputLabel>
              <DateRangePicker />
            </Stack>
          </Stack>
          <Divider />
          <Grid container>
            <Grid item xs={12} lg={6}>
              <Box sx={{ height: 400, width: '100%', margin: '0 auto' }}>
                <ResponsiveFunnel
                  data={funnelData}
                  margin={{ top: 0, right: 20, bottom: 0, left: 20 }}
                  valueFormat=">-.0%"
                  //colors={{ scheme: 'spectral' }}
                  //borderWidth={0}
                  //borderOpacity={0}
                  labelColor={{
                    from: 'color',
                    modifiers: [['darker', 3]]
                  }}
                  shapeBlending={0}
                  //beforeSeparatorLength={0}
                  //beforeSeparatorOffset={0}
                  //afterSeparatorLength={0}
                  //afterSeparatorOffset={0}
                  //currentPartSizeExtension={10}
                  //currentBorderWidth={0}
                  motionConfig="wobbly"
                />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <List
                component="nav"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  p: 0,
                  '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] }
                }}
              >
                <ListItem divider>
                  <ListItemIcon>
                    <MailOutlined color="info" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
                        Click Throught Rate
                      </Typography>
                    }
                    secondary={<Typography color="secondary">50%</Typography>}
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemIcon>
                    <MailOutlined color="warning" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
                        Total Page Views
                      </Typography>
                    }
                    secondary={<Typography color="secondary">500</Typography>}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneOutlined color="disabled" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography color="secondary" sx={{ textTransform: 'uppercase' }}>
                        Unopened
                      </Typography>
                    }
                    secondary={<Typography color="secondary">5</Typography>}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Stack>
        <Stack spacing={2}>
          <Typography variant="h6">Responses over time</Typography>
          <Divider />
          <Stack>
            <ReactApexChart options={overtimeOptions} series={overtimeSeries} type="line" height={350} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Overview;
