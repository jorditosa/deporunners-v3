import { useHistory } from 'react-router-dom';

export const useRouter = () => {
  const history = useHistory();
  
  const navigate = (path: string) => {
    history.push(path);
  };

  return { navigate };
};
