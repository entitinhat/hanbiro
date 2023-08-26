import React, { useMemo, useRef, useState } from 'react';

//third-party
import ReactToPrint from 'react-to-print';
import _ from 'lodash';

//material
import { FormControl, Checkbox, FormControlLabel, FormGroup, Button, Stack, Grid } from '@mui/material';

//project
import Timeline from '@base/containers/TimeLine';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
import * as keyNames from '@desk/ticket/config/keyNames';
import Tickets from '@public-page/site/containers/desk/TicketView/Tickets';
import { getFieldLayoutDataByKeyName } from '@base/utils/helpers/pageLayoutUtils';
import Feedback from './TicketView/Detail/Feedback';

interface PrintPreviewProps {
  token: string;
  layoutData: PageLayoutData;
  ticketCustomer: any;
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: 'Summary', value: 'summary' },
  { label: 'Details', value: 'detail' },
  { label: 'Timeline', value: 'timeline' },
  { label: 'Tickets', value: 'ticket' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { token, layoutData, ticketCustomer, isOpen, onClose } = props;
  //state
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);
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
    //hide fields
    const hiddenFields: string[] = [
      keyNames.KEY_TICKET_SUBJECT,
      keyNames.KEY_TICKET_PRODUCT,
      keyNames.KEY_TICKET_CUSTOMER,
      keyNames.KEY_TICKET_CONTACT,
      keyNames.KEY_TICKET_CONTENT,
      keyNames.KEY_TICKET_ASSIGN_GROUP,
      keyNames.KEY_TICKET_ASSIGN_USER,
      keyNames.KEY_TICKET_CC_USERS,
      keyNames.KEY_TICKET_CHANNEL,
      keyNames.KEY_TICKET_PROCESS,
      keyNames.KEY_TICKET_CREATED_AT,
      keyNames.KEY_TICKET_UPDATED_AT,
      keyNames.KEY_TICKET_CREATED_BY,
      keyNames.KEY_TICKET_UPDATED_BY
    ];
    const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];
    const onlyViewBasicFields = basicFields
      .filter((_field: any) => !hiddenFields.includes(_field.keyName))
      .map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));

    return (
      <MainCard title="Summary">
        <ViewFields fields={onlyViewBasicFields} ignoreFields={[]} column={2} />
      </MainCard>
    );
  };

  //details
  const renderDetails = () => {
    let ignoreFields: string[] = [];
    const contentField = getFieldLayoutDataByKeyName(layoutData, keyNames.KEY_TICKET_CONTENT);
    const onlyViewContentField = { ...contentField, userPermission: { isEdit: false } };
    const subjectField = getFieldLayoutDataByKeyName(layoutData, keyNames.KEY_TICKET_SUBJECT);

    return (
      <MainCard title="Details">
        <ViewFields
          fields={[{ ...onlyViewContentField, config: { ...onlyViewContentField.config, hideFieldLabel: true } }]}
          ignoreFields={ignoreFields}
          column={2}
        />
        <Feedback token={token as string} subject={subjectField?.data || ''} menuSourceId={menuSourceId as string} isEdit={false} />
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
  const renderTickets = () => {
    return (
      <MainCard title="Tickets">
        <Tickets token={token} menuSourceId={menuSourceId as string} ticketCustomer={ticketCustomer} />
      </MainCard>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.includes('summary');
    const isShowDetail = selectedOptions.includes('detail');
    const isShowTimeline = selectedOptions.includes('timeline');
    const isShowTicket = selectedOptions.includes('ticket');

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <MainCard title="Content Preview" contentSX={{ padding: '0px' }}>
          <Stack spacing={2} ref={printRef} sx={{ m: 2 }}>
            {isShowSummary && renderSummary()}
            {isShowDetail && renderDetails()}
            {isShowTimeline && renderTimeline()}
            {isShowTicket && renderTickets()}
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
