import { useRouter } from 'next/router';
import ItemDetails from '../../../../components/ItemDetails/ItemDetails';
import SearchPage from '../../../../App';

const DetailsPage = () => {
  const router = useRouter();
  const { id, page } = router.query;

  return (
    <div>
      <SearchPage page={page} />
      <ItemDetails id={id} />;
    </div>
  );
};

export default DetailsPage;
