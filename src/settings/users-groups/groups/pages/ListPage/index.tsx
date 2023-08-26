import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_TABLE_PAGE_SIZE, LIST_TABLE_PAGE_SIZE_IAM } from '@base/config/constant';
import { useOrg } from '@base/hooks/iam/useOrg';


import { useEffect, useMemo, useState } from 'react';
import { GROUPS_COLUMNS } from '../../config/constants';
import { useGroups } from '../../hooks/useGroups';
import { Group, ListGroupsRequest } from '../../types/group';

import PageBody from './Body';
import PageHeader from './Header';
import PageQuickToolbar from './QuickToolbar';
import PageToolbar from './Toolbar';

interface ListPageProps {
  isShowToolbar?: boolean;
}
const ListPage = (props: ListPageProps) => {
  const { isShowToolbar = true } = props;
  const [itemsList, setItemsList] = useState<Group[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [cursor, setCursor] = useState<string | undefined>();
  const [maxResults, setMaxResults] = useState<number>(LIST_TABLE_PAGE_SIZE_IAM); //LIST_TABLE_PAGE_SIZE

  //================================================GET DAT=================================================
  const orgId = useOrg().id
  const req: ListGroupsRequest = {
    orgId: orgId,
    maxResults: maxResults
  };
  const { results, refetch, isLoading } = useGroups(req);

  useEffect(() => {
    if (results) {
      // console.log('data', results);
      const newItemList: any = results?.items;
      setItemsList(newItemList);
      setCursor(results?.nextCursor);
    }
  }, [results]);

  const onRefresh = () => {
    refetch && refetch();
  };
  const handleOnChecked = (checkedIds: string[]) => {
    // console.log('checkedIds', checkedIds);
    setSelectedIds([...checkedIds]);
  };
  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar onRefresh={onRefresh} />;
  }, []);
  const PageHeaderMemo = useMemo(() => {
    return <PageHeader onRefresh={onRefresh} />;
  }, []);
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        columns={GROUPS_COLUMNS}
        itemsList={itemsList}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={() => {}}
        nextCursor={cursor}
        isLoading={isLoading}
        onLoadMore={() => {
          setMaxResults((prev) => prev + LIST_TABLE_PAGE_SIZE);
        }}
      />
    );
  }, [selectedIds, results, itemsList, cursor]);
  const QuickToolbarMemo = useMemo(() => {
    return (
      <PageQuickToolbar
        checkedIds={selectedIds}
        onCancel={() => {
          handleOnChecked([]);
        }}
        refetch={onRefresh}
      />
    );
  }, [selectedIds]);

  // useEffect(() => {}, [orgsData]);
  return (
    <>
      <ListContainer>
        {isShowToolbar && PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {QuickToolbarMemo}
      </ListContainer>
    </>
  );
};

export default ListPage;
