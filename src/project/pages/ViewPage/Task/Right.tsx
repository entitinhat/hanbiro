import Attachment from '@project/containers/ViewRight/Task/Attachment';
import Dependency from '@project/containers/ViewRight/Task/Dependency';
import Links from '@project/containers/ViewRight/Task/Links';

interface RightProps {
  menuSource: string;
  menuSourceId: string;
}

const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;
  return (
    <>
      <Dependency />
      <Attachment />
      <Links />
    </>
  );
};

export default Right;
