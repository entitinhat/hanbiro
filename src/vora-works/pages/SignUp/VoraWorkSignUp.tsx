import ToolBar from './ToolBar';
import { Box, Grid, styled, useTheme } from '@mui/material';
import SettingLanguage from './LanguageSetting';

import Services from './Services';
import useDevice from '@base/hooks/useDevice';
import { useLocation, useParams } from 'react-router-dom';
import MainCard from '@base/components/App/MainCard';
import FreeServices from '@vora-works/containers/FreeServices';

import { CardMedia } from '@mui/material';
import { CardContent } from '@mui/material';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import LoginForm from '@vora-works/containers/LoginForm';
import SignupSiteForm from '@vora-works/containers/SignupSiteForm';
import { Free_Service_Banner, ProductPlans } from '@vora-works/config/constants';
import { useOrg } from '@base/hooks/iam/useOrg';
import { useUserEmail } from '@settings/users-groups/users/hooks/useUserEmail';
import { ProductLicense } from '@vora-works/types';
interface VoraWorkSignUpProps {
  productValue: string | null;
  onSubmitSite: (productLicence: ProductLicense) => void;
}
export default function VoraWorkSignUp(props: VoraWorkSignUpProps) {
  const { productValue = 'vora-desk vora-iam', onSubmitSite } = props;
  //?products=vora-desk+vora-iam&edition=free&language=en
  const theme = useTheme();
  const { isMobile } = useDevice();
  const [registedEmail, setRegistedEmail] = useState<string>('');
  const [isVoraUser, setIsVoraUser] = useState(false);

  const { voraProducts, voraTitle } = useMemo(() => {
    let voraTitle: string = '';
    let voraProducts: string[] = [];
    if (productValue) {
      let voraProduct = productValue;
      // if (voraProduct !== 'vora-iam') {
      //   voraProduct += ' ' + 'vora-iam';
      // }
      let products = voraProduct.split(' ');
      let newProducts = products?.map((product) => {
        const productName = ProductPlans.find((item) => item.menu == product)?.value;
        return productName; //Ex:Vora Team Channel;
      });
      voraTitle = newProducts.join(' + ');

      voraProducts = newProducts.map((product) => {
        //Vora Team Channels -> Team Channels -> TeamChannels -> TEAMCHANNELS
        let newFormat = product?.split('Vora')[1].replace(/ /g, '').toUpperCase();
        // console.log('newFormat: ' + product?.split('Vora')[1].trim());
        return newFormat ? newFormat : '';
      });
    }
    //@Todo
    voraTitle = 'Vora Works';
    return {
      voraProducts: voraProducts,
      voraTitle: voraTitle
    };
  }, [productValue]);
  // console.log('voraProduct', voraProducts);
  const handleChangeEmail = (value: string) => {
    setRegistedEmail(value);
  };
  const handleResetEmail = () => {
    setRegistedEmail('');
  };

  //Get data user to check
  const { id: orgId } = useOrg();
  const { data, isSuccess, isLoading } = useUserEmail({ orgId: orgId, emails: [registedEmail] });

  //Check user by Email address
  useEffect(() => {
    if (data && isSuccess && data.id !== '') {
      setIsVoraUser(true);
    } else {
      setIsVoraUser(false);
    }
  }, [data, isSuccess]);

  useLayoutEffect(() => {}, []);

  // console.log('registedEmail', registedEmail);
  return (
    <>
      <ToolBar title={voraTitle} center={true} />
      <Grid
        sx={{
          padding: '0px 30px',
          ...(isMobile && {
            padding: 0
          })
        }}
        container
        spacing={2}
      >
        <Grid item xs={12} md={12} lg={6}>
          <MainCard sx={{ height: '100%', border: 0 }}>
            <CardMedia component="img" image={Free_Service_Banner} alt="Free Service Banner" />
            <CardContent>
              <FreeServices isCenter={false} showTitle={false} />
            </CardContent>
            {/* */}
          </MainCard>
        </Grid>
        <Grid item xs={12} md={12} lg={6}>
          <MainCard sx={{ height: '100%' }}>
            {registedEmail && !isLoading ? (
              <SignupSiteForm
                voraProducts={voraProducts}
                isVoraUser={isVoraUser}
                user={data}
                onResetEmail={handleResetEmail}
                registedEmail={registedEmail}
                onSubmitSite={onSubmitSite}
              />
            ) : (
              <LoginForm onLogin={handleChangeEmail} />
            )}
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
