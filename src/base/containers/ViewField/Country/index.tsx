import React, { lazy, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';
import { Country } from '@base/types/setting';
import { availableCountrySelector } from '@base/store/selectors/app';

interface CountryProps extends CommonViewFieldProps {
  value: string;
}

const CountryViewField = (props: CountryProps) => {
  const { value } = props;

  const availableCountries: Country[] = useRecoilValue(availableCountrySelector);
  const country = availableCountries?.find((v: Country) => {
    return v?.isoCode2 == value;
  });

  return <CommonViewField {...props} componentView={View} componentEdit={Edit} value={country} />;
};

export default CountryViewField;
