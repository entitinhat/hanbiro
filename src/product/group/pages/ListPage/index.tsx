import { useMemo } from 'react';

import { ListContainer } from '@base/components/@hanbiro/List';

import Toolbar from './Toolbar';
import Body from './Body';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;

  return (
    <ListContainer>
      <Toolbar isSplitMode={false} category={'group'} />
      <Body />
    </ListContainer>
  );
};

export default ListPage;
