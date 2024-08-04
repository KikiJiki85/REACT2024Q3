import { useRouter } from 'next/router';
import SearchPage from '../../App';

const Page = () => {
  const router = useRouter();
  const { page } = router.query;

  return <SearchPage page={page} />;
};

export default Page;
