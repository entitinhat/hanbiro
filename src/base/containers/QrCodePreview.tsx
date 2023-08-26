import { useGenerateQRCode } from '@base/hooks/generate-qrcode/useGenerateQRCode';

const CtaQrCodePreview = (props: any) => {
  const { id, linkUrl } = props;

  const params = {
    content: linkUrl,
    width: 150,
    margin: 10,
    scale: 10,
    darkColor: '#00F',
    lightColor: '#0000'
  };

  const { data, isLoading } = useGenerateQRCode(params, linkUrl);

  return <>{!isLoading && <img src={data?.image} style={{ width: 150, height: 150 }} />}</>;
};
export default CtaQrCodePreview;
