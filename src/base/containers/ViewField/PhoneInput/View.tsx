import React from 'react';

//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//project
import { LABEL_VALUE_CUSTOM, LABEL_VALUE_PRIMARY } from '@base/config/constant';
import { PhoneType } from '@base/types/common';

//local
import { default as TextView } from '../Text/View';
import { CommonViewProps } from '../Common/interface';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface ViewProps extends CommonViewProps {
  value?: PhoneType | PhoneType[] | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  let phones: any = [];
  Array.isArray(value) &&
    value?.map((_ele: any) => {
      if (_ele.label === LABEL_VALUE_PRIMARY) {
        phones.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
      } else {
        phones.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.phoneNumber}` });
      }
    });

  return (
    <>
      <ListTableCellDroplist showAvatar={false} values={phones} />
      {phones.length === 0 && ''}
    </>
  );
};

export default View;
