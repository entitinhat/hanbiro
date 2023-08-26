import { icons, mainIcons } from '@base/assets/icons/svg-icons';
import { IconType } from '@base/types/app';
import { getThemeColor } from '@base/utils/getColors';
import { styled, useTheme } from '@mui/material/styles';

import FeatherIcon from '../feather';
import MaterialIcon, { IconName } from '../Material';

export interface FormIconProps {
  icon: string; //name
  iconType?: IconType;
  color?: string;
  size?: number;
  fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
  attrs?: any;
  className?: string;
}

export const SpanIcon = styled('span')<FormIconProps>((props) => ({
  padding: 0,
  margin: 0,
  lineHeight: 0.65,
  svg: {
    width: `${props.size}px !important`,
    height: `${props.size}px !important`,
    stroke: props.color
  }
}));

const FormIcon = (props: FormIconProps) => {
  const theme = useTheme();
  const { icon, iconType = 'feather', color = 'currentColor', size = 18, fontSize, className, attrs } = props;
  const newColor = getThemeColor(theme, color);

  if (iconType === 'material') {
    return <MaterialIcon name={icon as IconName} fontSize={fontSize} {...attrs} />; //<Icon>star</Icon>; //
  } else if (iconType === 'feather') {
    return <FeatherIcon name={icon} size={size} color={newColor} className={className} {...attrs} />; //removed
  } else if (iconType === 'main' && mainIcons[icon]) {
    return (
      <SpanIcon size={size} color={newColor} className={className} {...attrs}>
        {mainIcons[icon] ? mainIcons[icon] : ''}
      </SpanIcon>
    );
  } else {
    return (
      <SpanIcon size={size} color={newColor} className={className} {...attrs}>
        {icons[icon] ? icons[icon] : ''}
      </SpanIcon>
    );
  }
};

// FormIcon.defaultProps = {
//   icon: 'Users', //default
//   iconType: 'feather',
//   color: 'currentColor',
//   size: 18,
//   attrs: {}
// };

export default FormIcon;
