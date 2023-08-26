import React from 'react';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { IconType } from '@base/types/app';
import { Typography, Box, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface NoDataProps {
  icon?: string;
  iconType?: IconType;
  size?: number;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
  label?: string;
  labelButton?: string;
  onClick?: () => void;
  ComponentButton?: any;
}

const NoData = (props: NoDataProps) => {
  const {
    icon = 'Inventory2Outlined',
    iconType = 'material',
    size = 40,
    fontSize = 'large',
    label,
    labelButton,
    onClick,
    ComponentButton
  } = props;
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        color: '#c0ccda'
      }}
    >
      <FormIcon icon={icon} iconType={iconType} size={size} fontSize={fontSize} />
      <Typography noWrap sx={{ my: '8px' }}>
        {label || t('ncrm_common_no_record')}
      </Typography>
      <Box sx={{ display: 'flex' }}>
        {ComponentButton}
        {labelButton && (
          <Button size="small" color="primary" variant="outlined" onClick={onClick}>
            <Add /> {labelButton || t('ncrm_common_btn_add')}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default NoData;
