import { useMemo } from 'react';

import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import Attachments from '@base/containers/Attachments';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';
import * as keyNames from '@marketing-list/config/keyNames';
import { useTranslation } from 'react-i18next';
import RelatedCampaign from '@marketing-list/containers/RelatedCampaign';
import Timeline from '@marketing-list/containers/Timeline';
import Cost from '@marketing-list/containers/Cost';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData } = props;
  const { t } = useTranslation();

  const cards: CardProps[] = [];

  //general
  cards.push({
    title: t('Related Campaign'),
    component: <RelatedCampaign />
  });
  cards.push({
    title: t('Cost'),
    component: <Cost costs={layoutData?.data?.costs} />
  });
  cards.push({
    title: t('Timeline'),
    component: <Timeline />
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
