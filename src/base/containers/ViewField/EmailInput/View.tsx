import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY } from '@base/config/constant';
import { EmailType } from '@base/types/common';
import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface ViewProps extends CommonViewProps {
  value?: EmailType | EmailType[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  let emails: any = [];
  Array.isArray(value) &&
    value?.map((_ele: any) => {
      if (_ele.label === LABEL_VALUE_PRIMARY) {
        emails.unshift({ ..._ele, name: _ele.email });
      } else {
        emails.push({ ..._ele, name: _ele.email });
      }
    });

  return (
    <>
      <ListTableCellDroplist showAvatar={false} values={emails} />
      {emails.length === 0 && ''}
    </>
  );
};

export default View;
