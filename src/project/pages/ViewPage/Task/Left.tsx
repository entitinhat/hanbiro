import AssignedRep from '@project/containers/ViewLeft/Task/Assigned';
import Progress from '@project/containers/ViewLeft/Task/Progress';
import Summary from '@project/containers/ViewLeft/Task/Summary';

interface LeftProps {
  menuSource: string;
  menuSourceId: string;
}

const Left = (props: LeftProps) => {
  const { menuSource, menuSourceId } = props;

  return (
    <>
      <Progress />
      {/* <Summary /> */}
      <AssignedRep />
    </>
  );
};

export default Left;
