import { Planning } from '@project/types/planning';
import Summary from '@project/containers/ViewLeft/Planning/Summary';
import Attachment from '@project/containers/ViewRight/Planning/Attachment';

interface LeftProps {
  menuSource: string;
  menuSourceId: string;
  data: Planning;
}

const Left = (props: LeftProps) => {
  const { menuSource, menuSourceId, data } = props;

  return (
    <>
      <Summary item={data} />
      <Attachment />
    </>
  );
};

export default Left;
