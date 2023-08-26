import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Draggable, DraggableProvided, DraggableStateSnapshot, Droppable } from 'react-beautiful-dnd';
import RowField from './RowField';
import { KEY_NAME_EXPORT_CUSTOM_FIELDS } from './config/keyNames';
import { useGetExportFields } from '@base/hooks/export-import/useGetExportFields';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

interface CustomExportFieldsProps {
  setValue?: (name: string, value: any) => any;
  addTemplate?: boolean;
  menu: string;
}

const CustomExportFields = (props: CustomExportFieldsProps) => {
  const { setValue, menu } = props;

  const [fields, setFields] = useState<any>([]);
  const params = {
    menu,
    type: 'export'
  };
  const { data: exportFieldData } = useGetExportFields(
    { export: params },
    {
      onSuccess: (exportFieldData: any) => {
        if (exportFieldData?.fields?.length > 0) {
          updateFieldsLC(exportFieldData.fields);
        }
      }
    }
  );

  // fix unmount and mount error
  useEffect(() => {
    if (exportFieldData?.fields.length > 0 && fields.length === 0) {
      setFields(exportFieldData.fields);
    }
  }, [exportFieldData]);

  //portal for dragging
  let portal = document.createElement('div');
  document.body.appendChild(portal);

  const updateFieldsLC = (nFields: any) => {
    console.log('nFields: ', nFields);
    setFields(nFields);
    setValue && setValue(KEY_NAME_EXPORT_CUSTOM_FIELDS, nFields);
  };

  const onDeleteRow = (rIdx: number) => {
    const nFields = fields?.filter((field: any, index: number) => index !== rIdx);
    updateFieldsLC(nFields);
  };

  const onChangeRow = (type: string, nVal: string, row: any, idx: number) => {
    if (type === 'select') {
      const nFields = fields?.map((field: any, index: number) => {
        if (index === idx) return { ...row, labelTo: row.lanbuageKey ?? row.label };
        return field;
      });
      updateFieldsLC(nFields);
    } else {
      const nFields = fields?.map((field: any, index: number) => {
        if (index === idx) return { ...row, labelTo: nVal };
        return field;
      });
      updateFieldsLC(nFields);
    }
  };

  const handleAddField = () => {
    const nField = exportFieldData.fields.find((v: any) => !!!fields.find((field: any) => v.keyName === field.keyName)) || {
      keyName: '',
      label: '',
      labelTo: '',
      languageKey: ''
    };
    const nFields = [...fields, nField];
    // setFields((prev: any) => [...prev, nField]);
    updateFieldsLC(nFields);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const listCopy = [...fields];
    const movedItem = listCopy.find((item) => item.keyName === result.draggableId);
    const listRemoved = listCopy.filter((item) => item.keyName !== result.draggableId);
    if (movedItem) listRemoved.splice(result.destination.index, 0, movedItem);
    updateFieldsLC(listRemoved);
  };

  const renderDraggableItem = (provided: DraggableProvided, snapshot: DraggableStateSnapshot, item: any, index: number) => {
    let child = (
      <Box key={item.keyName} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
        <RowField
          row={item}
          id={item.keyName}
          onChangeRow={onChangeRow}
          rIdx={index}
          onDeleteRow={(idx: number) => onDeleteRow(idx)}
          options={exportFieldData?.fields || []}
          disabledDelete={fields.length <= 1}
        />
      </Box>
    );

    if (snapshot.isDragging) {
      return ReactDOM.createPortal(child, portal);
    }
    return child;
  };

  return (
    <Box>
      <Grid container my={1}>
        <Grid item xs={6}>
          <Typography sx={{ pl: 2, fontWeight: 500, textTransform: 'uppercase' }}>Field name in Vora App</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ pl: 1, fontWeight: 500, textTransform: 'uppercase' }}>Field name in Export file</Typography>
        </Grid>
      </Grid>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="export_field_setting">
          {(provided) => (
            <Box className="divTableBody" {...provided.droppableProps} ref={provided.innerRef}>
              {fields?.map((field: any, index: number) => (
                <Draggable key={`${field.keyName}-${index}`} draggableId={field.keyName.toString()} index={index}>
                  {(provided, snapshot) => <>{renderDraggableItem(provided, snapshot, field, index)}</>}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {fields.length < exportFieldData?.fields.length && (
        <Button sx={{ mt: 2, ml: 2 }} size="small" onClick={handleAddField}>
          Add a New Field
        </Button>
      )}
    </Box>
  );
};

export default CustomExportFields;
