import usePost from '@base/hooks/usePost';
import { queryKeys } from '@process/config/queryKeys';
import { GET_NEXT_STEPS, GET_STEP } from '@process/services/process';
import { BusinessStep, NextSteps } from '@process/types/process';

export const useNextSteps = (params: any, opts?: any) => {
  const fallback = { steps: [] };

  const { data: nextSteps = fallback } = usePost<NextSteps>([queryKeys.nextSteps, params.id], GET_NEXT_STEPS, params, opts);

  return { nextSteps };
};

export const useStep = (params: any, opts?: any) => {
  const fallback = {} as BusinessStep;

  const { data: step = fallback, isLoading } = usePost<BusinessStep>([queryKeys.getStep, params.stepId], GET_STEP, params, opts);

  return { step, isLoading };
};
