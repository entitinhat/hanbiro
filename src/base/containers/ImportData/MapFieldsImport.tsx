import * as keyNames from '@base/containers/ImportData/config/keyNames';
import { Grid, useTheme } from '@mui/material';
import { Fragment, useEffect, useMemo, useState } from 'react';
import RowMapField from './RowMapField';

interface MapFieldsImportProps {
  value?: any;
  fieldsImport: any;
  fieldsMenu: any;
  onSelectField?: (fieldSelect: any, rIdx: number) => any;
  setValue: (name: string, value: any) => any;
  getValues: (name: string) => any;
}

const MapFieldsImport = (props: MapFieldsImportProps) => {
  const { value, fieldsImport, fieldsMenu, onSelectField, setValue, getValues } = props;

  // state
  const [fieldsAfterMap, setFieldsAfterMap] = useState<any>([]);
  console.log('🚀 ~ file: MapFieldsImport.tsx:20 ~ MapFieldsImport ~ fieldsAfterMap', fieldsAfterMap);

  const saveFieldMap = getValues(keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP);

  useEffect(() => {
    if (Array.isArray(saveFieldMap)) {
      if (saveFieldMap.length > 0) {
        setFieldsAfterMap(saveFieldMap);
      } else {
        setFieldsAfterMap(fieldsMenu);
      }
    }
  }, [saveFieldMap]);

  const theme = useTheme();

  const nFieldsImport = useMemo(() => {
    const nFields = fieldsImport
      ? fieldsImport.map((item: any, index: number) => {
          return {
            keyName: (index + 1).toString(),
            label: item
          };
        })
      : [];
    return [{ keyName: '0', label: 'Select Field To Import' }, ...nFields];
  }, [fieldsImport]);

  // handler
  let nFields = fieldsAfterMap;
  const onChangeRow = (fieldSelect: any, rIdx: number) => {
    const nFieldsMap = nFields.map((field: any, index: number) => {
      if (index === rIdx) {
        return { ...field, labelTo: fieldSelect.label };
      }
      return field;
    });
    nFields = nFieldsMap;
    setFieldsAfterMap(nFields);
    setValue(keyNames.KEY_NAME_IMPORT_FIELDS_AFTER_MAP, nFields);
  };

  return (
    <>
      <Grid container rowSpacing={1} sx={{ px: 2, alignItems: 'center' }}>
        <Grid item xs={6} sx={{ textTransform: 'uppercase', color: theme.palette.grey[500] }}>
          Vora Fields
        </Grid>
        <Grid item xs={6} sx={{ textTransform: 'uppercase', color: theme.palette.grey[500] }}>
          Import File Fields
        </Grid>

        {fieldsAfterMap.map((field: any, index: number) => {
          return (
            <Fragment key={index}>
              <RowMapField row={field} rIdx={index} options={nFieldsImport} onChangeRow={onChangeRow} />
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

export default MapFieldsImport;
