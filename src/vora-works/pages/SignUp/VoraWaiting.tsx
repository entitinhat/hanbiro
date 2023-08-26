import MainCard from '@base/components/App/MainCard';
import Logo from '@base/components/Logo';
import { Box, CardMedia, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { Free_Service_Banner, ProductPlans } from '@vora-works/config/constants';
import { useFinishRegisterLicense } from '@vora-works/hooks/useFinishRegisterLicense';
import { ProductLicense } from '@vora-works/types';
import { useEffect, useState } from 'react';
import ToolBar from './ToolBar';
interface VoraWaitingProps {
  productLicense: ProductLicense | null;
}

export default function VoraWaiting(props: VoraWaitingProps) {
  const { productLicense } = props;
  const [registerId, setRegisterID] = useState<string>('');
  //get QueryData
  const req = {
    registerId: registerId
  };
  const { data, refetch, isSuccess } = useFinishRegisterLicense(req);
  useEffect(() => {
    if (productLicense) {
      const registedId = productLicense.orgId + '-' + productLicense.tenantId;
      setRegisterID(registedId);
    }
  }, [JSON.stringify(productLicense)]);

  useEffect(() => {
    if (isSuccess && productLicense) {
      if (data.result) {
        const continueUrl = productLicense.urls[0];
        window.location.replace(`http://${continueUrl}/welcome`);
      }
    }
  }, [isSuccess, data]);

  return (
    <>
      {/* <ToolBar title={<Logo />} center={true} /> */}

      <Typography marginBottom={5} textAlign="center" variant="h2">
        One moment, your site is starting up
      </Typography>
      <MainCard border={false}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={6}>
            <CardMedia width={'50px'} component="img" image={Free_Service_Banner} alt="Waiting Banner" />
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h3"> When you get in, explore all the products your'evaluating</Typography>
                {/* <Typography color="secondary" variant="body1">
                  Create a project to explore your Vora Works'features
                </Typography> */}
              </Grid>
              {ProductPlans.map((product) => {
                return (
                  <Grid key={product.menu} item xs={12}>
                    <Typography variant="h3">{product.value}</Typography>
                    <Typography color="secondary" variant="body1">
                      {product.label}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Box width="60%" sx={{ marginX: 'auto' }} marginTop={5}>
          <LinearProgress />
        </Box>
      </MainCard>
    </>
  );
}
