import { S3Header } from '@base/types/s3';
import _ from 'lodash';

const STORAGE_PREFIX = 'attachments';
const DOCS_PREFIX = 'documents';
const AUDIOS_PREFIX = 'audios';
const IMAGES_PREFIX = 'images';
const VIDEOS_PREFIX = 'videos';
const OTHERS_PREFIX = 'others';
const DOCS_EXT = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'md', 'txt', 'ppt', 'pptx'];
const AUDIOS_EXT = ['mp3', 'wav'];
const VIDEOS_EXT = [
  '3g2',
  '3gp',
  'aaf',
  'asf',
  'avchd',
  'avi',
  'drc',
  'flv',
  'm2v',
  'm3u8',
  'm4p',
  'm4v',
  'mkv',
  'mng',
  'mov',
  'mp2',
  'mp4',
  'mpe',
  'mpeg',
  'mpg',
  'mpv',
  'mxf',
  'nsv',
  'ogg',
  'ogv',
  'qt',
  'rm',
  'rmvb',
  'roq',
  'svi',
  'vob',
  'webm',
  'wmv',
  'yuv'
];
const IMAGES_EXT = [
  'ase',
  'art',
  'bmp',
  'blp',
  'cd5',
  'cit',
  'cpt',
  'cr2',
  'cut',
  'dds',
  'dib',
  'djvu',
  'egt',
  'exif',
  'gif',
  'gpl',
  'grf',
  'icns',
  'ico',
  'iff',
  'jng',
  'jpeg',
  'jpg',
  'jfif',
  'jp2',
  'jps',
  'lbm',
  'max',
  'miff',
  'mng',
  'msp',
  'nef',
  'nitf',
  'ota',
  'pbm',
  'pc1',
  'pc2',
  'pc3',
  'pcf',
  'pcx',
  'pdn',
  'pgm',
  'PI1',
  'PI2',
  'PI3',
  'pict',
  'pct',
  'pnm',
  'pns',
  'ppm',
  'psb',
  'psd',
  'pdd',
  'psp',
  'px',
  'pxm',
  'pxr',
  'qfx',
  'raw',
  'rle',
  'sct',
  'sgi',
  'rgb',
  'int',
  'bw',
  'tga',
  'tiff',
  'tif',
  'vtf',
  'xbm',
  'xcf',
  'xpm',
  '3dv',
  'amf',
  'ai',
  'awg',
  'cgm',
  'cdr',
  'cmx',
  'dxf',
  'e2d',
  'egt',
  'eps',
  'fs',
  'gbr',
  'odg',
  'svg',
  'stl',
  'vrml',
  'x3d',
  'sxd',
  'v2d',
  'vnd',
  'wmf',
  'emf',
  'art',
  'xar',
  'png',
  'webp',
  'jxr',
  'hdp',
  'wdp',
  'cur',
  'ecw',
  'iff',
  'lbm',
  'liff',
  'nrrd',
  'pam',
  'pcx',
  'pgf',
  'sgi',
  'rgb',
  'rgba',
  'bw',
  'int',
  'inta',
  'sid',
  'ras',
  'sun',
  'tga',
  'heic',
  'heif'
];

export function s3CreateObjectKey(fileName: string): string {
  const nName = fileName.replace(/[^A-Z0-9.]+/gi, '_');
  const ext = nName.split('.').pop()?.toLowerCase();
  let fileType = OTHERS_PREFIX;
  // docs
  if (_.includes(DOCS_EXT, ext)) {
    // docs
    fileType = DOCS_PREFIX;
  } else if (_.includes(AUDIOS_EXT, ext)) {
    //audio
    fileType = AUDIOS_PREFIX;
  } else if (_.includes(IMAGES_EXT, ext)) {
    // images
    fileType = IMAGES_PREFIX;
  } else if (_.includes(VIDEOS_EXT, ext)) {
    // videos
    fileType = VIDEOS_PREFIX;
  }
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  const curDateName = [year, month, day, nName].join('_');
  return [STORAGE_PREFIX, fileType, curDateName].join('/');
}

export function buildS3Headers(headers: S3Header[]): { [key: string]: string } {
  let result = {};
  if (headers && headers.length > 0) {
    headers.map((h) => {
      result = {
        ...result,
        [h.key]: h.value.join(';')
      };
    });
  }
  return result;
}
