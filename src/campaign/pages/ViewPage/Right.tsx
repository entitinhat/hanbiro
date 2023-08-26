//thỉrd-party
import { useTranslation } from 'react-i18next';

//project
import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import Attachments from '@base/containers/Attachments';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';

//menu
//import * as keyNames from '@campaign/config/keyNames';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const { t } = useTranslation();

  //const basicFields = layoutData?.layout?.data?.[0]?.children || [];
  const cards: CardProps[] = [];
  cards.push({
    title: t('common_section_attachment'),
    component: <Attachments menuSource={menuSource} menuSourceId={menuSourceId} />
  });

  //render
  return (
    <>
      <ViewAsideContainer>
        <ViewRight cards={cards} />
      </ViewAsideContainer>
    </>
  );
};

export default Right;
