import React from 'react';

import { TicketClassificationValue } from '@settings/preferences/types/desk/ticketClassification';
import { TextView } from '@base/config/view-field/components';
import { List, ListItem, Typography, Box } from '@mui/material';

interface ViewProps {
  value: TicketClassificationValue[];
}
const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value } = props;
  // console.log('🚀 ~ file: View.tsx:12 ~ value:', value);

  const getTitles = (item: any) => {
    if (item.classification?.languagekey) {
      return item.classification?.languagekey + ' : ';
    } else {
      return item.classification?.name ? item.classification?.name + ': ' : '';
    }
  };

  return (
    <>
      <List>
        {Array.isArray(value)
          ? value.map((item: TicketClassificationValue, index: number) => (
              <ListItem sx={{ margin: '0', padding: '0' }} key={index}>
                {item?.classification?.name} : {item?.value}
              </ListItem>
            ))
          : ''}
      </List>
    </>
  );
};

export default View;
