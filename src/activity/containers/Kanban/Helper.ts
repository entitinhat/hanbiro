import { Theme } from "@mui/material/styles";

export const getColor = (theme: Theme, value: string | undefined) => {
  switch (value) {
    case 'error':
      return theme.palette.error.main;

    case 'info':
      return theme.palette.info.main;

    case 'success':
      return theme.palette.success.main;

    case 'secondary':
      return theme.palette.secondary.main;

    case 'warning':
      return theme.palette.warning.main;

    default:
      return theme.palette.primary.main;
  }
};
