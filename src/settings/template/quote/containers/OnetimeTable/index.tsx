import OrderItems from "@base/containers/OrderItems";
import {isArray} from "lodash";

interface OnetimeProps {
  mode?: 'v' | 'w'
  value?: any;
  onChange?: (items: any[]) => void;
}

export default (props: OnetimeProps) => {
  const {mode = 'w', value = [], onChange} = props;
  const values = isArray(value) ? value : [];

  return <OrderItems
    title={null}
    mode={mode === 'v' ? 'p' : mode}
    value={values}
    onChange={(items: any[]) => onChange && onChange(items)}
  />;
}