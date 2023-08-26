import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';

interface Props extends CommonViewProps {
  value: any;
}

const View = (props: Props) => {
  const { value } = props;

  return <ListTableCellDroplist values={value} />;
};

export default View;