import { useRouter } from 'next/router';
import ItemDetails from '../../../../components/ItemDetails/ItemDetails';

const DetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <ItemDetails id={id} />;
};

export default DetailsPage;
