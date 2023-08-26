import { Link as RouteLink } from 'react-router-dom';
import Typography, { TypographyTypeMap } from '@mui/material/Typography';
import { ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';

interface RouteNameProps {
  name: string;
  url: string;
  color?: string;
  component?: React.ElementType;
  variant?: TypographyTypeMap['props']['variant'];
  children?: ReactNode;
  endChildren?: ReactNode;
  sx?: SxProps<Theme>;
  isRead?: Boolean;
}

const RouteName = (props: RouteNameProps) => {
  const { name, url, color = 'link', component = 'span', variant, children, sx, endChildren, isRead = true } = props;
  return (
    <RouteLink to={url} style={{ textDecoration: 'none', display: 'flex' }}>
      {children}
      <Typography noWrap color={color} component={component} variant={variant} sx={sx} style={{ fontWeight: isRead === false? "bold" : "400" }}>
        {name}
      </Typography>
      {endChildren}
    </RouteLink>
  );
};

export default RouteName;
