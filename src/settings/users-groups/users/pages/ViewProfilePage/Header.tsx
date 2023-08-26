import { useMemo } from 'react';
import * as keyNames from '@settings/users-groups/users/config/keyNames';

interface HeaderProps {
  menuSource: string;
  menuSourceId: string;
  handleSave: (keyName: string, isSuccess: boolean, value: any) => void;
  refetch?: () => void;
}
const Header = (props: HeaderProps) => {
  const { menuSource, menuSourceId } = props;
  const HeaderMemo = useMemo(() => {
    return <></>;
  }, []);

  return <>{HeaderMemo}</>;
};

export default Header;
