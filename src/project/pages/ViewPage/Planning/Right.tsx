import Attachment from '@project/containers/ViewRight/Planning/Attachment';

interface RightProps {
  menuSource: string;
  menuSourceId: string;
}

const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;
  return (
    <>
      <Attachment />
    </>
  );
};

export default Right;
