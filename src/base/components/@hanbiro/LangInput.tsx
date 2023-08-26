import { LANGUAGES } from '@base/config/constant';
import { Box, Tab, Tabs, tabsClasses, TextField } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import Flag from 'react-world-flags';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lang-input-tabpanel-${index}`}
      aria-labelledby={`lang-input-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface LangInputProps {
  uid: string;
  disabled: boolean;
  className?: string;
  value: any;
  onChange: (params: any) => void;
}

const LangInput = (props: LangInputProps) => {
  const {
    uid, //unique
    disabled,
    className,
    value, //[{id: 'vn', value: ''}]
    onChange
  } = props;

  // const TAB_CONFIG = [
  //   { key: 'en' + uid, label: 'English', value: 'en', icon: 'gb', other: false },
  //   { key: 'ko' + uid, label: 'Korean', value: 'ko', icon: 'kr', other: false },
  //   { key: 'vi' + uid, label: 'Vietnamese', value: 'vi', icon: 'vn', other: false },
  //   { key: 'jp' + uid, label: 'Japanese', value: 'jp', icon: 'jp', other: true },
  //   { key: 'zh' + uid, label: 'Chinese', value: 'zh', icon: 'cn', other: true },
  //   { key: 'ido' + uid, label: 'Indonesian', value: 'ido', icon: 'id', other: true }
  // ];

  //state
  const [isLoading, setIsLoading] = useState(false);
  const [langTabs, setLangTabs] = useState(LANGUAGES);
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<any>([]); //return [{id: 'vn', value: ''}, {...}]

  //reset data
  useEffect(() => {
    if (value) {
      setData([...value]);
    }
  }, [value]);

  //value change
  const handleChange = (e: any, id: string) => {
    let newData = data ? [...data] : [];
    //check exist
    const idx = newData.findIndex((d) => d.id === id);
    if (idx > -1) {
      newData[idx].value = e.target.value;
    } else {
      const newItem = {
        id,
        value: e.target.value
      };
      newData.push(newItem);
    }
    setData(newData);
    //return
    onChange && onChange(newData);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="lang input tabs"
          scrollButtons
          variant="scrollable"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 }
            }
          }}
        >
          {langTabs.map((_tab: any, index: number) => (
            <Tab
              key={_tab.value}
              label={_tab.label}
              icon={<Flag code={_tab.icon} height={16} />}
              iconPosition="start"
              id={`lang-input-tab-${index}`}
              aria-controls={`lang-input-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {langTabs.map((_tab: any, index: number) => {
        let fIdx = data.findIndex((d: any) => d.id === _tab.value);
        let langValue = fIdx != -1 ? data[fIdx].value : '';
        return (
          <TabPanel key={_tab.value} value={activeTab} index={index}>
            <TextField
              fullWidth
              variant="outlined"
              disabled={disabled}
              value={langValue}
              onChange={(e) => handleChange(e, _tab.value)}
              placeholder={_tab.label}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default LangInput;
