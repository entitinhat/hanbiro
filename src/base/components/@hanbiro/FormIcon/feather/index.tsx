import * as Icons from 'react-feather';

export type IconName = keyof typeof Icons;

export type FeatureIconProps = {
  name: IconName;
};

const FeatureIcon = (props: FeatureIconProps) => {
  const { name, ...rest } = props;
  const IconTag = Icons[name];

  if (!IconTag) {
    return null;
  }

  return <IconTag {...rest} />;
};

export default FeatureIcon;
