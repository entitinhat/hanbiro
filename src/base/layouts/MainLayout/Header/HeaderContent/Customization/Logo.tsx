import { ButtonBase, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

interface Props {
  sx?: SxProps;
  to?: string;
}

const LogoSection = ({ sx, to }: Props) => {
  const theme = useTheme();

  return (
    <Stack direction="row" sx={sx}>
      <ButtonBase
        disableRipple
        // component={Link} to={!to ? config.defaultPath : to}
      >
        <Typography variant="h3" color="common.white">
          VoraWorks
        </Typography>
      </ButtonBase>
      <Typography
        component="span"
        color="primary."
        sx={{ fontWeight: theme.typography.fontWeightBold }}
      >
        Desk
      </Typography>
    </Stack>
  );
};

export default LogoSection;
