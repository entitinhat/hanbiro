import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { isObject, padStart } from 'lodash';
import { EDateRangeType } from '@base/types/app';
import { Currency, NumberSetting } from '@base/types/common';
import { LabelValue, LabelValueData } from '@base/types/app';
import { convertDateFormat, replaceSeparator } from './dateUtils';

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const nanoid = (length = 5) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
  let text = '';

  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

//render file type icon
export const getFileIcon = (filename: string): any => {
  let iconType = 'txt';

  if (filename.length > 0) {
    const temps = filename.split('.'); //[1];
    let fileExt = 'txt';

    if (temps.length == 2) {
      fileExt = temps[1];
    }

    switch (fileExt.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
        iconType = 'jpg';
        break;
      case 'png':
        iconType = 'png';
        break;
      case 'gif':
        iconType = 'gif';
        break;
      case 'txt':
        iconType = 'txt';
        break;
      case 'xlsx':
      case 'xls':
        iconType = 'xlsx';
        break;
      case 'docx':
      case 'doc':
        iconType = 'docx';
        break;
      case 'pptx':
      case 'ppt':
        iconType = 'pptx';
        break;
      case 'pdf':
        iconType = 'pdf';
        break;
      case 'zip':
        iconType = 'zip';
        break;
      default:
        iconType = 'txt';
        break;
    }
  }
  return iconType;
};

export function humanFileSize(size: number) {
  if (size === 0) return '0 B';
  let i = Math.floor(Math.log(size) / Math.log(1024));
  let nSize = (size / Math.pow(1024, i)).toFixed(2);

  return nSize + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}

export function arr2Dic(arrObjects: any = [], key = 'id') {
  if (arrObjects.length === 0) return {};
  return arrObjects.reduce((a: any, b: any) => ((a[b[key]] = b), a), {});
}

interface IDateTimeFormat {
  isTime?: boolean;
  isShortDate?: boolean;
  isShortTime?: boolean;
}

export const getDateTimeFormat = (params: IDateTimeFormat = {}): string => {
  let { isTime = true, isShortDate = false, isShortTime = false } = params;

  let dateFormatString = '';
  const dateFormat = window?.dateFormat?.dateFormat || 'M/d/yyyy';
  const dateSeparator = window?.dateFormat?.dateSeparator || '/';
  const timeFormat = window?.timeFormat?.timeFormat || 'hh:mm tt';
  dateFormatString = replaceSeparator(dateFormat, dateSeparator);
  if (isTime) {
    dateFormatString = [dateFormatString, timeFormat.replace('tt', 'a')].join(' ');
  }

  // let dateFormat = 'Y/m/d';
  // let timeFormat = 'H:i:s';
  // let dateFormatString = '';

  // if (dateFormat) {
  //   dateFormatString = toDateFormatString(dateFormat, isShortDate);
  // }
  // if (isTime && timeFormat) {
  //   dateFormatString = `${dateFormatString} ${toTimeFormatString(timeFormat, isShortTime)}`;
  // }

  return dateFormatString;
};

/**
 * Format param datetime for server
 * @param {*} param
 * - date: input date type string or date object
 * - formatInput: format of the input date type is string. Default is YYYY-MM-DD HH:mm:ss
 * @returns
 */

export const convertDateTimeClientToServer = ({ date = '', formatInput = '' }: any = {}): any => {
  let params = { isTime: true, isShortDate: false, isShortTime: false };
  let formatInputValid = formatInput ? formatInput : getDateTimeFormat(params);

  //console.log('...convertDateTimeClientToServer...', formatInputValid, date);

  try {
    if (typeof date == 'string') {
      return dayjs(date, formatInputValid).toISOString();
    } else {
      return dayjs(date).toISOString();
    }
  } catch (error) {
    return null;
  }
};

export const toTimeFormatString = (time_format: string, isShortTime: boolean): string => {
  let timeFormatStr = time_format;
  let isShort = isShortTime || false;

  if (time_format === 'H:i:s') {
    if (isShort) timeFormatStr = 'HH:mm';
    else timeFormatStr = 'HH:mm:ss';
  }
  return timeFormatStr;
};

export const toDateFormatString = (dateFormat: string, isShortDate: boolean): string => {
  let dateFormatStr = dateFormat;
  let isShort = isShortDate || false;

  if (dateFormat === 'Y/m/d') {
    if (isShort) dateFormatStr = 'YYY/MM/DD';
    else dateFormatStr = 'YYYY/MM/DD';
  } else if (dateFormat === 'm/d/Y') {
    if (isShort) dateFormatStr = 'MM/DD/YY';
    else dateFormatStr = 'MM/DD/YYYY';
  } else if (dateFormat === 'd/m/Y') {
    if (isShort) dateFormatStr = 'DD/MM/YY';
    else dateFormatStr = 'DD/MM/YYYY';
  }
  return dateFormatStr;
};

/**
 * Get date time for display as format user
 * @param {*} param0
 * - date: input date type string or date object
 * - formatInput: format of the input date type is string. Default is YYYY-MM-DD HH:mm:ss
 * - formatOutput: format output string. Default is user format
 * - isTime: display time or not
 * - humanize: humanize to read (xxx ago)
 * @returns
 */
export const convertDateTimeServerToClient = ({ date = '', formatInput = '', formatOutput = '', isTime = false, humanize = false }) => {
  if (date == null || (typeof date == 'string' && (date.indexOf('0001-01-01') !== -1 || date.indexOf('1970-01-01') !== -1))) return '';

  let formatInputValid = formatInput ? formatInput : formatParamDateTime();
  let formatOutputValid = formatOutput
    ? formatOutput
    : getDateTimeFormat({
        isTime: isTime,
        isShortTime: true
      });
  // const { timeZone } = store.getState().App.getIn(['userData', 'userConfig', 'config'], {});

  //console.log('...convertDateTimeServerToClient...', formatInputValid, formatOutputValid, date);

  try {
    if (typeof date == 'string') {
      let d = dayjs.utc(date, formatInputValid).local();
      // .utcOffset(timeZone)

      if (!humanize || dayjs().diff(d, 'days') > 30) {
        return d.format(convertDateFormat(formatOutputValid));
      } else {
        return d.fromNow();
      }
    } else {
      return (
        dayjs
          .utc(date)
          .local()
          // .utcOffset(timeZone)
          .format(convertDateFormat(formatOutputValid))
      );
    }
  } catch (error) {
    return null;
  }
};

export const formatParamDateTime = ({ isTime = true } = {}) => {
  let formatString = 'YYYY-MM-DD';

  if (isTime) {
    formatString = `${formatString} HH:mm:ss`;
  }

  return formatString;
};

export const generateUUID = function () {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const generateBarCode = function () {
  const barCode = nanoid(13);
  return barCode;
};

export function replaceApiParam(url: string, params: any) {
  Object.keys(params).map((param) => {
    url = url.replace(new RegExp('{' + param + '}', 'gi'), params[param]);
  });
  return url;
}

export const clickOutSide = (id: string, cb: () => void, cond = (target: any) => true) => {
  let event = `mousedown.${id}`,
    $id = `#${id}`,
    $document: any = $(document);
  setTimeout(() => {
    $document.off(event).on(event, (e: any) => {
      let $target = $(e.target);
      if (window.outerWidth <= 560) {
        $document.off(event);
      } else if (
        !$target.is($id) &&
        !$target.parents($id).length &&
        //$.contains($document, e.target) &&
        !$target.parents('.popper').length &&
        $target.attr('class')?.indexOf('css-') === -1 &&
        cond($target)
      ) {
        cb();
        $document.off(event);
      }
    });
  }, 200);

  return () => {
    $document.off(event);
  };
};

export function mapToCssModules(className = '', cssModule: any = '') {
  if (!cssModule) return className;
  return className
    .split(' ')
    .map((c) => cssModule[c] || c)
    .join(' ');
}

/**
 * Returns a new object with the key/value pairs from `obj` that are not in the array `omitKeys`.
 */
export function omit(obj: any, omitKeys: any) {
  const result: any = {};
  Object.keys(obj).forEach((key) => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}

/**
 * Returns a filtered copy of an object with only the specified keys.
 */
export function pick(obj: any, keys: any) {
  const pickKeys = Array.isArray(keys) ? keys : [keys];
  let { length } = pickKeys;
  let key;
  const result: any = {};

  while (length > 0) {
    length -= 1;
    key = pickKeys[length];
    result[key] = obj[key];
  }
  return result;
}

// Duplicated Transition.propType keys to ensure that Reactstrap builds
// for distribution properly exclude these keys for nested child HTML attributes
// since `react-transition-group` removes propTypes in production builds.
export const TransitionPropTypeKeys = [
  'in',
  'mountOnEnter',
  'unmountOnExit',
  'appear',
  'enter',
  'exit',
  'timeout',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited'
];

/* eslint key-spacing: ["error", { afterColon: true, align: "value" }] */
// These are all setup to match what is in the bootstrap _variables.scss
// https://github.com/twbs/bootstrap/blob/v4-dev/scss/_variables.scss
export const TransitionTimeouts = {
  // eslint-disable-next-line key-spacing
  Fade: 150, // $transition-fade
  Collapse: 350, // $transition-collapse
  // eslint-disable-next-line key-spacing
  Modal: 300, // $modal-transition
  Carousel: 600 // $carousel-transition
};

export const nl2br = (str: string) => {
  return typeof str === 'string' ? unescape(str).replace(/(?:\r\n|\r|\n|\\n)/g, '<br>') : str;
};

export function checkIsNegative(num: string | number): boolean {
  if (Math.sign(num as number) === -1) {
    return true;
  }
  return false;
}

export const formatDateDisplay = (date: any, format = 'MM/DD/YYYY', defaultText = '') => {
  if (!date) {
    return defaultText;
  }
  return dayjs(date).format(format);
};

export function parseJSONTo<T>(strJson: string): T | undefined {
  let result = undefined;
  try {
    // // console.log('parseJSONTo', strJson);
    if (strJson != '') {
      return JSON.parse(strJson);
    }
  } catch (e: any) {
    return result;
  }

  return result;
}

export const numberFormat = (
  input: string | number,
  options: NumberSetting = {
    decimalSymbol: window?.numberFormat?.decimalSymbol || '.',
    noOfDecimal: Number(window?.numberFormat?.noOfDecimal) || 2,
    digitGroupingSymbol: window?.numberFormat?.digitGroupingSymbol || ',',
    digitGroup: window?.numberFormat?.digitGroup || '123,456,789',
    negativeNumberFormat: window?.numberFormat?.negativeNumberFormat || '-1.1'
  },
  isNegative: boolean = false
) => {
  try {
    const { decimalSymbol, noOfDecimal = 2, digitGroupingSymbol = ',', digitGroup, negativeNumberFormat }: NumberSetting = options;
    const numberFloat = typeof input === 'string' ? parseFloat(input) || 0 : input;

    // const isNegative: boolean = checkIsNegative(numberFloat);

    const arrSplitNumber = digitGroup?.split(',');
    let digitGroupLength = arrSplitNumber?.[0].length;
    let re = '\\d(?=(\\d{' + (digitGroupLength || 3) + '})+' + (noOfDecimal > 0 ? '\\D' : '$') + ')';
    let num = numberFloat.toFixed(Math.max(0, ~~noOfDecimal));
    let result = (decimalSymbol ? num.replace('.', decimalSymbol) : num).replace(new RegExp(re, 'g'), '$&' + digitGroupingSymbol);
    if (isNegative) {
      switch (negativeNumberFormat) {
        case '-1.1':
          result = '-' + result;
          break;
        case '- 1.1':
          result = '- ' + result;
          break;
        case '1.1-':
          result = result + '-';
          break;
        case '1.1 -':
          result = result + ' -';
          break;
      }
    }
    return result;
  } catch (error) {
    return input;
  }
};

// Money format
export const moneyFormat = (value: string | number, currency?: string) => {
  const currencyFormat = window?.currencyFormat?.currencyFormat || '1,234,567.89';
  const negativeCurrencyFormat = window?.currencyFormat?.negativeCurrencyFormat || '-1,234,567.89';

  let decimalSymbol = '.';
  let digitGroupingSymbol = ',';

  const isNegative: boolean = checkIsNegative(value);

  if (!isNegative) {
    if (currencyFormat === '1.234.567,89') {
      decimalSymbol = ',';
      digitGroupingSymbol = '.';
    } else if (currencyFormat === '1 234 567,89') {
      decimalSymbol = ',';
      digitGroupingSymbol = ' ';
    }
  } else {
    if (negativeCurrencyFormat === '-1.234.567,89') {
      decimalSymbol = ',';
      digitGroupingSymbol = '.';
    } else if (negativeCurrencyFormat === '-1 234 567,89') {
      decimalSymbol = ',';
      digitGroupingSymbol = ' ';
    }
  }

  const money = numberFormat(
    value,
    {
      decimalSymbol: decimalSymbol,
      noOfDecimal: 2,
      digitGroupingSymbol: digitGroupingSymbol,
      digitGroup: '123,456,789',
      negativeNumberFormat: '-1.1'
    },
    isNegative
  );

  if (!currency || currency == '') {
    return money;
  } else {
    return [currencySymbol(currency), money].join('');
  }
};

// Currency Symbol
export const currencySymbol: (code: string) => string = (code: string) => {
  return window.currencyFormat?.usedCurrencies?.find((v: Currency) => v.code === code)?.currencySymbol ?? code;
};

export const keyStringify = (data: { [key: string]: any }, preKey: string): { [key: string]: any } => {
  let newData: { [key: string]: any } = {};

  for (const i in data) {
    if (isObject(data[i])) {
      newData = { ...newData, ...keyStringify(data[i], i) };
    } else {
      newData[preKey ? `${preKey}.${i}` : i] = data[i];
    }
  }

  return newData;
};

export const getAttributesByValues = (attrValues: any[]): any[] => {
  let _attributes: any[] = [];
  attrValues?.map((attrVal: any, index: number) => {
    const idx = _attributes?.findIndex((_ele) => _ele.id === attrVal?.attr?.id);
    let _values: any[] = [];
    let _flag = false;
    if (idx > -1) {
      _values = (_attributes[idx]?.values as any[]) ?? [];
    } else {
      _flag = true;
    }
    if (_values && _values?.findIndex((_ele: any) => _ele?.id === attrVal?.id) <= -1) {
      _values.push({ id: attrVal?.id, name: attrVal?.name });
    }
    if (_flag) {
      _attributes.push({
        ...attrVal?.attr,
        values: _values
      });
    }
  });
  return _attributes;
};

//convert base64 image to file image
export function dataURLtoFile(dataurl: string, filename: string) {
  var arr: string[] = dataurl.split(','),
    mime = arr.length > 0 ? arr[0]?.match(/:(.*?);/)?.[1] : '',
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: 'image/png' });
}

// convert image url to blob
export function convertUrlToBlob(url: any) {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onerror = function () {
        reject('Network error.');
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject('Loading error:' + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err: any) {
      reject(err.message);
    }
  });
}

// convert image url to base64
export function convertUrlToBase64(url: any, callback?: any) {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.onerror = function () {
        reject('Network error.');
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          var reader = new FileReader();
          reader.onloadend = function () {
            callback && callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
          // resolve(xhr.response);
        } else {
          reject('Loading error:' + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err: any) {
      reject(err.message);
    }
  });
}

// convert image to base64
export function convertImageToBase64(file: any) {
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL = '';
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      // console.log('Called', reader);
      baseURL = reader.result as string;
      // console.log(baseURL);
      resolve(baseURL);
    };
    // console.log(fileInfo);
  });
}

//build tree data from array
export const buildTree = (arrItems: any[], id: any): any =>
  arrItems.filter((_item: any) => _item.parent?.id === id).map((_item: any) => ({ ..._item, children: buildTree(arrItems, _item.id) }));

//find node in tree
export const findNode = (treeNodes: any[], nodeId: string, result: any): any => {
  for (let i = 0; i < treeNodes.length; i++) {
    if (treeNodes[i].id === nodeId) {
      //// console.log('nodes[i]', nodes[i]);
      result = treeNodes[i];
    }
    if (treeNodes[i]?.children?.length > 0) {
      result = findNode(treeNodes[i].children, nodeId, result);
    }
  }
  return result;
};

export const formatAddress = (address: any) => {
  let strAddr = [];
  address?.street && strAddr.push(address?.street);
  address?.city && strAddr.push(address?.city);
  address?.addrState && strAddr.push(address?.addrState);
  address?.country?.country && strAddr.push(address?.country?.country);
  return `${strAddr.join(', ')} ${address?.zipcode || ''}`;
};

export const labelValueSearchItem = (items: LabelValue[], searchKey: string): LabelValue => {
  let searchItem = {} as LabelValue;
  items?.map((item: any, index: number) => {
    if (item.value == searchKey) {
      searchItem = item;
      return searchItem;
    }
  });
  return searchItem;
};

export function isEmptyObject(value: any) {
  return Object.keys(value).length === 0 && value.constructor === Object;
}

export const filterAddUpdate = (filters: LabelValueData[], itemNew: LabelValueData) => {
  let newFilters: LabelValue[] = [];
  let isUpdate = false;

  filters?.map((item: any, index: number) => {
    if (item.value == itemNew.value) {
      isUpdate = true;
      if (itemNew?.data != '' || itemNew?.data?.length > 0) {
        newFilters.push(itemNew);
      }
    } else {
      newFilters.push(item);
    }
  });
  if (isUpdate == false && (itemNew?.data != '' || itemNew?.data?.length > 0)) {
    newFilters.push(itemNew);
  }
  //console.log('>>>>>>> newFilters', newFilters);
  return newFilters;
};
