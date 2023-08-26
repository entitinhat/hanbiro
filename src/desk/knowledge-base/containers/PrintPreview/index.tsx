import React, { Suspense, useMemo, useRef, useState } from 'react';
import ReactToPrint from 'react-to-print';
import _, { String } from 'lodash';
import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography, useTheme } from '@mui/material';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import { PageLayoutData } from '@base/types/pagelayout';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import Timeline from '@base/containers/TimeLine';
import Notes from '@base/containers/Notes';
import { useTranslation } from 'react-i18next';

interface PrintPreviewProps {
  title: string;
  isOpen: boolean;
  layoutData: PageLayoutData; // can get from recoil
  onClose?: () => void;
  ignoreFields?: string[];
}

const PRINT_OPTIONS = [
  { label: 'ncrm_desk_knowledge_print_preview_summary', value: 'summary' },
  { label: 'ncrm_desk_knowledge_print_preview_content', value: 'content' },
  { label: 'ncrm_desk_knowledge_print_preview_timeline', value: 'timeline' },
  { label: 'ncrm_desk_knowledge_print_preview_notes', value: 'note' }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, ignoreFields = [], onClose, isOpen, title } = props;
  const { menuSource, menuSourceId } = layoutData;

  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['summary', 'content']);
  const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const viewBasicFields = basicFields.map((_ele: any) => ({ ..._ele, userPermission: { ..._ele.userPermission, isEdit: false } }));
  const contentField = viewBasicFields.find((_ele: any) => _ele.keyName === keyNames.KEY_KNOWLEDGE_BASE_CONTENT);

  const theme = useTheme();
  const { t } = useTranslation();
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
          {t('ncrm_desk_knowledge_print_preview_options')}
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
    console.log(viewBasicFields);
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider }}>
        <Typography variant="h5" sx={{ pb: 1, marginTop: '15px' }}>
          {t('ncrm_desk_knowledge_print_preview_summary')}
        </Typography>
        <ViewFields fields={viewBasicFields} ignoreFields={ignoreFields} column={2} />
      </Box>
    );
  };
  // detail
  //TODO change to COntent

  const renderContent = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginTop: '15px' }}>
          {t('ncrm_desk_knowledge_print_preview_content')}
        </Typography>
        <ViewFields fields={[{ ...contentField, config: { ...contentField.config, hideFieldLabel: true } }]} ignoreFields={[]} column={1} />
      </Box>
    );
  };

  // timeline
  const renderTimeline = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginTop: '15px' }}>
          {t('ncrm_desk_knowledge_print_preview_timeline')}
        </Typography>
        <Timeline menuSource={menuSource} menuSourceId={menuSourceId as string} />
      </Box>
    );
  };

  // notes
  const renderNotes = () => {
    return (
      <Box sx={{ borderTop: '1px solid', borderColor: theme.palette.divider, marginTop: '5px' }}>
        <Typography variant="h5" sx={{ marginTop: '15px' }}>
          {t('ncrm_desk_knowledge_print_preview_notes')}
        </Typography>
        <Notes menuSource={menuSource} menuSourceId={menuSourceId as string} hideWriteForm={true} />
      </Box>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    const isShowSummary = selectedOptions.findIndex((_ele: any) => _ele === 'summary') > -1 ? true : false;
    const isShowContent = selectedOptions.findIndex((_ele: any) => _ele === 'content') > -1 ? true : false;
    const isShowTimeline = selectedOptions.findIndex((_ele: any) => _ele === 'timeline') > -1 ? true : false;
    const isShowNote = selectedOptions.findIndex((_ele: any) => _ele === 'note') > -1 ? true : false;

    return (
      <MainCard content border={true}>
        {renderPrintOptions()}
        <Box>
          <Typography variant="h5" sx={{ marginTop: '10px' }}>
            {t('ncrm_desk_knowledge_print_preview_preview')}
          </Typography>
          <Stack sx={{ p: 0.5 }} direction="column" spacing={2} ref={printRef}>
            {isShowSummary && renderSummary()}
            {isShowContent && renderContent()}
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
            <Button size="small" variant="outlined" color="secondary" onClick={onClose}>
              {t('ncrm_common_btn_cancel')}
            </Button>
            <ReactToPrint
              trigger={() => (
                <Button size="small" variant="contained" color="success">
                  {t('ncrm_common_print')}
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
        title={title}
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
