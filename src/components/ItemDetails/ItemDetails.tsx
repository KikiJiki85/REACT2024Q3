import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGetCharacterDetailsQuery } from '../../api/apiSlice';
import styles from './ItemDetails.module.css';
import Image from 'next/image';

interface ItemDetailsProps {
  id: string | string[] | undefined;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ id }) => {
  const router = useRouter();
  const { data: details, isLoading } = useGetCharacterDetailsQuery(
    id as string,
  );

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      router.push('/not-found');
      return;
    }
  }, [id, router]);

  if (isLoading) {
    return (
      <div className={styles['item-details']}>
        <Image
          src="/assets/loader.gif"
          alt="Loading..."
          width={64}
          height={64}
        />
      </div>
    );
  }

  if (!details) {
    return <p className={styles['item-details']}>No details available</p>;
  }

  return (
    <div className={styles['item-details']}>
      <div className={styles['item-details__card']}>
        <h2 className={styles['item-details__header']}>{details.name}</h2>
        <ul className={styles['item-details__description']}>
          <li>Eye Color: {details.eye_color} </li>
          <li>Gender: {details.gender} </li>
          <li>Hair Color: {details.hair_color} </li>
          <li>Height: {details.height} </li>
          <li>Skin Color: {details.skin_color} </li>
        </ul>
        <button
          onClick={() => router.back()}
          className={styles['item-details__btn']}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
