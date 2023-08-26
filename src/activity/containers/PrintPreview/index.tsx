import React, { Suspense, useMemo, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import _, { String } from 'lodash';

import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography } from '@mui/material';

import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import ViewDetail from '@activity/containers/ViewDetail';
import { PageLayoutData } from '@base/types/pagelayout';

import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import { useTranslation } from 'react-i18next';
import { title } from 'process';

interface PrintPreviewProps {
  isOpen: boolean;
  layoutData: PageLayoutData; // can get from recoil
  onClose?: () => void;
  ignoreFields?: string[];
}

const PRINT_OPTIONS = [
  { label: 'ncrm_activity_summary', value: 'summary' },
  { label: 'ncrm_activity_detail', value: 'detail' },
  { label: 'ncrm_activity_timeline', value: 'timeline' },
  { label: 'ncrm_activity_notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, ignoreFields = [], onClose, isOpen } = props;
  const { menuSource, menuSourceId } = layoutData;
  const { t } = useTranslation();

  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'detail']);

  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const detailFields = layoutData?.layout?.data?.[1]?.children || [];

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
      <Box>
        <Typography variant="h5">{t('ncrm_activity_print_options')}</Typography>
        <Box sx={{ pl: 0.5 }}>
          <Stack direction={'row'}>
            {PRINT_OPTIONS?.map((item: any, index: number) => {
              return (
                <FormControlLabel
                  key={index}
                  checked={selectedOptions?.indexOf(item.value) >= 0}
                  control={<Checkbox />}
                  onChange={() => handelChangeOption(item.value)}
                  label={t(item.label)}
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
    const viewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
    return (
      <Box>
        <Typography variant="h5" sx={{ pb: 1 }}>
          {t('ncrm_activity_summary')}
        </Typography>
        <ViewFields fields={viewBasicFields} ignoreFields={ignoreFields} column={2} />
      </Box>
    );
  };

  // detail
  const renderDetail = () => {
    return (
      <Box>
        <Typography variant="h5">{t('ncrm_activity_detail')}</Typography>
        <ViewDetail menuSource={menuSource} menuSourceId={menuSourceId as string} layoutData={layoutData} ignoreFields={ignoreFields} />
      </Box>
    );
  };

  // timeline
  const renderTimeline = () => {
    return (
      <Box>
        <Typography variant="h5">{t('ncrm_activity_timeline')}</Typography>
        <Timeline menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </Box>
    );
  };

  // notes
  const renderNotes = () => {
    return (
      <Box>
        <Typography variant="h5">{t('ncrm_activity_notes')}</Typography>
        <Notes menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </Box>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.findIndex((_ele: any) => _ele === 'summary') > -1 ? true : false;
    const isShowDetail = selectedOptions.findIndex((_ele: any) => _ele === 'detail') > -1 ? true : false;
    const isShowTimeline = selectedOptions.findIndex((_ele: any) => _ele === 'timeline') > -1 ? true : false;
    const isShowNote = selectedOptions.findIndex((_ele: any) => _ele === 'note') > -1 ? true : false;

    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <Box>
          <Typography variant="h5">{t('ncrm_activity_preview')}</Typography>
          <Stack sx={{ p: 0.5 }} direction="column" spacing={2} ref={printRef}>
            {isShowSummary && renderSummary()}
            {isShowDetail && renderDetail()}
            {isShowTimeline && renderTimeline()}
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
            <Button size="small" color="error" onClick={onClose}>
              {t('ncrm_activity_cancel')}
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button size="small" variant="contained">
                  {t('ncrm_activity_print')}
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
        title={t('ncrm_activity_print_preview') as string}
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
