import { Stack, Tab, Tabs, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface MenuLayoutProps {
  menuItems: any[];
}

const MenuLayout = (props: MenuLayoutProps) => {
  const { menuItems = [] } = props;
  const navigate = useNavigate();
  const params = useParams();

  const paramsArr = params['*']?.split('/') || [];
  const [value, setValue] = useState<string | undefined>(paramsArr[0]);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: any) => {
    setValue(newValue);
    navigate(newValue);
  };
  useEffect(() => {
    setValue(paramsArr[0]);
  }, [params]);

  return (
    <Stack direction="row" alignItems="start">
      <Tabs
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          borderBottom: 1,
          borderColor: 'divider',
          width: '100%'
        }}
        value={value}
        onChange={handleChange}
      >
        {menuItems.length > 0 &&
          menuItems.map((item) => {
            return (
              <Tab
                sx={{
                  color: theme.palette.secondary.main,
                  padding: '0 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color .1s',
                  borderRadius: 0,
                  marginTop: '1px'
                }}
                icon={item.icon}
                iconPosition="start"
                key={item.path}
                label={item.label}
                value={item.path}
              />
            );
          })}
      </Tabs>
    </Stack>
  );
};

export default MenuLayout;
