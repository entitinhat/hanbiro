import { useEffect, useState } from 'react';

//third-party
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  Typography,
  useTheme,
  Grid,
  styled,
  Box,
  Theme,
  InputLabel
} from '@mui/material';
import { Add } from '@mui/icons-material';

//project base
//import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';

//local
import Header from './Header';
import Products from './Products';
import Members from './Members';
import ProductWritePage from '../Write/Products';
import MemberWritePage from '../Write/Members';

const ViewAsideContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiAccordion-root': {
    // border: 'none !important',
    border: ` 1px solid !important`,
    borderRadius: 4,
    borderColor: `${theme.palette.divider} !important`,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent !important',
      flexDirection: 'row !important',
      '& .MuiAccordionSummary-content': {
        marginLeft: 0
      }
      // '& .MuiAccordionSummary-expandIconWrapper': {
      //   display: 'none'
      // }
    },
    '& .MuiAccordionDetails-root': {
      borderColor: `${theme.palette.divider} !important`
      // border: 'none !important',
      // padding: 8,
      // paddingTop: 0
    },
    '& .Mui-expanded': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

interface SalesTeamViewProps {
  id: string;
  data?: any;
  onAdd?: () => void;
  onBack?: () => void;
  onSave?: (item: any) => void;
}

const View = (props: SalesTeamViewProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { id, data, onAdd, onBack, onSave } = props;

  //state
  const [teamData, setTeamData] = useState<any>(null);
  const [isProductWrite, setIsProductWrite] = useState<boolean>(false);
  const [isMemberWrite, setIsMemberWrite] = useState<boolean>(false);
  console.log('view data', data);

  //initial data
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(teamData)) {
      setTeamData(data);
    }
  }, [data]);

  //product change
  const handleProductChange = (newProducts: any) => {
    const newTeam = { ...teamData };
    newTeam.products = newProducts;
    onSave && onSave(newTeam);
  };

  //add new product
  const handleAddProduct = (newProduct: any) => {
    const newTeam = { ...teamData };
    newTeam.products.push(newProduct);
    onSave && onSave(newTeam);
    //close write form
    setIsProductWrite(false);
  };

  return (
    <>
      <Header data={{ id: teamData?.id, name: teamData?.name }} onAdd={onAdd} onBack={onBack} />

      <ViewAsideContainer theme={theme}>
        <Stack spacing={1}>
          <Accordion defaultExpanded>
            <AccordionSummary>
              <Stack spacing={1} direction="row" alignItems="center">
                <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                  {t(`Sales Team Name`)}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={1} sx={{ width: '100%', margin: 0 }}>
                <Stack spacing={2}>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Team Leader:</InputLabel>
                    <Typography>{teamData?.leader?.displayName}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Description:</InputLabel>
                    <Typography>{teamData?.description}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Email Alias:</InputLabel>
                    <Typography>{teamData?.email}@vora.net</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Assignment Rule:</InputLabel>
                    <Typography>{teamData?.assignmentRule?.name}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded expanded>
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content': {
                  display: 'inline'
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  display: 'none'
                }
              }}
            >
              <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                  {t(`Products`)}
                </Typography>
                <Button variant="contained" startIcon={<Add />} onClick={() => setIsProductWrite(true)} size={'small'}>
                  {t(`ncrm_common_btn_add`)}
                </Button>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Products tableSx={{ border: 0 }} value={teamData?.products || []} onChange={handleProductChange} />
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded expanded>
            <AccordionSummary
              sx={{
                '& .MuiAccordionSummary-content': {
                  display: 'inline'
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  display: 'none'
                }
              }}
            >
              <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                  {t(`Team Members`)}
                </Typography>
                <Button variant="contained" startIcon={<Add />} size={'small'} onClick={() => setIsMemberWrite(true)}>
                  {t(`ncrm_common_btn_add`)}
                </Button>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Members tableSx={{ border: 0 }} value={teamData?.members || []} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </ViewAsideContainer>

      {isProductWrite && <ProductWritePage isOpen={isProductWrite} onClose={() => setIsProductWrite(false)} onAdd={handleAddProduct} />}

      {isMemberWrite && <MemberWritePage value={''} isOpen={isMemberWrite} onClose={() => setIsMemberWrite(false)} />}
    </>
  );
};

export default View;
