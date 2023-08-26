import { queryKeys } from '@settings/digital/cta/services/queryKeys';

import usePost from '@base/hooks/usePost';
import { COMMON_QR_CODE_CREATE } from '@base/services/graphql/generate-qrcode';

export const useGenerateQRCode = (params: any, linkUrl: string, opt?: any) => {
  const response: any = usePost<any>([queryKeys.generateQRCode, linkUrl, 'ctaQrCode'], COMMON_QR_CODE_CREATE, params, opt);
  return response;
};
