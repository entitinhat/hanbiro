import axios from 'axios';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { PropsWithChildren, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import InternalServer from './InternalServer';

const CriticalErrorBoundary = ({ children }: PropsWithChildren<unknown>) => {
  const { reset } = useQueryErrorResetBoundary();
  const [errorUuid, setErrorUuid] = useState<string>();

  return (
    <ErrorBoundary
      onReset={() => {
        reset();
        setErrorUuid(undefined);
      }}
      onError={(error, info) => {
        console.log('critical error', error)
        const errors = error?.message ? null : JSON.parse(error.toString());
        // [{"message":"typeconv: unknown field dd","locations":[{"line":3,"column":5}]}]
        if (
          !_.isArray(errors) &&
          !_.includes(['Network Error'], error?.message) &&
          !(axios.isAxiosError(error) && error?.response?.status === 500 && error?.response?.data === 'CRITICAL_ERROR')
        ) {
          // 이 ErrorBoundary에서 처리하면 안되는 오류의 경우 상위 ErrorBoundary로 위임
          throw error;
        } else {
          // 이 ErrorBoundary에서 처리되는 오류의 경우 UUID 부여 후 사용자에게 노출
          const uuid = nanoid(5);
          setErrorUuid(uuid);
          // sendErrorToErrorTracker(uuid);
        }
      }}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <InternalServer errorUuid={errorUuid} error={error} resetErrorBoundary={resetErrorBoundary} />
      )}
    >
      {children}
    </ErrorBoundary>
  );
};
export default CriticalErrorBoundary;
