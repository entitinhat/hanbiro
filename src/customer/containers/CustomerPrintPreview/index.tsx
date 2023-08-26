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
import CustomerCard from '@base/components/@hanbiro/PreviewCards/CustomerCard';
import { Customer } from '@customer/types/interface';

interface PrintPreviewProps {
  layoutData: Customer[];
  isOpen: boolean;
  onClose?: () => void;
}

const PRINT_OPTIONS = [
  { label: '1 column', value: 0 },
  { label: '2 columns', value: 1 }
];

const PrintPreview = (props: PrintPreviewProps) => {
  const { layoutData, isOpen, onClose } = props;
  const printRef = useRef<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<number>(1);
  //console.log('print data', data);

  //option change
  const handleOptionChange = (option: { label: string; value: number }) => {
    setSelectedOptions(option.value);
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
                  checked={idx == selectedOptions}
                  onChange={() => handleOptionChange(item)}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </MainCard>
    );
  };
  console.log('mode xs:', selectedOptions);
  // content
  const BodyRender = useMemo(() => {
    return (
      <MainCard content border={false}>
        {renderPrintOptions()}
        <Box ref={printRef} className="scroll-box" sx={{}}>
          <Grid container sx={{ width: '984px' }}>
            {layoutData.map((customer: Customer, index: number) => {
              return (
                <Grid key={index} item xs={12 / (selectedOptions + 1)} sx={{ p: '10px', pageBreakInside: 'avoid' }}>
                  <CustomerCard data={customer} columns={selectedOptions} />
                </Grid>
              );
            })}
          </Grid>
        </Box>
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
