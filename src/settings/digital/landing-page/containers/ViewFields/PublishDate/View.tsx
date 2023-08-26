import { TextView } from '@base/config/view-field/components';
import { convertDateTimeServerToClient } from '@base/utils/helpers';

const View = (props: any) => {
  const { value, keyname, menuSourceId, menuSource } = props;
  return (
    <TextView
      value={convertDateTimeServerToClient({ date: value, isTime: true, humanize: true })}
      keyName = {keyname}
      menuSourceId = {menuSourceId}
      menuSource = {menuSource}
    />
    // <>{convertDateTimeServerToClient({ date: value, isTime: true, humanize: true })}</>  
  );
};

export default View;
