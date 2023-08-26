import { useState, Suspense, useMemo, useEffect } from 'react';
import _, { isFunction, isEmpty } from 'lodash';

//mui material
import { Box, Collapse, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Chip } from '@mui/material';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LabelValueData } from '@base/types/app';

interface ListTableHeaderProps {
  checkedIds: any;
  leftFilter: any;
  actionOnSelected: any;
  rightAction: any;
  onChange?: (nValue: any) => void;
  defaultVal?: any;
  onCancel: () => void;
  selected: any[];
}

const ListTableHeader = (props: ListTableHeaderProps) => {
  const { checkedIds, leftFilter, actionOnSelected, rightAction, onChange, defaultVal = '', onCancel, selected } = props;
  const [selectedFilters, setSelectedFilters] = useState<LabelValueData[]>([]);
  const theme = useTheme();

  console.log('selected', selected);

  //init selectedFilters
  useEffect(() => {
    if (selected) {
      if (!_.isEqual(selected, selectedFilters)) {
        console.log('do if');

        setSelectedFilters(selected);
      }
    } else {
      console.log('do else');

      setSelectedFilters([]);
    }
  }, [selected]);

  const handleValueChange = (item: any, eventValue: any) => {
    //console.log('eventValue', eventValue);
    let newData = '';
    if (eventValue?.target) {
      newData = eventValue.target.value;
    } else {
      newData = isFunction(item?.getValue) ? item.getValue(eventValue) : eventValue;
    }
    let itemData: any = {
      label: item.label,
      value: item.value,
      data: newData,
      extra: eventValue?.target ? { id: newData, name: newData } : eventValue
    };
    // onChange && onChange(itemData);
    handleFilterItemValueChange(itemData);
  };

  //filter item change
  const handleFilterItemValueChange = (val: LabelValueData) => {
    const newSelected = _.cloneDeep(selectedFilters);
    const fIdx = newSelected.findIndex((_ele: LabelValueData) => _ele.value === val.value);
    if (fIdx > -1) {
      // if (val.data) {
      if (isEmpty(val.data)) {
        // newSelected[fIdx] = val;
        newSelected.splice(fIdx, 1);
      } else {
        newSelected.splice(fIdx, 1, val);
      }
    } else {
      newSelected.push(val);
    }
    onChange && onChange(newSelected);
    setSelectedFilters(newSelected);
  };

  const renderComponent = (item: any) => {
    const selectedField = selectedFilters?.find((_ele: LabelValueData) => _ele.value === item.value);
    const RenderComponent = item.component ?? null;
    let defaultVal = selectedField?.data;

    return (
      <>
        {RenderComponent ? (
          <Suspense fallback={<>hihi</>}>
            <RenderComponent
              {...(item?.componentProps ?? {})}
              onChange={(value: any) => handleValueChange(item, value)}
              value={isFunction(item?.setValue) ? item?.setValue(defaultVal) : defaultVal || ''}
            />
          </Suspense>
        ) : (
          <TextField
            //placeholder="..."
            //sx={{}}
            fullWidth={true}
            autoComplete="off"
          />
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        // mx: 2,
        px: 1,
        mb: -2,
        bgcolor: theme.palette.secondary[200],
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
        // minWidth: 450
      }}
    >
      {leftFilter?.length > 0 &&
        (checkedIds?.length == 0 || !actionOnSelected) &&
        leftFilter?.map((item: any, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                minWidth: 450,
                bgcolor: theme.palette.background.paper,
                borderRadius: '4px'
              }}
            >
              {renderComponent(item)}
            </Box>
          );
        })}

      {checkedIds?.length > 0 && actionOnSelected?.length > 0 && (
        <Stack direction="row" spacing={1}>
          <Stack spacing={0.5} direction="row" alignItems="center">
            <IconButton
              size="small"
              color="secondary"
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent!important',
                  svg: {
                    transform: 'scale(1.2)'
                  }
                }
              }}
              onClick={onCancel}
            >
              <Close fontSize="small" />
            </IconButton>
            <Chip size="small" variant="combined" label={checkedIds?.length ?? 0} />
          </Stack>
          {actionOnSelected?.map((item: any, index: number) => {
            return (
              <Button size="small" key={index} startIcon={item?.icon} color={item.color} variant="outlined" onClick={item.onClick}>
                <SpanLang keyLang={item.label} textOnly />
              </Button>
            );
          })}
        </Stack>
      )}

      <Stack direction={'row'} justifyContent={'end'} flexGrow={1}>
        {rightAction?.length > 0 &&
          checkedIds?.length == 0 &&
          rightAction?.map((item: any, index: number) => {
            return (
              <Button
                onClick={() => {
                  item?.onClick && item.onClick();
                }}
                size="small"
                key={index}
                startIcon={item?.icon}
                color={item.color}
                variant="outlined"
              >
                <SpanLang keyLang={item.label} textOnly />
              </Button>
            );
          })}
      </Stack>
    </Box>
  );
};

export default ListTableHeader;
