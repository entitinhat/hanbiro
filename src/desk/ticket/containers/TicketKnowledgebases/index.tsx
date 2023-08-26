import AssignKBsContainer from '@desk/knowledge-base/containers/AssignKBsContainer';

interface TicketKnowledgebasesProps {
  menuSource: string;
  menuSourceId: string;
}

const TicketKnowledgebases = (props: TicketKnowledgebasesProps) => {
  const { menuSource, menuSourceId } = props;
  return (
    <>
      <AssignKBsContainer menuSource={menuSource} menuSourceId={menuSourceId} />
    </>
  );
};

export default TicketKnowledgebases;
