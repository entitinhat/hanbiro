import React, { useMemo, useRef, useState } from 'react';

//third-party
import ReactToPrint from 'react-to-print';
import _ from 'lodash';

//material
import { FormControl, Checkbox, FormControlLabel, FormGroup, Button, Stack, Grid } from '@mui/material';
import { Box } from '@mui/system';

//project
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import QuoteCard from '@base/components/@hanbiro/PreviewCards/QuoteCard';

//menu
import { Quote } from '@quote/types/interfaces';

interface PrintPreviewProps {
  layoutData: Quote[];
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: '1 column', value: 1 },
  { label: '2 columns', value: 2 }
];

const PrintPreviewList = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOption, setSelectedOption] = useState<number>(2);
  //console.log('print data', data);

  //option change
  const handleOptionChange = (option: { label: string; value: number }) => {
    setSelectedOption(option.value);
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
                  key={item.value}
                  value={item.value}
                  control={<Checkbox sx={{ '& .icon.MuiBox-root': { borderRadius: '.25rem' } }} />}
                  label={item.label}
                  checked={item.value == selectedOption}
                  onChange={() => handleOptionChange(item)}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </MainCard>
    );
  };

  // content
  const BodyRender = useMemo(() => {
    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <Box ref={printRef} className="scroll-box" sx={{}}>
          <Grid container sx={{ width: '984px' }}>
            {layoutData.map((item: Quote, index: number) => {
              return (
                <Grid key={index} item xs={12 / selectedOption} sx={{ p: '10px', pageBreakInside: 'avoid' }}>
                  <QuoteCard data={item} columns={selectedOption} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </MainCard>
    );
  }, [layoutData, selectedOption]);

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

export default PrintPreviewList;
