import html2canvas from 'html2canvas';

export function convertDataFromGraphql(rows: any) {
  return rows.reduce((objCarry: any, row: any) => {
    objCarry[row.name] = row.fields;
    return objCarry;
  }, {});
}

export function getDefaultItems(options: any) {
  let obj: any = {};

  Object.keys(options).forEach((n) => {
    options[n].forEach((opt: any) => {
      if (opt.defaultValue) {
        obj[opt.name] = opt.defaultValue;
      }

      if (opt.relatedItems) {
        obj = { ...obj, ...getDefaultItems({ children: opt.relatedItems }) };
      }
    });
  });

  return obj;
}
export async function createTemplateThumbnail(iframeRef: any) {
  return new Promise(async (resolve) => {
    const contentDocument = iframeRef?.contentDocument ?? null;
    if (contentDocument) {
      const fullScreen = await captureTheImage(contentDocument.body, 'fullscreen-thumbnail');
      const itemTableEl = contentDocument.querySelector('.item-table-screen');
      const itemTable = itemTableEl
        ? await captureTheImage(
            contentDocument.querySelector('.item-table-screen'),
            'itemtable-thumbnail',
          )
        : '';
      resolve({
        fullScreen,
        itemTable,
      });
    } else {
      resolve(null);
    }
  });
}

export async function captureTheImage(element: any, name: string = '') {
  return new Promise((resolve) => {
    try {
      html2canvas(element, { scale: 0.3 }).then((canvas) => {
        let dataSrc = canvas.toDataURL();
        // setPreviewSrc(dataSrc);
        resolve(dataSrc);
      });
    } catch (e) {
      resolve(null);
    }
  });
}

export function parseStringQuery(query: string, userId: string) {
  
  
  if (query.includes('groupBy="draft"')) {
    query = query.replace('groupBy="draft"', 'stage=2');//remove REPAIR
  } else if (query.includes('groupBy="myDraft"')) {
    query = query.replace('groupBy="myDraft"', 'stage=2 createdBy=' + userId);//remove REPAIR
  } else if (query.includes('groupBy="my"')) {
    query = query.replace('groupBy="my"', 'createdBy=' + userId);
  } else if (query.includes('groupBy="deletedTemplates"')) {
    query = query.replace('groupBy="deletedTemplates"', 'deleted=true');
  } else if (query.includes('products="all"')) {
    query = query.replace('products="all"', 'isAllProducts=true');
  }
  // console.clear();
  // console.log('test query: ' + query);
  // console.log(query.includes('groupBy="deletedTemplates"'))
  return query;
}




