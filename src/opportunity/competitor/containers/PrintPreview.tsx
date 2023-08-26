import React, { useMemo, useRef, useState } from 'react';

//third-party
import ReactToPrint from 'react-to-print';
import _ from 'lodash';

//material
import { FormControl, Checkbox, FormControlLabel, FormGroup, Button, Stack, Grid } from '@mui/material';

//project
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
//import * as keyNames from '@competitor/config/keyNames';
import OpportunityList from './OpportunityList';

interface PrintPreviewProps {
  layoutData: PageLayoutData;
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Opportunity', value: 'opportunity' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary']);
  //console.log('print data', data);
  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const detailFields = layoutData?.layout?.data?.[1]?.children || [];
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
    const onlyViewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
    //hide fields
    const hiddenFields: string[] = [];

    return (
      <MainCard title="Summary">
        <ViewFields fields={onlyViewBasicFields} ignoreFields={hiddenFields} column={2} />
      </MainCard>
    );
  };

  //timeline
  const renderOpportunites = () => {
    return (
      <MainCard title="Opportunity">
        <OpportunityList menuSource={menuSource} menuSourceId={menuSourceId as string} layoutData={null} />
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
    const isShowOpportunity = selectedOptions.includes('opportunity');
    const isShowTimeline = selectedOptions.includes('timeline');
    const isShowNote = selectedOptions.includes('note');

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <MainCard title="Content Preview" contentSX={{ padding: '0px' }}>
          <Stack spacing={2} ref={printRef} sx={{ m: 2 }}>
            {isShowSummary && renderSummary()}
            {isShowOpportunity && renderOpportunites()}
            {isShowTimeline && renderTimeline()}
            {isShowNote && renderNotes()}
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

export default PrintPreview;
