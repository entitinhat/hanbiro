import _ from 'lodash';

//grouped by date
export const groupByKeyName = ({ data, keyName, keyOptionValue }: any) => {
  return Object.values(
    data.reduce((group: any, item: any) => {
      const itemKeyValue = item[keyName]?.[keyOptionValue] || item[keyName] || 'none';
      if (!group[itemKeyValue]) {
        group[itemKeyValue] = {
          [keyName]: item[keyName],
          data: []
        };
      }
      group[itemKeyValue].data.push(item);
      return group;
    }, {})
  );
};

// rowspan a field by field keyname and value of field to spanned
// export const getConfigRowSpannedByField = (data: any, field: string, fieldValue: string | null = null) => {
//   let colEnable = [field];
//   let baseRows = [...data];
//   const rows = baseRows.map((item) => {
//     return fieldValue ? {
//       ...item,
//       [field]: {
//         ...item?.[field],
//         isRowSpanned: false,
//         rowSpan: 1
//       }
//     } : {
//       ...item,
//       [field]: {
//         [field]: item[field],
//         isRowSpanned: false,
//         rowSpan: 1
//       }
//     };
//   });

//   let topCellIndex = 0;

//   if(fieldValue){
//     colEnable.forEach((item: string, index: number) => {
//       for (let i = 1; i < rows.length; i++) {
//         if (index == 0) {
//           if (rows[i][item][fieldValue] == undefined && rows[topCellIndex][item][fieldValue] == undefined) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//             rows[i][item][fieldValue] = topCellIndex;
//             rows[i][item].name = 'null';
//           } else if (rows[topCellIndex][item][fieldValue] == rows[i][item][fieldValue] && rows[i][item][fieldValue] != undefined) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//           } else {
//             topCellIndex = i;
//           }
//         } else {
//           const preIndex = index - 1;
//           if (
//             rows[topCellIndex][item]?.[fieldValue] == rows[i][item]?.[fieldValue] &&
//             rows[topCellIndex][colEnable[preIndex]]?.[fieldValue] == rows[i][colEnable[preIndex]]?.[fieldValue]
//           ) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//           } else {
//             topCellIndex = i;
//           }
//         }
//       }
//       topCellIndex = 0;
//     });
//   }
//   else {
//     colEnable.forEach((item: string, index: number) => {
//       for (let i = 1; i < rows.length; i++) {
//         if (index == 0) {
//           if (rows[i][item]?.[item] == undefined && rows[topCellIndex][item]?.[item] == undefined) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//             rows[i][item] = topCellIndex;
//           } else if (rows[topCellIndex][item]?.[item] == rows[i][item]?.[item] && rows[i][item]?.[item] != undefined) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//           } else {
//             topCellIndex = i;
//           }
//         } else {
//           const preIndex = index - 1;
//           if (
//             rows[topCellIndex][item]?.[item] == rows[i][item]?.[item]
//             &&
//             rows[topCellIndex][colEnable[preIndex]]?.[item] == rows[i][colEnable[preIndex]]?.[item]
//           ) {
//             rows[i][item].isRowSpanned = true;
//             rows[topCellIndex][item].rowSpan++;
//           } else {
//             topCellIndex = i;
//           }
//         }
//       }
//       topCellIndex = 0;
//     });
//   }
//   console.log('rows',rows );

//   return rows;
// };

// rowspan a field by field keyname and value of field to spanned -> using reduce
export const getConfigRowSpannedByField = (data: any, field: string, fieldValue: string | null = null) => {
  let colEnable = field;
  let baseRows = [...data];

  const sortbaseRows = _.cloneDeep(baseRows).sort((a: any, b: any) => {
    // grouping rows by sort to spanned all item have same value
    return fieldValue ? (a?.[field]?.[fieldValue] >= b?.[field]?.[fieldValue] ? 1 : -1) : a?.[field] >= b?.[field] ? 1 : -1;
  });

  const rows = sortbaseRows.map((item) => {
    return fieldValue
      ? {
          ...item,
          [field]: {
            ...item?.[field],
            isRowSpanned: false,
            rowSpan: 1
          }
        }
      : {
          ...item,
          [field]: {
            [field]: item[field],
            isRowSpanned: false,
            rowSpan: 1
          }
        };
  });

  if (fieldValue) {
    // in case row span have data type object { }
    rows.reduce(
      (acc, row, i) => {
        const { colEnable, fieldValue } = acc;
        if (i > 0) {
          if (row[colEnable][fieldValue] == undefined && rows[acc.topCellIndex][colEnable][fieldValue] == undefined) {
            row[colEnable].isRowSpanned = true;
            rows[acc.topCellIndex][colEnable].rowSpan++;
            row[colEnable][fieldValue] = acc.topCellIndex;
          } else if (
            rows[acc.topCellIndex][colEnable][fieldValue] == row[colEnable][fieldValue] &&
            row[colEnable][fieldValue] != undefined
          ) {
            row[colEnable].isRowSpanned = true;
            rows[acc.topCellIndex][colEnable].rowSpan++;
          } else {
            acc.topCellIndex = i;
          }
        }
        return { colEnable, fieldValue, topCellIndex: acc.topCellIndex };
      },
      { colEnable, fieldValue, topCellIndex: 0 }
    );
  } else {
    // in case row span have data single
    rows.reduce(
      (acc, row, i) => {
        const { colEnable } = acc;
        if (i > 0) {
          if (row[colEnable]?.[colEnable] == undefined && rows[acc.topCellIndex][colEnable]?.[colEnable] == undefined) {
            row[colEnable].isRowSpanned = true;
            rows[acc.topCellIndex][colEnable].rowSpan++;
            row[colEnable] = acc.topCellIndex;
          } else if (
            rows[acc.topCellIndex][colEnable]?.[colEnable] == row[colEnable]?.[colEnable] &&
            row[colEnable]?.[colEnable] != undefined
          ) {
            row[colEnable].isRowSpanned = true;
            rows[acc.topCellIndex][colEnable].rowSpan++;
          } else {
            acc.topCellIndex = i;
          }
        }
        return { colEnable, topCellIndex: acc.topCellIndex };
      },
      { colEnable, topCellIndex: 0 }
    );
  }
  console.log('rowsnew', rows);
  return rows;
};

// moving select columns from ahead to behind spanned row follow UI design
export const configMovingColumnsByKey = (tableColumns: any, keyName: string) => {
  let tableColumnsGroup: any = [];
  if (tableColumns.length > 1) {
    tableColumnsGroup = [...tableColumns];
    tableColumnsGroup.unshift(
      tableColumnsGroup.splice(
        tableColumnsGroup.findIndex((item: any) => item?.accessorKey == keyName),
        1
      )[0]
    );
  }
  return tableColumnsGroup;
};
