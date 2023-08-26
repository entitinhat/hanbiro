import React, { lazy, Suspense } from 'react';

const Doc = lazy(() => import('./js/doc'));
const Css = lazy(() => import('./js/css'));
const Avi = lazy(() => import('./js/avi'));
const Jpg = lazy(() => import('./js/jpg'));
const Mov = lazy(() => import('./js/mov'));
const Mp3 = lazy(() => import('./js/mp3'));
const Pdf = lazy(() => import('./js/pdf'));
const Png = lazy(() => import('./js/png'));
const Ppt = lazy(() => import('./js/ppt'));
const Txt = lazy(() => import('./js/txt'));
const Wav = lazy(() => import('./js/wav'));
const Xls = lazy(() => import('./js/xls'));
const Zip = lazy(() => import('./js/zip'));
const Etc = lazy(() => import('./js/etc'));
const Html = lazy(() => import('./js/html'));

const getFileByType = (type: string) => {
  switch (type) {
    case 'avi':
      return Avi;
    case 'css':
      return Css;
    case 'doc':
    case 'docx':
      return Doc;
    case 'html':
      return Html;
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return Jpg;
    case 'mp4':
    case 'flv':
    case 'mov':
      return Mov;
    case 'mp3':
      return Mp3;
    case 'pdf':
      return Pdf;
    case 'png':
      return Png;
    case 'ppt':
    case 'pptx':
      return Ppt;
    case 'txt':
      return Txt;
    case 'wav':
      return Wav;
    case 'xls':
    case 'xlsx':
      return Xls;
    case 'zip':
      return Zip;
    default:
      return Etc;
  }
};

interface SvgIconsProps {
  type?: string;
}

const SvgIcons = (props: SvgIconsProps) => {
  const { type } = props;
  const File = getFileByType(type || '');

  return (
    <Suspense fallback={<div />}>
      <File />
    </Suspense>
  );
};

export default SvgIcons;
