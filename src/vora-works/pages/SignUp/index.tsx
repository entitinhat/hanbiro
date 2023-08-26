import { Box, styled, useTheme } from '@mui/material';

import useDevice from '@base/hooks/useDevice';
import { useLocation, useNavigate } from 'react-router-dom';
import VoraSelectService from './VoraSelectService';
import VoraWorkSignUp from './VoraWorkSignUp';
import { validateSignUpURl } from './Helper';
import { useState } from 'react';
import { ProductLicense } from '@vora-works/types';
import VoraWaiting from './VoraWaiting';
import * as keyNames from '@vora-works/config/keyNames';
export const CenterLayout = styled(Box)(({ theme }) => ({
  minHeight: '300px',
  margin: '20px auto',
  padding: '10px 16px 24px',
  color: 'rgb(66, 82, 110)'
}));

export default function VoraSignUp() {
  //?products=vora-desk+vora-iam&edition=free&language=en
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [productLicense, setProductLicense] = useState<ProductLicense | null>(null);
  //Move to vora workspace sign up
  const { search } = useLocation();
  const navigate = useNavigate();
  const parameters = new URLSearchParams(search);
  const formUrl = validateSignUpURl(parameters);

  const handleSubmitSite = (response: ProductLicense) => {
    const productUrl = formUrl.productUrl.replace(' ', '+');
    const editionUrl = formUrl.languageUrl;
    const languageUrl = formUrl.editionUrl;

    const confirmationUrl = 1;
    const continueUrl = response.urls[0];
    const newUrl = `?${keyNames.URL_PRODUCTS}=${productUrl}&${keyNames.URL_EDITION}=${editionUrl}&${keyNames.URL_LANGUAGE}=${languageUrl}&${keyNames.URL_CONFIRMATION}=${confirmationUrl}&${keyNames.URL_CONTINUE}=${continueUrl}`;
    setProductLicense(response);
    navigate(newUrl);
  };

  // console.log('search', search);
  return (
    <Box sx={{ backgroundColor: theme.palette.background.paper, height: '100vh' }} className="scroll-box">
      <CenterLayout sx={{ maxWidth: isMobile ? '100%' : '80%' }}>
        {!formUrl.isAllowed && <VoraSelectService />}
        {formUrl.isAllowed && !productLicense && <VoraWorkSignUp onSubmitSite={handleSubmitSite} productValue={formUrl.productUrl} />}
        {formUrl.isAllowed && productLicense && <VoraWaiting productLicense={productLicense} />}
      </CenterLayout>
    </Box>
  );
}
