import { useState } from 'react';

//third-party
import { Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

//project base
import ViewRight, { CardProps } from '@base/components/@hanbiro/ViewRight';
import ViewAsideContainer from '@base/components/@hanbiro/ViewPage/ViewAsideContainer';
import { PageLayoutData } from '@base/types/pagelayout';
import Note from '@base/containers/Notes';
import Activities from '@base/containers/Activities';
import Timeline from '@base/containers/TimeLine';

//menu
import IdentifyContacts from '@opportunity/containers/IdentifyContact';
import OpportunityCompetitors from '@opportunity/containers/Competitor';
import * as keyNames from '@opportunity/config/keyNames';

interface RightProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
  layoutData: PageLayoutData;
  onRefresh?: () => void;
}

function AddButton(props: { onClick?: () => void }) {
  const { onClick } = props;

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClick && onClick();
  };

  return (
    <Button variant="contained" startIcon={<Add />} size="small" onClick={handleOnClick}>
      Add
    </Button>
  );
}

const Right = (props: RightProps) => {
  const { menuSource, menuCategory, menuSourceId, layoutData, onRefresh } = props;
  const { t } = useTranslation();
  const [showAddCompetitor, setShowAddCompetitor] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);

  const cards: CardProps[] = [
    {
      title: t('Identify Contact Properties'),
      component: (
        <IdentifyContacts
          menuSourceId={menuSourceId}
          data={layoutData.data?.[keyNames.KEY_NAME_OPPORTUNITY_IDENTIFY_CONTACT] || []}
          isOpenNew={showAddContact}
          onCloseNew={() => setShowAddContact(false)}
          onRefresh={onRefresh}
        />
      ),
      isExpandable: true,
      addBtn: <AddButton onClick={() => setShowAddContact(true)} />
    },
    {
      title: t('Activities'),
      component: <Activities menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
      isExpandable: true,
      addBtn: <AddButton onClick={() => {}} />
    },
    {
      title: t('Timeline'),
      component: <Timeline menuSource={menuSource} menuSourceId={menuSourceId} isRecent />,
      isExpandable: true
    },
    {
      title: t('Competitor'),
      component: (
        <OpportunityCompetitors menuSourceId={menuSourceId} isOpenNew={showAddCompetitor} onCloseNew={() => setShowAddCompetitor(false)} />
      ),
      isExpandable: true,
      addBtn: <AddButton onClick={() => setShowAddCompetitor(true)} />
    },
    {
      title: t('Notes'),
      component: <Note menuSource={menuSource} menuSourceId={menuSourceId as string} isRecent />,
      isExpandable: true,
      addBtn: <AddButton onClick={() => {}} />
    }
  ];

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
