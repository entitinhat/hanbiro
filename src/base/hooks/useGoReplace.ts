import { useNavigate } from 'react-router-dom';

const useGoReplace = (): any => {
  const navigate = useNavigate();

  return (url: string, state?: any): void => navigate(url, { state, replace: true });
};

export default useGoReplace;
