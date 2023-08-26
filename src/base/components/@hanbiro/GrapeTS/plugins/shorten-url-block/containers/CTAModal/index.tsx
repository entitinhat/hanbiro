//project
import MiModal from '@base/components/@hanbiro/MiModal';
import { useCtaAll } from '@settings/digital/cta/hooks/useCtas';
import { useEffect, useState } from 'react';
import { groupByOptions } from '@settings/digital/cta/config/list-field';
import { IconType } from '@base/types/app';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import { useGenerateQRCode } from '@base/hooks/generate-qrcode/useGenerateQRCode';
import { useConvertToHTML } from './Helper';
import CtaImagePreview from '@settings/digital/cta/components/CtaImagePreview';

//Material-ui
import {
  Badge,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  ImageList,
  List,
  ListItemButton,
  Tab,
  Tabs,
  Typography,
  useTheme
} from '@mui/material';
import SmartButtonIcon from '@mui/icons-material/SmartButton';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LinkIcon from '@mui/icons-material/Link';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';
import NoData from '@base/components/@hanbiro/NoData';

interface CTAModalProps {
  editor: any;
  component?: string;
  isOpen?: boolean;
  onClose: () => void;
}

interface Tab {
  value: string;
  title: string;
  icon: string;
  iconType: IconType;
}
const TABS: Tab[] = [
  { value: 'image', title: 'Image', icon: 'AddPhotoAlternate', iconType: 'material' },
  { value: 'qrCode', title: 'QR Code', icon: 'QrCode', iconType: 'material' },
  { value: 'text', title: 'Text', icon: 'TextFormat', iconType: 'material' },
  { value: 'url', title: 'Url', icon: 'Link', iconType: 'material' }
];

const CTAModal = (props: CTAModalProps) => {
  const { editor, isOpen = false, onClose, component } = props;
  const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
  const [groupBy, setGroupBy] = useState<string>('image');
  const [curCTA, setCurCTA] = useState<any>();
  const params = {
    content: curCTA?.linkUrl,
    width: 150,
    margin: 10,
    scale: 10,
    darkColor: '#00F',
    lightColor: '#0000'
  };
  const { data } = useGenerateQRCode(params, curCTA?.linkUrl, { enabled: groupBy === 'qrCode' && curCTA !== null });
  console.log('outerQRData:', data);
  const { results: postData, status } = useCtaAll({
    filter: {
      paging: {
        size: 99,
        page: 1
      },
      query: 'groupBy=' + groupBy
    }
  });
  useEffect(() => {
    if (curCTA && !(groupBy == 'qrCode' && !data)) {
      const selector = `#${component}`;
      const SelectedComponent = editor?.DomComponents?.getWrapper().find(selector)[0];
      useConvertToHTML[groupBy](SelectedComponent, curCTA, data);
      setCurCTA(null);
      onClose && onClose();
    }
  }, [curCTA, data]);

  const onClick = (cta: any) => {
    setCurCTA(cta);
    console.log('onClickCTA', cta);
  };

  //===================Handler
  const handleChange = (event: React.SyntheticEvent, newValue: Tab) => {
    console.log('newvalue', newValue);
    setActiveTab(newValue);
    setGroupBy(newValue.value);
  };

  const ImageCtaPreview = (cta: any) => {
    if (cta?.cta?.imgUrl?.length > 0 && isOpen) {
      return <CtaImagePreview imgSrc={cta?.cta?.imgUrl} imgSize={{ width: '50px', height: '50px' }} imgAlt={cta?.cta?.imgAlt} />;
    } else return <></>;
  };
  const theme = useTheme();
  return (
    <MiModal
      title={'Select CTA'}
      isOpen={isOpen} //writeOption.isOpenWrite
      size="sm"
      fullScreen={false}
      onClose={onClose}
    >
      <Box id="grapeModalID">
        <List id="modal-body" sx={{ width: '100%' }}>
          <Tabs value={activeTab} onChange={handleChange} variant="fullWidth">
            {TABS.map((tab, index) => (
              <Tab key={index} icon={<FormIcon icon={tab.icon} iconType={tab.iconType} />} label={tab.title} value={tab} />
            ))}
          </Tabs>
          {postData ? (
            <Box sx={{ height: '60vh' }} className="scroll-box">
              {status == 'loading' && <LoadingCircular loading={status == 'loading'} />}
              {groupBy == groupByOptions[1].value ? (
                <Grid container spacing={2} sx={{ p: '10px' }}>
                  <Grid item xs={12}>
                    <ImageList sx={{ overflow: 'visible' }} cols={2} rowHeight={350}>
                      {postData?.data?.map((cta: any, index: number) => {
                        return (
                          <Card
                            key={index}
                            sx={{
                              border: `1px solid ${theme.palette.divider}`,
                              marginBottom: '10px',
                              overflow: 'visible'
                            }}
                            onClick={() => onClick(cta)}
                          >
                            <Badge
                              sx={{
                                width: '100%',
                                '&.MuiBadge-badge': {
                                  zIndex: '100'
                                }
                              }}
                              component="div"
                              color="success"
                            >
                              <CardActionArea>
                                <CardContent component="div" sx={{ height: 230, overflow: 'hidden' }}>
                                  <CardMedia
                                    component="img"
                                    sx={{ objectFit: 'cover', marginBottom: '5px' }}
                                    image={cta?.imgUrl}
                                    alt={cta?.imgAlt}
                                  />
                                </CardContent>

                                <Divider />
                                <Typography variant="h6" sx={{ padding: '15px' }}>
                                  {cta?.name}
                                </Typography>
                              </CardActionArea>
                            </Badge>
                          </Card>
                        );
                      })}
                      {status == 'loading' && <CircularProgress />}
                    </ImageList>
                  </Grid>
                </Grid>
              ) : (
                postData?.data?.map((cta: any, index: number) => {
                  return (
                    <ListItemButton key={index} sx={{ display: 'flex' }} onClick={() => onClick(cta)}>
                      <Box
                        sx={{
                          maxHeight: '100px',
                          maxWidth: '100px',
                          mr: '10px'
                        }}
                      >
                        {/* {groupBy == groupByOptions[1].value && <ImageCtaPreview cta={cta} />} */}
                        {groupBy == groupByOptions[2].value && <SmartButtonIcon fontSize="large" />}
                        {groupBy == groupByOptions[3].value && <QrCode2Icon fontSize="large" />}
                        {groupBy == groupByOptions[4].value && <LinkIcon fontSize="large" />}
                      </Box>
                      <Box>
                        <Typography sx={{ fontSize: '16px' }}>{cta.name}</Typography>
                      </Box>
                    </ListItemButton>
                  );
                })
              )}
            </Box>
          ) : (
            <Box sx={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {status == 'loading' ? <CircularProgress /> : <NoData />}
            </Box>
          )}
        </List>
      </Box>
    </MiModal>
  );
};

export default CTAModal;
