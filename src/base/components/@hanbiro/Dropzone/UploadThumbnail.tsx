import { useMemo, useState } from 'react';

interface UploadThumbnailProps {
  preview: string;
  maxWidth: number;
}
const UploadThumbnail = (props: UploadThumbnailProps) => {
  const { preview, maxWidth } = props;
  const [curSize, setCurSize] = useState<{ height: number; width: number }>({ height: 0, width: 0 });
  var img = document.createElement('img');
  img.src = preview;
  if (curSize.width === 0)
    img.onload = function () {
      const ratio = img.width / img.height;
      if (img.width > img.height) {
        setCurSize({
          width: maxWidth,
          height: maxWidth / ratio
        });
      } else {
        setCurSize({
          width: maxWidth,
          height: maxWidth * ratio
        });
      }
    };
  if (curSize.width !== 0 && curSize.height !== 0) return <img src={img.src} width={curSize.width} height={curSize.height} />;
  else return <></>;
};
export default UploadThumbnail;
