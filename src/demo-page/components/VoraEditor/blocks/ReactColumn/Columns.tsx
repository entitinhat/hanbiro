import React, { useEffect, useState } from 'react';

//third-party
import EditorJS from '@editorjs/editorjs';
import { nanoid } from 'nanoid';

//material
import { Box, Grid, useTheme } from '@mui/material';

const Columns = (props: any) => {
  const { readOnly, config, onEditorChange, data } = props;
  //console.log('readOnly', readOnly);
  const theme = useTheme();
  const [elementIds, setElementIds] = useState<string[]>([]);
  const [editors, setEditors] = useState<any>(null);

  //This will run only once, init element ids first
  useEffect(() => {
    if (data.numberOfColumns > 0) {
      const newIds: string[] = [];
      for (let index = 0; index < data.numberOfColumns; index++) {
        newIds.push(nanoid());
      }
      setElementIds(newIds);
    }
    return () => {
      destroyEditor();
    };
  }, []);

  // This will run only once
  useEffect(() => {
    if (elementIds.length > 0) {
      initEditors();
    }
  }, [elementIds]);

  //init editors
  const initEditors = () => {
    if (elementIds.length > 0) {
      const newEditors: { cols: any[] } = { cols: [] };
      for (let index = 0; index < elementIds.length; index++) {
        //let editorColId = nanoid();
        let newEditorInstance = new EditorJS({
          defaultBlock: 'paragraph',
          holder: elementIds[index],
          tools: config.tools,
          data: data.cols[index],
          readOnly: readOnly,
          minHeight: 50
        });
        newEditors.cols.push({ id: elementIds[index], editorInstance: newEditorInstance });
        setEditors(newEditors);
        //callback
        onEditorChange && onEditorChange(newEditors);
      }
    }
  };

  //destroy editor instance
  const destroyEditor = () => {
    if (editors && editors.cols.length > 0) {
      editors.cols.map((_col: any) => {
        _col.editorInstance.destroy();
      });
    }
  };

  // console.log('init data', data);
  // console.log('init ele ids', elementIds);
  // console.log('init editors', editors);
  return (
    <React.Fragment>
      <Box sx={{ my: 2 }}>
        <Grid container>
          {elementIds.map((_id: string, index: number) => (
            <Grid
              item
              key={index}
              xs={12 / data.numberOfColumns}
              md={12 / data.numberOfColumns}
              lg={12 / data.numberOfColumns}
              sx={{ zIndex: 0, minHeight: '50px', p: 1, border: `1px dotted ${theme.palette.divider}`, borderRadius: '3px' }}
            >
              <div id={_id}></div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Columns;
