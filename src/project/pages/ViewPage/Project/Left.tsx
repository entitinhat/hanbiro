import AssignedRep from '@project/containers/ViewLeft/Project/Assigned';
import Planning from '@project/containers/ViewLeft/Project/Planning';
import Summary from '@project/containers/ViewLeft/Project/Summary';
import Timesheet from '@project/containers/ViewLeft/Project/Timesheet';
import { Project } from '@project/types/project';

interface LeftProps {
  menuSource: string;
  menuSourceId: string;
  data: Project;
}

const Left = (props: LeftProps) => {
  const { menuSource, menuSourceId, data } = props;

  return (
    <>
      <Summary item={data} />
      <AssignedRep members={data.members} />
      <Planning />
      <Timesheet />
    </>
  );
};

export default Left;
