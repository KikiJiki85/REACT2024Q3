import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { fetchItemDetails } from '../../api/api';
import { ItemDetailsType, OutletContext } from './types';
import styles from './ItemDetails.module.css';
import loaderGif from '../../assets/loader.gif';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { closeDetails } = useOutletContext<OutletContext>();
  const [details, setDetails] = useState<ItemDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchItemDetails(id, data => {
        setDetails({ name: data.name, description: data.description });
        setIsLoading(data.isLoading);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className={styles['item-details']}>
        <img src={loaderGif} alt="Loading..." />
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
        <p className={styles['item-details__description']}>
          {details.description}
        </p>
        <button onClick={closeDetails} className={styles['item-details__btn']}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
