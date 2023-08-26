import { Box } from '@mui/material';
import React from 'react';
import styles from './task-list-header.module.css';

export const TaskListHeader: React.FC<{
  headerHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
}> = ({ headerHeight, fontFamily, fontSize, rowWidth }) => {
  return (
    <Box
      className={styles.ganttTable}
      sx={{
        // fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      <Box
        className={styles.ganttTable_Header}
        sx={{
          height: headerHeight - 2
        }}
      >
        <Box
          className={styles.ganttTable_HeaderItem}
          sx={{
            minWidth: 155,
            textAlign: 'center'
          }}
        >
          Task Name
        </Box>
        <Box
          className={styles.ganttTable_HeaderItem}
          sx={{
            minWidth: 100,
            textAlign: 'center'
          }}
        >
          Assigned User
        </Box>
      </Box>
    </Box>
  );
};
