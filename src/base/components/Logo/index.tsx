import { Link } from 'react-router-dom';

import config, { headerFontColor } from '@base/config/config';
import { ButtonBase, Typography } from '@mui/material';
import { SxProps } from '@mui/system';
import VoraSales from '@base/assets/images/vora/sales.svg';
import VoraIcon from '@base/assets/images/vora/icon.svg';
import VoraDesk from '@base/assets/images/vora/desk.svg';
import VoraMarketing from '@base/assets/images/vora/marketing.svg';
import { baseUrl } from '@base/utils/vora';

interface LogoProps {
  sx?: SxProps;
  to?: string;
}
interface VoraProduct {
  logo: any;
  name: string;
}
function getVoraLogo(): VoraProduct {
  let productLogo = VoraDesk;
  let productText = 'Vora Desk';
  const prodType = baseUrl();
  if (prodType === '/desk') {
    productLogo = VoraDesk;
    productText = 'Vora Desk';
  } else if (prodType === '/sales') {
    productLogo = VoraSales;
    productText = 'Vora Sales';
  } else if (prodType === '/marketing') {
    productLogo = VoraMarketing;
    productText = 'Vora Marketing';
  }
  return {
    logo: productLogo,
    name: productText
  } as VoraProduct;
}
const Logo = ({ sx, to }: LogoProps) => {
  const { logo, name } = getVoraLogo();
  return (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to} sx={sx}>
      <img src={logo} alt={name} width={'130px'} height={'28px'} />
      {/* <Typography variant="h4" color={headerFontColor}>
        VoraWorks
      </Typography>
      <Typography component="span" color="primary.main" variant="subtitle1" sx={{ mt: -1 }}>
        Desk
      </Typography> */}
    </ButtonBase>
  );
};

export default Logo;
