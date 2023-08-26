import React, { memo, useMemo } from 'react';
import _ from 'lodash';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import TextViewField from '@base/containers/ViewField/Text';

const ViewField = (props: CommonViewFieldProps) => {
  const { keyName, value, config, onSave } = props;
  const Component = config?.component ?? null;

  const ViewFieldMemo = useMemo(() => {
    return (
      <>
        {Component ? (
          <Component {...props} {...config?.componentProps} />
        ) : (
          <TextViewField {...props} {...config?.componentProps} value={_.isString(value) ? value : JSON.stringify(value)} />
        )}
      </>
    );
  }, [keyName, value, onSave]);

  return <React.Suspense fallback={<></>}>{ViewFieldMemo}</React.Suspense>;
};

export default memo(ViewField);
