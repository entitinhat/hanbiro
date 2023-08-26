import html2canvas from 'html2canvas';

export async function captureTheImage(element: any, name: string = '') {
  return new Promise((resolve) => {
    try {
      html2canvas(element, { scale: 1 }).then((canvas) => {
        let dataSrc = canvas.toDataURL();
        // setPreviewSrc(dataSrc);
        resolve(dataSrc);
      });
    } catch (e) {
      resolve(null);
    }
  });
}
interface PageUrl {
  html: string;
  css: string;
  js?: string;
  scale?: number;
}
export const getGeneratedPageURL = ({ html, css, scale = 0.1 }: PageUrl) => {
  const getBlobURL = (code: string, type: string) => {
    const blob = new Blob([code], { type });
    return URL.createObjectURL(blob);
  };

  const cssURL = getBlobURL(css, 'text/css');

  const source = `
    <html>
      <head>
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        <style>
          html{
            width: 100%;
            height: 100%;
            transform: scale(${scale});
          }
        </style>
      </head>
      <body >
        ${html || ''}
      </body>
    </html>
  `;

  return getBlobURL(source, 'text/html');
};
