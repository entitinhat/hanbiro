import useMutationPost from '@base/hooks/useMutationPost';
import { BaseResponse } from '@base/types/response';
import { COMMON_BARCODE_GENERATE } from '@settings/preferences/services/graphql/product';

export const useGenerateBarcode = () => {
  const mGenerateBarcode: any = useMutationPost<BaseResponse<any>>(COMMON_BARCODE_GENERATE, 'common_generateBarCode');

  return mGenerateBarcode;
};
