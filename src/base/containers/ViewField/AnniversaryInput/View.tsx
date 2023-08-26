import React from 'react';

//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//project
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_CUSTOM_ANNI } from '@base/config/constant';

//local
import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import { AnniversaryType } from '@base/types/common';

interface ViewProps extends CommonViewProps {
  value?: AnniversaryType | AnniversaryType[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box>
      {Array.isArray(value) && value.length > 0 ? (
        value.map((_item: AnniversaryType, index: number) => {
          const labelKey = _item.label.label || '';
          return (
            <Stack key={index} spacing={1} direction="row" alignItems="center" sx={{ mb: 0.5 }}>
              {labelKey && (
                <Chip
                  size="small"
                  color="lime"
                  label={labelKey == LABEL_VALUE_CUSTOM_ANNI ? _item.labelValue : t(_item.label.languageKey)}
                />
              )}
              <Typography variant="inherit" color="primary">
                {_item.anniversary?.slice(0, 10)}
              </Typography>
            </Stack>
          );
        })
      ) : (
        <em>(none)</em>
      )}
    </Box>
  );
};

export default View;
