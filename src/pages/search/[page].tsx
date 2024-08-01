import { useRouter } from 'next/router';
import App from '../../App';

const SearchPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return <App page={page} />;
};

export default SearchPage;
