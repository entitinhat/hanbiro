import { PalettesProps } from '@ant-design/colors';
import { PaletteThemeProps } from '@base/types/theme';
import { PaletteColorOptions } from '@mui/material/styles';

const Default = (colors: PalettesProps): PaletteThemeProps => {
  const { blue, red, gold, cyan, green, grey, magenta, purple, orange, yellow, lime, volcano } = colors;
  const greyColors: PaletteColorOptions = {
    0: grey[0],
    50: grey[1],
    100: grey[2],
    200: grey[3],
    300: grey[4],
    400: grey[5],
    500: grey[6],
    600: grey[7],
    700: grey[8],
    800: grey[9],
    900: grey[10],
    A50: grey[15],
    A100: grey[11],
    A200: grey[12],
    A400: grey[13],
    A700: grey[14],
    A800: grey[16]
  };
  const contrastText = '#fff';

  return {
    primary: {
      lighter: blue[0],
      100: blue[1],
      200: blue[2],
      light: blue[3],
      400: blue[4],
      main: blue[5],
      dark: blue[6],
      700: blue[7],
      darker: blue[8],
      900: blue[9],
      contrastText
    },
    secondary: {
      lighter: greyColors[100],
      100: greyColors[100],
      200: greyColors[200],
      light: greyColors[300],
      400: greyColors[400],
      main: greyColors[500]!,
      600: greyColors[600],
      dark: greyColors[700],
      800: greyColors[800],
      darker: greyColors[900],
      A100: greyColors[0],
      A200: greyColors.A400,
      A300: greyColors.A700,
      contrastText: greyColors[0]
    },
    error: {
      lighter: red[0],
      light: red[2],
      main: red[4],
      dark: red[7],
      darker: red[9],
      contrastText
    },
    warning: {
      lighter: gold[0],
      light: gold[3],
      main: gold[5],
      dark: gold[7],
      darker: gold[9],
      contrastText: greyColors[100]
    },
    info: {
      lighter: cyan[0],
      light: cyan[3],
      main: cyan[5],
      dark: cyan[7],
      darker: cyan[9],
      contrastText
    },
    success: {
      lighter: green[0],
      light: green[3],
      400: green[4],
      main: green[5],
      600: green[6],
      dark: green[7],
      darker: green[9],
      contrastText
    },
    grey: greyColors,
    magenta: {
      lighter: magenta[0],
      light: magenta[3],
      main: magenta[5],
      dark: magenta[7],
      darker: magenta[9],
      contrastText
    },
    yellow: {
      lighter: yellow[0],
      light: yellow[3],
      main: yellow[5],
      dark: yellow[7],
      darker: yellow[9],
      contrastText
    },
    purple: {
      lighter: purple[0],
      light: purple[3],
      400: purple[4],
      main: purple[5],
      dark: purple[7],
      darker: purple[9],
      contrastText
    },
    orange: {
      lighter: orange[0],
      light: orange[3],
      main: orange[5],
      dark: orange[7],
      darker: orange[9],
      contrastText
    },
    lime: {
      lighter: lime[0],
      light: lime[3],
      main: lime[5],
      dark: lime[7],
      darker: lime[9],
      contrastText
    },
    volcano: {
      lighter: volcano[0],
      light: volcano[3],
      main: volcano[5],
      dark: volcano[7],
      darker: volcano[9],
      contrastText
    },
    header: '#1e1e1e',
    link: blue[5]
  };
};

export default Default;
