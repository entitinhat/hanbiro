import { useNavigate } from 'react-router-dom';

const useGoPush = (): any => {
  const navigate = useNavigate();

  return (url: string, state: any): void => navigate(url, { state });
};

export default useGoPush;
