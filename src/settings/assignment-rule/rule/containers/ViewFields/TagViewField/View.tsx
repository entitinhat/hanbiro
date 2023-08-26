import { Box, Chip, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IdName } from '@base/types/common';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';

interface TagViewFieldProps {
  value: any;
  componentProps?: {
    [x: string]: any;
  };
  onChange: (nValue: IdName | IdName[] | {}) => void;
}
const TagViewField = (props: TagViewFieldProps) => {
  const { value, componentProps, onChange } = props;
  const labelKey = componentProps?.labelKey;
  const single = componentProps?.single;
  const type = componentProps?.type;
  const handleOnSave = componentProps?.handleOnSave;

  console.log('TagViewField props', props);
  const [data, setData] = useState<any>(null);
  const theme = useTheme();
  useEffect(() => {
    if (value) setData(value);
    else setData(null);
  }, [value]);
  const handleDelete = (id: string) => () => {
    // onDelete && onDelete(id);
    if (single) {
      handleOnSave && handleOnSave(type, true, {});
    } else {
      var nData = [...data];
      const indx = nData.findIndex((item) => item.id === id);
      nData.splice(indx, 1);
      handleOnSave && handleOnSave(type, true, nData);
    }
  };
  return (
    <Box>
      {data ? (
        <>
          {!single ? (
            <Stack direction="row" spacing={2}>
              {data.map((item: any, indx: number) => {
                return (
                  <Chip
                    sx={{ py: '20px', background: theme.palette.secondary.lighter, border: '1px solid ' + theme.palette.secondary.light }}
                    key={indx}
                    label={item[labelKey] ?? ''}
                    onDelete={handleDelete(item?.id as string)}
                    deleteIcon={<CloseIcon sx={{ fontSize: '16px !important' }} />}
                    size="small"
                  />
                );
              })}
              {/* <Chip
            sx={{ py: '20px', background: theme.palette.secondary.lighter, border: '1px solid ' + theme.palette.secondary.light }}
            label={'Add +'}
            size="small"
          /> */}
            </Stack>
          ) : (
            <Chip
              sx={{ py: '20px', background: theme.palette.secondary.lighter, border: '1px solid ' + theme.palette.secondary.light }}
              label={data?.[labelKey] ?? ''}
              size="small"
              onDelete={handleDelete(data?.id as string)}
              deleteIcon={<CloseIcon sx={{ fontSize: '16px !important' }} />}
            />
          )}
        </>
      ) : (
        <Typography>{'(none)'}</Typography>
      )}
    </Box>
  );
};
export default TagViewField;
