import { useEffect, useMemo, useState } from 'react';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_TABLE_PAGE_SIZE, LIST_TABLE_PAGE_SIZE_IAM } from '@base/config/constant';

import PageBody from './Body';
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageQuickToolbar from './QuickToolbar';

import _ from 'lodash';
import useDevice from '@base/hooks/useDevice';
import { ListUsersRequest, User } from '@settings/users-groups/users/types';

import { useUsers } from '@settings/users-groups/users/hooks/useUsers';
import { useOrg } from '@base/hooks/iam/useOrg';

import { USER_COLUMNS } from '../../config/constants';

interface ListPageProps {}

const ListPage = (props: ListPageProps) => {
  const { isMobile } = useDevice();

  //===================================================State======================================================
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [itemsList, setItemsList] = useState<User[]>([]);
  const [cursor, setCursor] = useState<string | undefined>();
  const [maxResults, setMaxResults] = useState<number>(LIST_TABLE_PAGE_SIZE_IAM); //LIST_TABLE_PAGE_SIZE

  //======================================================GET DATA=================================================
  const { id } = useOrg();
  const req: ListUsersRequest = {
    orgId: id,
    maxResults: maxResults
  };
  const { status, results, refetch } = useUsers(req);

  useEffect(() => {
    // console.log('useEffect', isLoading, data);
    if (status !== 'loading' && results) {
      // console.log('settings group/user ->>USERS LIST', results);
      setCursor(results.nextCursor);
      setItemsList(results.items);
    }
  }, [results]);
  //=================================================HANDLE===========================================================

  const onRowChecked = (checkedIds: string[]) => {
    setCheckedIds([...checkedIds]);
  };
  const onRefresh = () => {
    refetch && refetch();
  };

  //==========================================================Render=====================================

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar onRefresh={onRefresh} />;
  }, [results]);

  const PageHeaderMemo = useMemo(() => {
    return <PageHeader onRefresh={onRefresh} />;
  }, [results]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        columns={USER_COLUMNS}
        itemsList={itemsList}
        checkedIds={checkedIds}
        onChecked={onRowChecked}
        refetch={() => {}}
        nextCursor={cursor}
        isLoading={status === 'loading'}
        onLoadMore={() => {
          setMaxResults((prev) => prev + LIST_TABLE_PAGE_SIZE);
        }}
      />
    );
  }, [results, itemsList, checkedIds, cursor]);

  const BottomToolbarMemo = useMemo(() => {
    return <PageQuickToolbar checkedIds={checkedIds} onCancel={() => setCheckedIds([])} refetch={onRefresh} />;
  }, [checkedIds]);

  //================================Debug=======================
  // console.log('settingColumns', settingColumns);
  // console.log('filterQuery', filterQuery);
  // console.log('filterValues', filterValues);

  //================================End debug====================

  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {BottomToolbarMemo}
      </ListContainer>
    </>
  );
};

export default ListPage;
