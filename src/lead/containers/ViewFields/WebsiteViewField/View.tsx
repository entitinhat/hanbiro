import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { LABEL_VALUE_CUSTOM } from '@base/config/constant';
import { WebsiteType } from '@base/types/common';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface ViewProps extends CommonViewProps {
  value?: WebsiteType | WebsiteType[] | string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { value, componentProps } = props;
  console.log('props', props);
  const renderSingle = () => {
    const nVal = value as WebsiteType;
    const url = nVal.protocol + nVal.website;

    return (
      <Stack spacing={1} direction="row" alignItems="center">
        <Box 
          component={'a'}
          href={url} 
          target="_blank" 
          onClick={(e : React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.stopPropagation()}
          sx={{
            textDecoration: 'none',
            color: theme.palette.link
          }}
        >
          {url}
        </Box>
      </Stack>
    );
  };
  return (
    <Box>
      {Array.isArray(value) && value.length > 0 ? (
        value.map((_item: WebsiteType, index: number) => {
          const labelKey = _item.label.label || '';
          const url = _item.protocol + _item.website;
          return (
            <Stack key={index} spacing={1} direction="row" alignItems="center">
              {labelKey && !componentProps?.disableLabel && (
                <Chip size="small" color="lime" label={labelKey == LABEL_VALUE_CUSTOM ? _item.labelValue : t(_item.label.languageKey)} />
              )}
              <Box component={'a'} href={url} target="_blank">
                {url}
              </Box>
            </Stack>
          );
        })
      ) : (
        <>{value !== '' ? renderSingle() : <em>(none)</em>}</>
      )}
    </Box>
  );
};

export default View;
