import React from 'react';
import {
  Q_MULTI_CHOICES,
  Q_CHECKBOXES,
  Q_DROPDOWN,
  Q_SHORT_ANSWER,
  Q_PARAGRAPH,
  Q_FILE_UPLOAD,
  Q_DATE,
  Q_TIME,
  Q_MULTI_CHOICES_GRID,
  Q_TICK_BOX_GRID
} from '@settings/digital/survey/config/constants';
import { AccessTimeOutlined, CalendarMonthOutlined, CircleOutlined, SquareOutlined } from '@mui/icons-material';

//render footer
const QuestionIcon = (props: any) => {
  const { indexNo = '', type = Q_MULTI_CHOICES } = props;

  //icon base on type
  const getIcon = () => {
    switch (type) {
      case Q_MULTI_CHOICES:
        return <CircleOutlined color="secondary" />;
      case Q_CHECKBOXES:
        return <SquareOutlined color="secondary" />;
      case Q_DROPDOWN:
        return <span>{indexNo + '.'}</span>;
      case Q_SHORT_ANSWER:
        return <div></div>;
      case Q_PARAGRAPH:
        return <div></div>;
      case Q_FILE_UPLOAD:
        return <div></div>;
      case Q_DATE:
        return <CalendarMonthOutlined color="secondary" />;
      case Q_TIME:
        return <AccessTimeOutlined color="secondary" />;
      case Q_MULTI_CHOICES_GRID:
        return <CircleOutlined color="secondary" />;
      case Q_TICK_BOX_GRID:
        return <SquareOutlined color="secondary" />;
      default:
        return <CircleOutlined color="secondary" />;
    }
  };

  //render
  return <>{getIcon()}</>;
};

export default QuestionIcon;
