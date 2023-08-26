import axios from 'axios';
import _ from 'lodash';
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import NormalError from './NormalError';

const RetryErrorBoundary = ({ children }: PropsWithChildren<unknown>) => {
  // https://tanstack.com/query/v4/docs/reference/useQueryErrorResetBoundary
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onError={(error, info) => {
        console.log('error=========>', error, info);
        if (
          axios.isAxiosError(error) &&
          ((error?.response?.status === 500 && error?.response?.data === 'CRITICAL_ERROR') || _.includes(['ERR_NETWORK'], error.code))
        ) {
          // 조건에 맞는 에러인 경우 이 ErrorBoundary에서 처리하지 않고
          // 상위 ErrorBoundary 위임을 위해 Throw
          throw error;
        }
      }}
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => {
        return <NormalError error={error} resetErrorBoundary={resetErrorBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;
