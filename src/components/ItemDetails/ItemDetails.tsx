import { useEffect, useState, useRef } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { fetchItemDetails } from '../../api/api';
import { ItemDetailsType, OutletContext } from './types';
import styles from './ItemDetails.module.css';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { closeDetails } = useOutletContext<OutletContext>();
  const [details, setDetails] = useState<ItemDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      fetchItemDetails(id, data => {
        setDetails(data);
        setIsLoading(false);
      });
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailsRef.current &&
        !detailsRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('li')
      ) {
        closeDetails();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [id, closeDetails]);

  if (isLoading) {
    return (
      <div className={styles['item-details']}>
        <img src="/src/assets/loader.gif" alt="Loading..." />
      </div>
    );
  }

  if (!details) {
    return <p className={styles['item-details']}>No details available</p>;
  }

  return (
    <div className={styles['item-details']} ref={detailsRef}>
      <h2>{details.name}</h2>
      <p>{details.description}</p>
      <button onClick={closeDetails}>Close</button>
    </div>
  );
};

export default ItemDetails;
