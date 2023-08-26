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

//menu
import { useSalesTeam } from '@settings/preferences/hooks/sales/useSalesTeam';

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
  onAdd?: () => void;
  onBack?: () => void;
  onSave?: (item: any) => void;
}

const View = (props: SalesTeamViewProps) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { id, onAdd, onBack } = props;

  //state
  const [teamData, setTeamData] = useState<any>(null);
  const [isProductWrite, setIsProductWrite] = useState<boolean>(false);
  const [isMemberWrite, setIsMemberWrite] = useState<boolean>(false);

  //hook get view data
  const { data: postData } = useSalesTeam(id);
  //console.log('view postData', postData);

  useEffect(() => {
    if (postData) {
      setTeamData({
        ...postData,
        members: postData.members || [],
        products: postData.products || []
      });
    }
  }, [postData]);

  //add new product
  const handleAddProduct = (newProduct: any) => {
    const newTeam = { ...teamData };
    newTeam.products.push(newProduct);
    setTeamData(newTeam);
  };

  //add new member
  const handleAddMember = (newMember: any) => {
    const newTeam = { ...teamData };
    newTeam.members.push(newMember);
    setTeamData(newTeam);
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
                    <Typography>{teamData?.leader?.user?.name || ''}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Description:</InputLabel>
                    <Typography>{teamData?.description || ''}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Email Alias:</InputLabel>
                    <Typography>{teamData?.email || ''}</Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={1}>
                    <InputLabel>Assignment Rule:</InputLabel>
                    <Typography>{teamData?.assignmentRule?.name || ''}</Typography>
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
              <Products teamId={teamData?.id} tableSx={{ border: 0 }} value={teamData?.products || []} />
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
              <Members teamId={teamData?.id} tableSx={{ border: 0 }} value={teamData?.members || []} />
            </AccordionDetails>
          </Accordion>
        </Stack>
      </ViewAsideContainer>

      {isProductWrite && (
        <ProductWritePage teamId={teamData.id} isOpen={isProductWrite} onClose={() => setIsProductWrite(false)} onAdd={handleAddProduct} />
      )}

      {isMemberWrite && (
        <MemberWritePage teamId={teamData.id} isOpen={isMemberWrite} onClose={() => setIsMemberWrite(false)} onAdd={handleAddMember} />
      )}
    </>
  );
};

export default View;
