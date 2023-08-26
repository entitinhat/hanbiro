import React from 'react';

import TextView from '@base/containers/ViewField/Text/View';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { keyName, value, componentProps } = props;
  const shortDate = value?.length > 0 ? value.slice(0, 10) : '';

  const showTimeInput = componentProps?.showTimeInput ?? false;
  const dateFormat = componentProps?.dateFormat ?? undefined;
  const humanize = componentProps?.humanize ?? true;

  return (
    <>
      {shortDate !== '' && shortDate !== '0001-01-01' && shortDate !== '1970-01-01' ? (
        <TextView value={convertDateTimeServerToClient({ date: value, isTime: showTimeInput, humanize: humanize })} />
      ) : (
        ''
      )}
    </>
  );
};
export default View;
