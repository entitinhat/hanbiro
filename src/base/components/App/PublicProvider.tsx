// types
import { GuardProps } from '@base/types/auth';

const PublicProvider = ({ children }: GuardProps) => {
  return children;
};

export default PublicProvider;
