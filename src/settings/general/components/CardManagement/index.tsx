import { Button, Grid } from '@mui/material';
import Section from '@settings/preferences/components/Section';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import SpanLang from '@base/components/@hanbiro/SpanLang';
interface Props {
  title: string;
  isAdd?: boolean;
  onAdd?: () => void;
  children: any;
  disabled?: boolean;
  labelBtn?: string;
}

const CardManagement: React.FC<Props> = (props: Props) => {
  const { title = '', isAdd = false, onAdd = () => {}, children = null, disabled = false, labelBtn = '' } = props;
  return (
    <Section header={title} isAdd={isAdd} onAdd={onAdd} addLabel={labelBtn}>
      <Grid className="scroll-box" sx={{ height: 'calc(100vh - 220px)', margin: '10px' }}>
        {children}
      </Grid>
    </Section>
  );
};

export default CardManagement;
