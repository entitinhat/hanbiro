import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

const PublishViewField = (props: any) => {
  const { keyName, value, menuSource, menuSourceId, userPermission, ...remainProps } = props;

  return (
    <CommonViewField
      keyName={keyName}
      value={value}
      menuSource={menuSource}
      menuSourceId={menuSourceId}
      userPermission={userPermission}
      componentView={View}
      componentEdit={Edit}
      {...remainProps}
    />
  );
};

export default PublishViewField;
