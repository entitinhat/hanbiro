import * as Icons from '@mui/icons-material';

export type IconName = keyof typeof Icons;

export type MaterialIconProps = {
  name: IconName;
  fontSize?: "small" | "inherit" | "large" | "medium" | undefined;
};

const MaterialIcon = (props: MaterialIconProps) => {
  const { name, fontSize, ...rest } = props;
  const IconTag = Icons[name];

  if (!IconTag) {
    return null;
  }

  return <IconTag fontSize={fontSize} {...rest} />;
};

export default MaterialIcon;
