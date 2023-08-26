import { Avatar, Stack, Tooltip, Typography } from '@mui/material';
import React, { Ref, forwardRef } from 'react';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string, size: Size) {
  const names = name ? name.split(' ') : ['D'];
  let mark = names[0][0];
  if (names.length > 1) {
    mark += names[1][0];
  }
  return {
    sx: {
      bgcolor: stringToColor(name ?? ''),
      ...getSize(size)
    },
    children: mark ?? 'E'
  };
}

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function getSize(size: Size) {
  switch (size) {
    case 'xs': {
      return { width: 24, height: 24, fontSize: '0.75rem' };
    }
    case 'sm': {
      return { width: 32, height: 32, fontSize: '0.875rem' };
    }
    case 'md': {
      return { width: 40, height: 40, fontSize: '1rem' };
    }
    case 'lg': {
      return { width: 48, height: 48, fontSize: '1.125rem' };
    }
    case 'xl': {
      return { width: 64, height: 64, fontSize: '1.5rem' };
    }
    default: {
      return { width: 40, height: 40, fontSize: '1rem' };
    }
  }
}

interface AvatarProps {
  size?: Size;
  name: string;
  photo?: string;
}

interface AvatarWithTextProps extends AvatarProps {
  withText: boolean;
}

function HanAvatar(props: AvatarProps) {
  const { size = 'sm', name, photo } = props;

  return (
    <Tooltip title={name}>
      <Avatar {...(photo ? { sx: getSize(size) } : stringAvatar(name, size))} alt={name} src={photo ?? ''} />
    </Tooltip>
  );
}

// if you want to use avatar inside tooltip
// export const HanAvatarWithText = React.forwardRef(function HanAvatar(props: AvatarWithTextProps, ref) {
//   const { size = 'sm', name, photo, withText = false } = props;

//   return (
//     <Stack direction="row" alignItems="center" {...props} ref={ref}>
//       <Avatar {...(photo ? { sx: getSize(size) } : stringAvatar(name, size))} alt={name} src={photo ?? ''} />
//       {withText && <Typography variant="body1">{name}</Typography>}
//     </Stack>
//   );
// });
export const HanAvatarWithText = forwardRef((props: AvatarWithTextProps, ref: Ref<HTMLDivElement>) => {
  const { size = 'sm', name, photo, withText = false } = props;

  return (
    <Stack direction="row" alignItems="center" {...props} ref={ref}>
      {/* <Avatar {...(photo ? { sx: getSize(size) } : stringAvatar(name, size))} alt={name} src={photo ?? ''} /> */}
      {withText && <Typography variant="body1">{name}</Typography>}
    </Stack>
  );
});

export default HanAvatar;
