import React, { Suspense, useMemo, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import _, { String } from 'lodash';

import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography, useTheme } from '@mui/material';

import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewDetail from '@activity/containers/ViewDetail';
import { PageLayoutData } from '@base/types/pagelayout';
import * as keyNames from '@desk/ticket/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import Comments from '../TicketComment';

interface PrintPreviewProps {
  isOpen: boolean;
  layoutData: PageLayoutData; // can get from recoil
  onClose?: () => void;
  ignoreFields?: string[];
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Content', value: 'content' },
  { label: 'Comments', value: 'comment' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, ignoreFields = [], onClose, isOpen } = props;
  const { menuSource, menuSourceId } = layoutData;

  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);

  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const viewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
  const contentField = viewBasicFields.find((_ele: any) => _ele.keyName === keyNames.KEY_TICKET_CONTENT);
  const viewBasicFieldsWithoutContent = viewBasicFields.filter((_ele: any) => _ele.keyName !== keyNames.KEY_TICKET_CONTENT);
  const theme = useTheme();

  console.log('layoutData', layoutData);
  const handelChangeOption = (option: string) => {
    const newOptions = _.cloneDeep(selectedOptions);
    const iOption = newOptions.indexOf(option);
    if (iOption >= 0) {
      const iOption = newOptions.indexOf(option);
      newOptions.splice(iOption, 1);
    } else {
      newOptions.push(option);
    }
    setSelectedOptions(newOptions);
  };

  // print options
  const renderPrintOptions = () => {
    return (
      <Box sx={{ border: '1px solid', borderColor: theme.palette.divider }}>
        <Typography variant="h5" sx={{ padding: '15px 20px', borderBottom: '1px solid', borderColor: theme.palette.divider }}>
          Print Options
        </Typography>
        <Box sx={{ pl: 0.5 }}>
          <Stack direction={'row'}>
            {PRINT_OPTIONS?.map((item: any, index: number) => {
              return (
                <FormControlLabel
                  sx={{ padding: '20px' }}
                  key={index}
                  checked={selectedOptions?.indexOf(item.value) >= 0}
                  control={<Checkbox />}
                  onChange={() => handelChangeOption(item.value)}
                  label={item.label}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    );
  };

  // summary
  const renderSummary = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider }}>
        <Typography variant="h5" sx={{ pb: 1, marginY: '15px' }}>
          Summary
        </Typography>
        <ViewFields
          fields={viewBasicFieldsWithoutContent}
          ignoreFields={[
            keyNames.KEY_TICKET_CONTENT,
            keyNames.KEY_TICKET_CONTACT,
            keyNames.KEY_TICKET_PRODUCT,
            keyNames.KEY_TICKET_ASSIGN_USER,
            keyNames.KEY_TICKET_CC_USERS,
            keyNames.KEY_TICKET_CHANNEL
          ]}
          column={2}
        />
      </Box>
    );
  };

  // Content/detail
  const renderContent = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginY: '15px' }}>
          Content
        </Typography>
        <ViewFields fields={[{ ...contentField, config: { ...contentField.config, hideFieldLabel: true } }]} ignoreFields={[]} column={1} />
      </Box>
    );
  };
  // comment
  const renderComments = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginY: '15px' }}>
          Comment
        </Typography>
        <Comments menuSourceId={menuSourceId as string} menuSource={menuSource} />
      </Box>
    );
  };

  // timeline
  const renderTimeline = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginY: '15px' }}>
          Timeline
        </Typography>
        <Timeline menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </Box>
    );
  };

  // notes
  const renderNotes = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginY: '15px' }}>
          Notes
        </Typography>
        <Notes menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </Box>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.findIndex((_ele: any) => _ele === 'summary') > -1 ? true : false;
    const isShowContent = selectedOptions.findIndex((_ele: any) => _ele === 'content') > -1 ? true : false;
    const isShowComment = selectedOptions.findIndex((_ele: any) => _ele === 'comment') > -1 ? true : false;
    const isShowTimeline = selectedOptions.findIndex((_ele: any) => _ele === 'timeline') > -1 ? true : false;
    const isShowNote = selectedOptions.findIndex((_ele: any) => _ele === 'note') > -1 ? true : false;

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <Box>
          <Typography variant="h5" sx={{ marginY: '10px' }}>
            Preview
          </Typography>
          <Stack sx={{ p: 0.5 }} direction="column" spacing={2} ref={printRef}>
            {isShowSummary && renderSummary()}
            {isShowContent && renderContent()}
            {isShowTimeline && renderTimeline()}
            {isShowComment && renderComments()}
            {isShowNote && renderNotes()}
          </Stack>
        </Box>
      </MainCard>
    );
  }, [layoutData, selectedOptions, ignoreFields]);

  // render footer
  const FooterRender = useMemo(() => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item></Grid>
        <Grid item>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button size="small" color="secondary" variant="outlined" onClick={onClose}>
              Close
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button size="small" variant="contained" color="primary">
                  Print
                </Button>
              )}
              content={() => printRef.current}
              //onBeforeGetContent={() => setIsLoading(true)}
              //onBeforePrint={() => setIsLoading(false)}
              bodyClass="pd-t-30"
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, []);

  return (
    <Suspense fallback={<></>}>
      <MiModal
        title={'Ticket Print Preview'}
        isOpen={isOpen}
        size="md"
        fullScreen={false}
        onClose={() => {
          onClose && onClose();
        }}
        footer={FooterRender}
      >
        {isOpen && <>{BodyRender}</>}
      </MiModal>
    </Suspense>
  );
};

export default PrintPreview;
