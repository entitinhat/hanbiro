import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';

//material
import { Box, Stack, TextField } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

//local
import ReactEditable from './editable';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: '8px'
    //backgroundColor: '#efefef'
  }
  // timelinedot: {
  //   boxShadow: 'none',
  //   marginTop: '20px'
  // },
  // time: {
  //   flex: '0.2',
  //   padding: '8px',
  //   marginTop: '6px',
  //   textOverflow: 'ellipsis'
  // },
  // oppositeInButton: {
  //   flex: '0.14'
  // },
  // addButton: {
  //   boxShadow: 'none',
  //   paddingLeft: '14px',
  //   paddingRight: '14px'
  // },
  // description: {
  //   padding: '8px',
  //   width: '400px',
  //   textOverflow: 'ellipsis'
  // },
  // addButtonText: {
  //   color: '#FFFFFF',
  //   fontSize: '1.3rem'
  // }
}));

const DEFAULT_INITIAL_DATA = {
  //withHeadings: true,
  content: [
    ['', ''],
    ['', ''],
    ['', '']
  ]
};

//table based on react-table 18 and MUI
const Table = (props: any) => {
  const { readOnly, onDataChange, data } = props;
  //console.log('init data', data);

  const [tableData, setTableData] = useState<any[]>([]); //[{}, {}]
  const [tableCols, setTableCols] = useState<string[]>([]);

  //init table data
  useEffect(() => {
    //content
    if (data.content.length > 0) {
      initData(data.content);
    } else {
      initData(DEFAULT_INITIAL_DATA.content);
    }
  }, [data]);

  //init data
  const initData = (initialContent: any) => {
    const newCols = initialContent[0]; //temp headers
    setTableCols(newCols); //headers

    const newRows = data.withHeadings ? initialContent.slice(1, initialContent.length) : initialContent;
    //create table data
    if (newRows.length > 0) {
      const newData: any[] = [];
      newRows.map((_row: string[], rIdx: number) => {
        const rowData: any = {};
        newCols.map((_col: string, cIdx: number) => {
          rowData[`c${cIdx + 1}`] = _row[cIdx];
        });
        newData.push(rowData);
      });
      setTableData(newData);
    }
  };

  //adjust row values if columns changes
  const adjustRowByColum = (rowValues: string[], colValues: string[]) => {
    let newRowValues = [...rowValues];
    //adjust content by new columns
    if (newRowValues.length > colValues.length) {
      newRowValues = newRowValues.slice(0, colValues.length);
    }
    if (newRowValues.length < colValues.length) {
      const additionalValues = Array(colValues.length - newRowValues.length).fill('');
      newRowValues = newRowValues.concat(additionalValues);
    }
    return newRowValues;
  };

  //table data change
  const handleDataChange = (newTableData: any) => {
    //console.log('newTableData', newTableData);
    setTableData(newTableData);

    // Inform editorjs about data change
    if (onDataChange) {
      //convert table data to content array
      const newData = { ...data };
      let newContent = newData.withHeadings ? [tableCols] : []; //get first header row
      newTableData.map((_data: any) => {
        let newRowValues = adjustRowByColum(Object.values(_data), tableCols);
        newContent.push(newRowValues);
      });
      newData.content = newContent;
      onDataChange(newData);
    }
  };

  //header value change
  const handleHeaderChange = (newCols: string[]) => {
    setTableCols(newCols);

    // Inform editorjs about data change
    if (onDataChange) {
      //convert table data to content array
      const newData = { ...data };
      let newContent = newData.withHeadings ? [newCols] : []; //get first header row
      tableData.map((_data: any) => {
        let newRowValues = adjustRowByColum(Object.values(_data), newCols);
        newContent.push(newRowValues);
      });
      newData.content = newContent;
      onDataChange(newData);
    }
  };

  //console.log('tableCols', tableCols);
  //console.log('tableData', tableData);
  //console.log('initial data', data);
  return (
    <React.Fragment>
      <Box sx={{ pt: 3, mb: 2 }}>
        <ReactEditable
          readOnly={readOnly}
          withHeadings={data.withHeadings}
          stColumns={tableCols} //string[]
          data={[...tableData]} //object[]
          setData={(newData: any) => handleDataChange(newData)}
          setHeader={handleHeaderChange}
        />
      </Box>
    </React.Fragment>
  );
};

export default Table;
