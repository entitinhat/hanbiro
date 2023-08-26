import React, { useState, useEffect } from 'react';

import { Settings } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput, styled } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SKUGenerator from '@settings/preferences/containers/SKUGenerator';
import MainCard from '@base/components/App/MainCard';
import MiModal from '@base/components/@hanbiro/MiModal';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface SkuInputProps {
  value: string;
  defaultSetting: any;
  onChange?: (val: string) => void;
  editManual?: boolean;
  manualValue?: string;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  paddingRight: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'space-between'
}));

const ProductSKUInput = (props: SkuInputProps) => {
  const {
    defaultSetting, //default setting
    value: initValue, //initial sku
    onChange = null,
    editManual,
    manualValue
  } = props;


  const [isOpenSKU, setOpenSKU] = useState<boolean>(false);

  const handleChange = (nVal: string) => {
    onChange && onChange(nVal);
  };

  // render
  return (
    <>
      <OutlinedInput
        fullWidth
        sx={{ minWidth: 150, pr: 0, '& .MuiOutlinedInput-input': { pr: 0 } }}
        id="SKU-generator"
        disabled={!editManual}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              color={'secondary'}
              onClick={() => {
                setOpenSKU(true);
              }}
            >
              <Settings fontSize="small" />
            </IconButton>
          </InputAdornment>
        }
        value={editManual ? manualValue : initValue}
        onChange={(e: any) => {
          handleChange(e?.target.value);
        }}
      />
      {isOpenSKU ? (
        <MiModal
          anchor={'right'}
          title={<SpanLang keyLang={`ncrm_common_sku_generator`} />}
          isOpen={isOpenSKU}
          size="md"
          fullScreen={false}
          onClose={() => setOpenSKU(false)}
        >
          <SKUGenerator isDrawer 
            sx={{ 
              border: 'none',
              borderRadius: 0,
              p: 2,
              m: 0
            }} 
            />
        </MiModal>
      ) : (
        ''
      )}
    </>
  );
};

export default ProductSKUInput;
