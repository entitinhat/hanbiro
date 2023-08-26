export function parserIdNameToSelect(value: any, keyName: string): any {
  let format: any[] = [];
  let prods: any[] = value[keyName];
  prods?.forEach((prod) => {
    if (!prod) {
      return;
    }
    if (prod.label == undefined) {
      prod.label = prod.name;
    }
    if (prod.value == undefined) {
      prod.value = prod.id;
    }
    format.push(prod);
  });
  return format;
}

export function parserSelectToIdName(values: any[]): any {
  let format: any[] = [];

  values?.forEach((item) => {
    let tmp: any = {};
    tmp.id = item.id;
    tmp.name = item.name;
    format.push(tmp);
  });

  return format;
}

export function parserSelectToIdNameAndKey(values: any[], keyName: string): any {
  let format: any[] = parserSelectToIdName(values);
  return {
    [keyName]: format,
  };
}

export function parserSelectToIdNameObj(values: any[], objKey: string): any {
  let format: any[] = [];

  values?.forEach((item) => {
    let tmpParent: any = {};
    let tmp: any = {};
    tmp.id = item.id;
    tmp.name = item.name;
    tmpParent[objKey] = tmp;
    tmpParent['group'] = {};
    format.push(tmpParent);
  });

  return format;
}
