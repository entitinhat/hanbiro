import { CustomerQuickView as TextView } from '@base/containers/QuickView';
import { IdName } from '@settings/assignment-rule/rule/services/ticket-service';
interface ViewProps {
  value: IdName;
}
const View = (props: ViewProps) => {
  const { value } = props;
  return (
    <>
      <TextView value={value} />
    </>
  );
};

export default View;
