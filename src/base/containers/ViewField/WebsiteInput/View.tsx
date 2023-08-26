import React from 'react';
import { useTranslation } from 'react-i18next';

import { Box, Chip, Stack, Typography } from '@mui/material';
import { LABEL_VALUE_CUSTOM } from '@base/config/constant';
import { WebsiteType } from '@base/types/common';

import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface ViewProps extends CommonViewProps {
  value?: WebsiteType | WebsiteType[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  let websites: any = [];
  Array.isArray(value) &&
    value?.map((_ele: any) => {
      if (_ele !== null) {
        websites.push({ ..._ele, name: _ele?.website });
      }
    });
  return (
    <>
      {Array.isArray(value) ? (
        <>
          <ListTableCellDroplist showAvatar={false} values={websites} />
          {websites.length === 0 && ''}
        </>
      ) : (
        <Typography>{value?.website}</Typography>
      )}
    </>
  );
};

export default View;
