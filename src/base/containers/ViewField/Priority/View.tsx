import React from 'react';
import { useTranslation } from 'react-i18next';

// mui import
import { Box, Chip, styled, Theme } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project import
import { Selection } from '@settings/general/types/interface';
import { CommonViewProps } from '../Common/interface';
import { priorityConfigs } from '@activity/config/list-field/column';

const PriorityBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 0.5
}));

interface ViewProps extends CommonViewProps {
  value: Selection;
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();
  const { value } = props;
  const theme = useTheme();
  const getChipColor = (option: Selection) => {
    switch (option?.keyName) {
      case 'PRIORITY_URGENT':
        return (
          <Chip
            sx={{
              color: priorityConfigs?.['PRIORITY_URGENT']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_URGENT']?.backgroundColor
            }}
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            size="small"
          />
        );
      case 'PRIORITY_HIGH':
        return (
          <Chip
            sx={{
              color: priorityConfigs?.['PRIORITY_HIGH']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_HIGH']?.backgroundColor
            }}
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            //color={priorityConfigs?.['PRIORITY_HIGH']?.color}
            size="small"
          />
        );
      case 'PRIORITY_MEDIUM':
        return (
          <Chip
            sx={{
              color: priorityConfigs?.['PRIORITY_MEDIUM']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_MEDIUM']?.backgroundColor
            }}
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            size="small"
          />
        );
      case 'PRIORITY_LOW':
        return (
          <Chip
            sx={{
              color: priorityConfigs?.['PRIORITY_LOW']?.textColor,
              backgroundColor: priorityConfigs?.['PRIORITY_LOW']?.backgroundColor
            }}
            key={option?.keyName}
            label={t(option?.languageKey || '')}
            size="small"
          />
        );
    }
  };

  return <PriorityBox>{getChipColor(value)}</PriorityBox>;
};

export default View;
