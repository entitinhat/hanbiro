export function addItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index)];
}

export function replaceItemAtIndex<T>(arr: T[], index: number, newValue: T): T[] {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export function removeItemAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function pluck<T, K extends keyof T>(records: T[], key: K): T[K][] {
  return records.map((r) => r[key]);
}

export function slideToMapByKey(data: any[], keyMap: string) {
  let mergeData: any = {};
  data?.map((_data: { keyName: string }) => {
    if (_data?.keyName != undefined) {
      mergeData[_data.keyName] = _data;
    }
  });

  return mergeData;
}
//call
//const newArr = replaceItemAtIndex<string>(curArr, 1, 'aaa');

export function slideToObject(slide: any[], keyLabel: string, keyValue: string) {
  let objectData: any = {};
  slide?.map((data) => {
    objectData[data?.[keyLabel]] = data?.[keyValue];
  });
  return objectData;
}

export function filtersArray(slide: any[], keys: string[]) {
  let filtersData: any[] = [];
  slide?.map((_data: { keyName: string }) => {
    if (keys.includes(_data?.keyName)) {
      filtersData.push(_data);
    }
  });

  return filtersData;
}
