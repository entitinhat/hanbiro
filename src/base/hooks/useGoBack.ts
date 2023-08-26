import { useNavigate } from 'react-router-dom';

const useGoBack = (): any => {
  const navigate = useNavigate();

  return (): void => navigate(-1);
};

export default useGoBack;
