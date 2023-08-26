import RawHTML from '@base/components/@hanbiro/RawHTML';
import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface ReadMoreReadLessProps {
  children: string;
  limit?: number;
}
const ReadMoreReadLess = (props: ReadMoreReadLessProps) => {
  const { children, limit = 50 } = props;
  const [isReadMoreShown, setReadMoreShown] = useState(true);
  const theme = useTheme();
  const { t } = useTranslation();
  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };
  const data: string = isReadMoreShown && children?.length > limit ? `${children?.substring(0, limit)}.....` : children;
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{
          img: {
            maxWidth: '100%' //fix problem with image width
          },
          wordBreak: 'break-all',
          overflowWrap: 'break-word'
        }}
      >
        <RawHTML>{data}</RawHTML>
        {children?.length > limit && (
          <Typography
            sx={{ cursor: 'pointer', color: theme.palette.primary.main, display: 'flex', justifyContent: 'center' }}
            component="span"
            onClick={toggleBtn}
          >
            {isReadMoreShown ? t('ncrm_desk_ticket_view_all') : t('ncrm_desk_ticket_view_less')}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ReadMoreReadLess;
