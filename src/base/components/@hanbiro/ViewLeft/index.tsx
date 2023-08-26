import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography, styled, Box, Theme } from '@mui/material';
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface LeftItem {
  title?: React.ReactNode | string;
  sections?: LeftItem[];
  component?: React.ReactNode;
}

export interface ViewLeftProps {
  items: LeftItem[];
}

const ViewAsideContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiAccordion-root': {
    border: `1px solid`,
    borderColor: `${theme.palette.divider} `,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent ',
      flexDirection: 'row ',
      '& .MuiAccordionSummary-content': {
        marginLeft: 0
      },
      '& .MuiAccordionSummary-expandIconWrapper': {
        display: 'none'
      }
    },
    '& .MuiAccordionDetails-root': {
      borderColor: `${theme.palette.divider} `,
      padding: 0,
      paddingTop: 8
    }
  }
}));

const ViewLeft = (props: ViewLeftProps) => {
  const { items } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <ViewAsideContainer>
      {items.length > 0 &&
        items.map((item, itemIdx) => {
          return (
            <Accordion defaultExpanded 
              sx={{ 
                border: '1px solid' + theme.palette.divider, 
                '&:first-of-type' : {
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                },
                '&:last-of-type' : {
                  borderBottomLeftRadius: '4px',
                  borderBottomRightRadius: '4px',
                }
              }} 
              key={itemIdx}>

              {item.title && <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{ padding: '10px 16px' }}>
                <Stack direction="row" alignItems="center">
                  <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                    {item.title}
                  </Typography>
                </Stack>
              </AccordionSummary>}

              <AccordionDetails 
              sx={{ 
                border: '0px !important',
                p: `0px !important`
              }}
              >
                {item.sections && item.sections?.map((section, secIdx) => {
                  return (
                    <Accordion defaultExpanded sx={{ 
                      borderLeft: '0px !important',
                      borderRight: '0px !important',
                      borderTop: item.title ? '1px' : '0px !important' ,
                      '&.Mui-expanded:last-of-type': {
                        borderBottom: '0px !important'
                      }
                    }}
                    key={secIdx}
                    >
                      {section.title && 
                      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" 
                      sx={{ 
                        minHeight: 'unset', 
                        py: 1.25,
                        '& .MuiAccordionSummary-content':{
                          margin: 0, 
                        }
                        }}
                        >
                        <Stack direction="row" alignItems="center">
                          <Typography color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                            {section.title}
                          </Typography>
                        </Stack>
                      </AccordionSummary>
                      }
                      <AccordionDetails 
                      sx={{ 
                        borderTop: section.title ? '1px solid' : '0px',
                        pb: 0
                        }}>
                        {section.component && section.component}
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
                <Box>{item.component && item.component}</Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </ViewAsideContainer>
  );
};

export default ViewLeft;