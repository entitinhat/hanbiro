import { useMemo, lazy } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import Attachments from '@base/containers/Attachments';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { useTheme } from '@mui/material';
interface RightProps {
  menuSource: string;
  menuSourceId: string;
}
const Right = (props: RightProps) => {
  const { menuSource, menuSourceId } = props;
  const theme = useTheme();
  const cards: CardProps[] = useMemo(() => {
    return [
      {
        title: 'Customer Information',
        component: <>Customer Information</>
      },
      {
        title: 'Knowledgebase',
        component: <>Knowledgebase</>
      },
      {
        title: 'Related Activities',
        component: <>Related Activities</>
      },
      {
        title: 'Attachments',
        component: <Attachments menuSource={menuSource} menuSourceId={menuSourceId} />
      }
    ];
  }, [menuSource, menuSourceId]);
  return (
    <>
      <ViewAsideContainer theme={theme}>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
