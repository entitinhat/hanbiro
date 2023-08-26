import { useTranslation } from 'react-i18next';

import { ColumnSetting } from '@base/types/setting';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Checkbox, MenuItem, Stack, Typography } from '@mui/material';

interface ColumnProps {
  col: ColumnSetting;
  onChangeColumnSetting: (event: any, col: ColumnSetting) => any;
  id: string;
}

const Column = (props: ColumnProps) => {
  const { col, onChangeColumnSetting, id } = props;
  const { t } = useTranslation();
  return (
    <MenuItem sx={{ width: 250 }} onClick={(event: any) => onChangeColumnSetting(event, col)}>
      <Stack spacing={1} direction="row" alignItems="center">
        <DragIndicatorIcon />
        <Checkbox color="primary" sx={{ p: 0 }} checked={col.defaultViewInList} />
        <Typography>{t(col.languageKey)}</Typography>
      </Stack>
    </MenuItem>
  );
};
export default Column;
