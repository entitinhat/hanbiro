import React, { useMemo, useRef, useState } from 'react';

//third-party
import ReactToPrint from 'react-to-print';
import _ from 'lodash';

//material
import { FormControl, Checkbox, FormControlLabel, FormGroup, Button, Stack, Grid } from '@mui/material';

//project
import Timeline from '@base/containers/TimeLine';
import Activities from '@base/containers/Activities';
import Notes from '@base/containers/Notes';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import { SECTION_VIEW_FIELDS } from '@campaign/config/constants';
import TargetMember from '@campaign/containers/TargetMember';

interface PrintPreviewProps {
  layoutData: PageLayoutData;
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Configuration', value: 'detail' },
  { label: 'Target Members', value: 'member' }
  //{ label: 'Timeline', value: 'timeline' },
  //{ label: 'Activities', value: 'activity' },
  //{ label: 'Tickets', value: 'ticket' },
  //{ label: 'Notes', value: 'note' },
];

const PrintPreviewView = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);
  //console.log('print data', data);
  const allFields = layoutData?.layout?.data?.[0]?.children ?? [];

  const { menuSource, menuSourceId } = layoutData;

  //option change
  const handleOptionChange = (option: any) => {
    const newOptions = _.cloneDeep(selectedOptions);
    const iOption = newOptions.indexOf(option);
    if (iOption > -1) {
      const iOption = newOptions.indexOf(option);
      newOptions.splice(iOption, 1);
    } else {
      newOptions.push(option);
    }
    setSelectedOptions(newOptions);
  };

  //print options
  const renderPrintOptions = () => {
    return (
      <MainCard title="Print Options" sx={{ mb: 2 }}>
        <FormControl>
          <FormGroup row aria-label="position">
            {PRINT_OPTIONS.map((item, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={item.value}
                  control={<Checkbox sx={{ '& .icon.MuiBox-root': { borderRadius: '.25rem' } }} />}
                  label={item.label}
                  checked={selectedOptions.includes(item.value)}
                  onChange={() => handleOptionChange(item.value)}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </MainCard>
    );
  };

  //summary
  const renderSummary = () => {
    const basicFields = allFields.filter((_field: any) => SECTION_VIEW_FIELDS[0].includes(_field.keyName));
    const onlyViewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));

    return (
      <MainCard title="Summary">
        <ViewFields fields={onlyViewBasicFields} ignoreFields={[]} column={2} />
      </MainCard>
    );
  };

  //details
  const renderDetails = () => {
    const detailFields = allFields.filter((_field: any) => SECTION_VIEW_FIELDS[1].includes(_field.keyName));
    const onlyViewDetailFields = detailFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));

    return (
      <MainCard title="Details">
        <ViewFields fields={onlyViewDetailFields} ignoreFields={[]} column={2} />
      </MainCard>
    );
  };

  //Target Members
  const renderTargetMembers = () => {
    return (
      <MainCard title="Target Members">
        <TargetMember readOnly={true} menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  //timeline
  const renderTimeline = () => {
    return (
      <MainCard title="Timeline">
        <Timeline menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  //ticket
  const renderNotes = () => {
    return (
      <MainCard title="Notes">
        <Notes menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.includes('summary');
    const isShowDetail = selectedOptions.includes('detail');
    const isShowMember = selectedOptions.includes('member');
    // const isShowTimeline = selectedOptions.includes('timeline');
    // const isShowNote = selectedOptions.includes('note');

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <MainCard title="Content Preview" contentSX={{ padding: '0px' }}>
          <Stack spacing={2} ref={printRef} sx={{ m: 2 }}>
            {isShowSummary && renderSummary()}
            {isShowDetail && renderDetails()}
            {isShowMember && renderTargetMembers()}
            {/* {isShowTimeline && renderTimeline()}
            {isShowActivity && renderActivity()}
            {isShowTicket && renderTickets()}
            {isShowNote && renderNotes()} */}
          </Stack>
        </MainCard>
      </MainCard>
    );
  }, [layoutData, selectedOptions]);

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
                <Button size="small" variant="contained" color="success">
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
    <MiModal
      title={'Print Preview'}
      isOpen={isOpen}
      size="md"
      fullScreen={false}
      onClose={() => onClose && onClose()}
      footer={FooterRender}
    >
      {BodyRender}
    </MiModal>
  );
};

export default PrintPreviewView;
