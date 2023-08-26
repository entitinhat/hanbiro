import IconButton from '@base/components/@extended/IconButton';
import MainCard from '@base/components/App/MainCard';
import { CheckOutlined, CloseOutlined, DashboardOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import { Drawer, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

//Constant COLORS
const THEME_COLORS: string[] = [
  '#673ab7',
  '#db4437',
  '#3f51b5',
  '#4285f4',
  '#03a9f4',
  '#00bcd4',
  '#ff5722',
  '#ff9800',
  '#009688',
  '#4caf50',
  '#607d8b',
  '#9e9e9e'
];
const BG_COLORS: any = {
  '#673ab7': ['#f0ebf8', '#e1d8f1', '#d1c4e9', '#f6f6f6'],
  '#db4437': ['#fae3e1', '#f6d0cd', '#f2beb9', '#f6f6f6'],
  '#3f51b5': ['#eceef8', '#d9dcf0', '#c5cbe9', '#f6f6f6'],
  '#4285f4': ['#e3edfd', '#d0e1fc', '#bdd4fb', '#f6f6f6'],
  '#03a9f4': ['#d9f2fd', '#c0eafc', '#a7e1fb', '#f6f6f6'],
  '#00bcd4': ['#d9f5f9', '#bfeef4', '#a6e8f0', '#f6f6f6'],
  '#ff5722': ['#ffe6de', '#ffd5c8', '#ffc4b2', '#f6f6f6'],
  '#ff9800': ['#fff0d9', '#ffe5bf', '#ffdba6', '#f6f6f6'],
  '#009688': ['#d9efed', '#bfe5e1', '#a6dad5', '#f6f6f6'],
  '#4caf50': ['#e4f3e5', '#d2ebd3', '#c0e3c2', '#f6f6f6'],
  '#607d8b': ['#e7ecee', '#d7dfe2', '#c7d2d6', '#f6f6f6'],
  '#9e9e9e': ['#f0f0f0', '#e7e7e7', '#dddddd', '#f6f6f6']
};

interface SurveyThemeProps {
  isOpen: boolean;
  //headerImg?: any;
  themeColor: string;
  bgColor?: string;
  onClose: () => void;
  onSetSurveyHeaderImg?: (img: any) => void;
  onSetSurveyThemeColor?: (color: string, bgColor: string) => void;
  onSetSurveyBgColor?: (color: string) => void;
}

const SurveyTheme = (props: SurveyThemeProps) => {
  const {
    isOpen,
    //headerImg,
    themeColor,
    bgColor,
    onClose,
    onSetSurveyHeaderImg,
    onSetSurveyThemeColor,
    onSetSurveyBgColor
  } = props;

  const { t } = useTranslation();

  //change theme color
  function handleChangeThemeColor(color: any) {
    //set selected theme color
    onSetSurveyThemeColor && onSetSurveyThemeColor(color, BG_COLORS[color][0]);
    //save changes
    //saveTheme(color, BG_COLORS[color][0]);
  }

  //bg color change
  function handleChangeBgColor(color: any) {
    //set state
    onSetSurveyBgColor && onSetSurveyBgColor(color);
    //save changes
    //saveTheme(themeColor, color);
  }

  //upload new file
  function handleFileUploadChange(e: any) {
    //setIsLoading(true);
    //upload file
    const files = e.target.files;
    if (files.length > 0) {
      //call upload
      let formData = new FormData();
      formData.append('file', files[0]);
      // myAxios.post(apis.uploadImage, formData).then((res) => {
      //     setIsLoading(false);
      //     if (res.data.success) {
      //         //update image state
      //         const newFile = {};
      //         newFile.name = res.data.data.name;
      //         newFile.path = apis.getImage + '?path=' + res.data.data.path + res.data.data.name;
      //         //newFile.size = res.data.data.size;
      //         onSetSurveyHeaderImg(newFile.path);
      //         //save changes
      //         saveHeaderImage(newFile.path);
      //     }
      // })
      // .catch(function (error) {
      //     //// console.log(error);
      // });
    }
  }

  //reset header image
  function handleRemoveImage() {
    onSetSurveyHeaderImg && onSetSurveyHeaderImg(null);
    //save changes
    //saveHeaderImage("");
  }

  //
  const TitleRender = useMemo(() => {
    return (
      <Stack direction={'row'} alignItems="center" justifyContent={'space-between'}>
        <Stack direction={'row'} spacing={1} alignItems="center">
          <DashboardOutlined color="inherit" />
          <Typography>{t('ncrm_generalsetting_survey_theme_options')}</Typography>
        </Stack>
        <Stack>
          <IconButton shape="rounded" color="inherit" onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        </Stack>
      </Stack>
    );
  }, [isOpen]);

  //main render
  return (
    <Drawer
      sx={{ zIndex: 2001 }}
      anchor="right"
      onClose={onClose}
      open={isOpen}
      PaperProps={{
        sx: {
          width: 330
        }
      }}
    >
      {isOpen && (
        <MainCard
          title={TitleRender}
          sx={{
            border: 'none',
            borderRadius: 0,
            height: '100vh',
            '& .MuiCardHeader-root': {
              color: 'background.paper',
              //minHeight: headerHeight,
              py: 1,
              px: 3,
              bgcolor: 'primary.main'
            }
          }}
          //content={false}
        >
          <Stack spacing={2}>
            <Stack spacing={1.25}>
              <Typography>{t('ncrm_generalsetting_survey_theme_color')}</Typography>
              <Stack direction={'row'} alignItems="center" flexWrap={'wrap'}>
                {THEME_COLORS.map((color: string, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      height: themeColor === color ? '40px' : '30px',
                      width: themeColor === color ? '40px' : '30px',
                      borderRadius: themeColor === color ? '20px' : '15px',
                      backgroundColor: color,
                      margin: '8px'
                    }}
                    alignItems="center"
                    justifyContent={'center'}
                    onClick={() => handleChangeThemeColor(color)}
                    color="background.paper"
                  >
                    {themeColor === color && <CheckOutlined color="inherit" />}
                  </Stack>
                ))}
              </Stack>
            </Stack>
            <Stack spacing={1.25}>
              <Typography>{t('ncrm_generalsetting_survey_theme_background_color')}</Typography>
              <Stack direction={'row'} alignItems="center" flexWrap={'wrap'}>
                {BG_COLORS[themeColor].map((color: string, index: number) => (
                  <Stack
                    key={index}
                    sx={{
                      height: bgColor === color ? '40px' : '30px',
                      width: bgColor === color ? '40px' : '30px',
                      borderRadius: bgColor === color ? '20px' : '15px',
                      backgroundColor: color,
                      margin: '8px'
                    }}
                    alignItems="center"
                    justifyContent={'center'}
                    onClick={() => handleChangeBgColor(color)}
                    color="background.paper"
                  >
                    {bgColor === color && <CheckOutlined color="inherit" />}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </MainCard>
      )}
    </Drawer>
  );
};

export default SurveyTheme;
