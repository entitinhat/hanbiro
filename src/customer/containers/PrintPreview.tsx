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
import * as keyNames from '@customer/config/keyNames';
import Tickets from '@customer/containers/CustomerTicket';

interface PrintPreviewProps {
  layoutData: PageLayoutData;
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Details', value: 'detail' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Activities', value: 'activity' },
  { label: 'Tickets', value: 'ticket' },
  { label: 'Notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);
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

    return (
      <MainCard title="Summary">
        {/* <Typography variant="h5" sx={{ pb: 1 }}>
          Summary
        </Typography> */}
        <ViewFields fields={onlyViewBasicFields} ignoreFields={[keyNames.KEY_NAME_CUSTOMER_PHOTO]} column={2} />
      </MainCard>
    );
  };

  //details
  const renderDetails = () => {
    let ignoreFields: string[] = [];
    const contactTypeField = basicFields?.find((_field: any) => _field?.keyName === keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE);
    if (contactTypeField?.data?.keyName === 'CONTACT_TYPE_EMPLOYEE') {
      const showFields = [
        //keyNames.KEY_NAME_CUSTOMER_FAX,
        keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES,
        keyNames.KEY_NAME_CUSTOMER_DESCRIPTION
      ];
      ignoreFields = detailFields.filter((_field: any) => !showFields.includes(_field.keyName)).map((_ele: any) => _ele.keyName);
    } else {
      ignoreFields = [
        keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO,
        keyNames.KEY_NAME_CUSTOMER_CREATED_BY,
        keyNames.KEY_NAME_CUSTOMER_CREATED_AT,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_BY,
        keyNames.KEY_NAME_CUSTOMER_UPDATED_AT
        //keyNames.KEY_NAME_CUSTOMER_CURRENT_DEBIT,
        //keyNames.KEY_NAME_CUSTOMER_UNUSED_CREDIT,
        //keyNames.KEY_NAME_CUSTOMER_AMOUNT_RECEIVED,
      ];
    }
    const onlyViewDetailFields = detailFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));

    return (
      <MainCard title="Details">
        <ViewFields fields={onlyViewDetailFields} ignoreFields={ignoreFields} column={2} />
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

  //activity
  const renderActivity = () => {
    return (
      <MainCard title="Activities">
        <Activities menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </MainCard>
    );
  };

  //ticket
  const renderTickets = () => {
    return (
      <MainCard title="Tickets">
        <Tickets menuSourceId={menuSourceId as string} />
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
    const isShowTimeline = selectedOptions.includes('timeline');
    const isShowNote = selectedOptions.includes('note');
    const isShowActivity = selectedOptions.includes('activity');
    const isShowTicket = selectedOptions.includes('ticket');

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <MainCard title="Content Preview" contentSX={{ padding: '0px' }}>
          <Stack spacing={2} ref={printRef} sx={{ m: 2 }}>
            {isShowSummary && renderSummary()}
            {isShowDetail && renderDetails()}
            {isShowTimeline && renderTimeline()}
            {isShowActivity && renderActivity()}
            {isShowTicket && renderTickets()}
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

export default PrintPreview;
