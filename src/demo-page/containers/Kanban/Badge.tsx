import React, {useEffect, useState} from 'react';

import { Chip, ChipProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useSnackBar from '@base/hooks/useSnackBar';
import getCategoryBackgroundColor from "./Helper";
import { ICategory } from './Interface';

export interface BadgeProps {
  label: string;
  color?: ChipProps['color'];
  onClick?: ChipProps['onClick'];
  enqueuePushBarProps?: {
    user?: string;
    title?: string;
    message?: string;
  }
}

export const Badge = ({ label, color, onClick, enqueuePushBarProps }: BadgeProps) => {
  const theme = useTheme();
  const { enqueuePushBar } = useSnackBar();

  let chipProps: ChipProps = {
    label,
    color
  };

  if (!!onClick) {
    chipProps = {...chipProps, onClick};
  } else {
    if(!!enqueuePushBarProps){
      chipProps = {
        ...chipProps, onClick: () => {
          enqueuePushBar(
            enqueuePushBarProps?.user ?? '1',
            enqueuePushBarProps.title ?? '--Title here--',
            enqueuePushBarProps?.message ?? '--Message here--'
          );
        }
      };
    }
  }

  return <Chip {...chipProps} />;
};

interface DefaultBadgeProps extends BadgeProps {
  category: ICategory;
}

const withColor = (Component: React.FunctionComponent<BadgeProps>) => {
  return ({category, ...restProps}: DefaultBadgeProps) => {
    const theme = useTheme();
    const [color, setColor] = useState<ChipProps['color']>('primary');

    useEffect(() => {
      if (category) {
        const categoryColor = getCategoryBackgroundColor(theme, category);
        setColor(categoryColor);
      }
    }, [category]);

    return <Component color={color} enqueuePushBarProps={{
      user: '1',
      title: 'Check Todo',
      message: 'You have to finish by today.'
    }} {...restProps}/>;
  }
}

export default withColor(Badge);
