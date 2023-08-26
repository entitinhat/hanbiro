import AssignKBsContainer from '@desk/knowledge-base/containers/AssignKBsContainer';

interface KnowledgebasesProps {
  menuSource: string;
  menuSourceId: string;
}

const Knowledgebases = (props: KnowledgebasesProps) => {
  const { menuSource, menuSourceId } = props;
  return (
    <>
      <AssignKBsContainer menuSource={menuSource} menuSourceId={menuSourceId} />
    </>
  );
};

export default Knowledgebases;
