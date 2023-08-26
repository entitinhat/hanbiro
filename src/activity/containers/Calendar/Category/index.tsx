import _ from 'lodash';

import { Divider, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

import { CategoryItem } from '../';
import Item from './Item';

interface CategoryProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  categoryItems: CategoryItem[];
  onChangeCategory: (id: string, c: string | boolean) => void;
}

function Category(props: CategoryProps) {
  const { currentDate, setCurrentDate, categoryItems, onChangeCategory } = props;

  return (
    <Stack spacing={1.5} sx={{ width: 320 }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          value={currentDate}
          onChange={(newValue) => {
            setCurrentDate(newValue as string);
          }}
          renderInput={(params) => <TextField {...params} sx={{ width: '100%' }} />}
        />
      </LocalizationProvider>
      <Divider />
      <Stack spacing={0.5}>
        {categoryItems.map((item) => {
          return <Item key={item.id} item={item} onChangeCategory={onChangeCategory} />;
        })}
      </Stack>
    </Stack>
  );
}

export default Category;
