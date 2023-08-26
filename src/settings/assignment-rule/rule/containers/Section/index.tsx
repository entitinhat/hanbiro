import { Box, Button, Grid, SxProps, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { useTranslation } from 'react-i18next';

interface SectionProps {
  header: string;
  subTitle?: string;
  isAdd?: boolean;
  addLabel?: string;
  children?: any;
  onAdd?: () => void;
  noBorder?: boolean;
}

const Section = (props: SectionProps) => {
  const { header, children, subTitle, isAdd = false, onAdd, addLabel, noBorder = false } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const border = '1px solid ' + theme.palette.divider;
  const backgroundColor = theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.secondary.lighter;

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        mb: 2,
        breakInside: 'avoid-column',
        backgroundColor: theme.palette.background.paper,
        border: noBorder ? 'none' : border,
        borderBottom: border
      }}
    >
      <Box
        sx={{
          height: '70px',
          display: 'flex',
          alignItems: 'center',
          py: 1.5,
          px: 2,
          borderBottom: border,
          backgroundColor: backgroundColor
        }}
      >
        <Grid sx={{ display: 'flex' }}>
          <Box sx={{ my: 'auto' }}>
            <Typography sx={{ fontWeight: 500, lineHeight: '1.25' }}>{t(header)}</Typography>
            {subTitle && (
              <Typography variant="caption" mb={1} color="secondary">
                {subTitle}
              </Typography>
            )}
          </Box>
          {isAdd && (
            <Box sx={{ my: 'auto', ml: 'auto', mr: 2 }}>
              <Button variant="contained" size={'small'} color="primary" startIcon={<AddIcon />} onClick={onAdd}>
                <SpanLang keyLang={addLabel ?? 'ncrm_common_btn_add'} textOnly />
              </Button>
            </Box>
          )}
        </Grid>
      </Box>
      <Box sx={{ p: '15px 16px' }}> {children}</Box>
    </Box>
  );
};

export default Section;
