import { useCallback, useEffect, useState } from 'react';

//third-party
import { Add } from '@mui/icons-material';
import { Box, Button, IconButton, Stack, TextField, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
//import _ from 'lodash';

//project
import NoData from '@base/components/@hanbiro/NoData';
import { generateUUID } from '@base/utils/helpers';

//menu
import Section from '@settings/preferences/components/Section';
import { useMenuSettingUpdate } from '@settings/general/hooks/useMenuSetting';

interface ObjectivesProps {
  data: any;
}

const Objectives = (props: ObjectivesProps) => {
  const { data = [] } = props;
  const [items, setItems] = useState<any>([]);
  const { t } = useTranslation();
  const theme = useTheme();
  const mSettingUpdate = useMenuSettingUpdate();

  //init items
  useEffect(() => {
    if (data && data.length > 0) {
      if (JSON.stringify(data) !== JSON.stringify(items)) {
        setItems(data);
      }
    }
  }, [data]);

  //save item
  const handleSave = (newData: any) => {
    const params: any = {
      menu: 'marketing',
      key: 'campaign_objective',
      value: JSON.stringify(newData)
    };
    mSettingUpdate.mutate({ menuSetting: params });
  };
  //debounce function
  //const handleSaveDebounce = useCallback(_.debounce(handleSave, 500), [items]);

  const handleValueChange = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index].name = value;
    setItems(newItems);
  };

  const handleBlur = () => {
    handleSave(items);
  };

  const handleRemove = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    //save
    handleSave(newItems);
  };

  const handleAdd = () => {
    const newItems = [...items];
    newItems.push({ id: generateUUID(), name: '' });
    setItems(newItems);
    //save
    handleSave(newItems);
  };

  return (
    <Section header={t('Objectives')}>
      <Stack p={2} spacing={1}>
        {items.length === 0 && <NoData />}
        {items.map((_item: any, index: number) => (
          <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
            <TextField
              placeholder="input value here"
              variant="standard"
              fullWidth
              InputProps={{
                disableUnderline: true
              }}
              sx={{
                '& .MuiInputBase-root.Mui-focused': {
                  border: `1px solid ${theme.palette.primary[400]}`,
                  borderRadius: 1,
                  p: 0.5
                }
              }}
              value={_item.name}
              onChange={(e) => handleValueChange(index, e.target.value)}
              onBlur={handleBlur}
            />
            <IconButton color="error" onClick={() => handleRemove(index)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
      <Box sx={{ m: 1, display: 'flex', flexDirction: 'flex-start' }}>
        <Button variant="text" size="small" color="primary" startIcon={<Add />} onClick={handleAdd}>
          {t('ncrm_common_add_a_line')}
        </Button>
      </Box>
    </Section>
  );
};

export default Objectives;
