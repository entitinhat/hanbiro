import { Box, Button, Grid, SxProps, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface SectionProps {
  header: string;
  subTitle?: string;
  isAdd?: boolean;
  addLabel?: string;
  children?: any;
  onAdd?: () => void;
}

const Section = (props: SectionProps) => {
  const { header, children, subTitle, isAdd = false, onAdd, addLabel } = props;
  const theme = useTheme();
  const border = '1px solid ' + theme.palette.divider;
  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.lighter;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        borderRadius: '.25rem',
        border: border,
        mb: 2,
        breakInside: 'avoid-column'
      }}
    >
      <Box sx={{ py: 1.5, px: 2, borderBottom: border }}>
        <Grid sx={{ display: 'flex' }}>
          <Box sx={{ my: 'auto' }}>
            <Typography sx={{ lineHeight: '1.25' }}>{header}</Typography>
            {subTitle && (
              <Typography variant="caption" mb={1} color="secondary">
                {subTitle}
              </Typography>
            )}
          </Box>
          {isAdd && (
            <Box sx={{ my: 'auto', ml: 'auto', mr: 2 }}>
              <Button size="small" variant="contained" color="primary" startIcon={<AddIcon />} onClick={onAdd}>
                <SpanLang keyLang={addLabel ?? 'ncrm_common_btn_add'} textOnly />
              </Button>
            </Box>
          )}
        </Grid>
      </Box>
      {children}
    </Box>
  );
};

export default Section;
