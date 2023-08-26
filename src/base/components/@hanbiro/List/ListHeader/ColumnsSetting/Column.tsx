import { useTranslation } from 'react-i18next';

import { ColumnSetting } from '@base/types/setting';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Checkbox, MenuItem, Stack, Typography } from '@mui/material';

interface ColumnProps {
  isDisabled?: boolean;
  col: ColumnSetting;
  onChangeColumnSetting: (event: any, col: ColumnSetting) => any;
  id: string;
}

const Column = (props: ColumnProps) => {
  const { col, onChangeColumnSetting, id, isDisabled = false } = props;
  const { t } = useTranslation();
  return (
    <MenuItem sx={{ width: 320 }} onClick={(event: any) => !isDisabled && onChangeColumnSetting(event, col)}>
      <Stack spacing={1} direction="row" alignItems="center">
        {/* <DragIndicatorIcon sx={{ cursor: 'move' }} /> */}
        <Checkbox color="primary" sx={{ p: 0 }} checked={col.defaultViewInList} disabled={isDisabled} />
        <Typography>{t(col.languageKey)}</Typography>
      </Stack>
    </MenuItem>
  );
};
export default Column;
