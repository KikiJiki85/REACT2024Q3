import { useEffect, useState } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { fetchItemDetails } from '../../api/api';
import { ItemDetailsType, OutletContext } from './types';
import styles from './ItemDetails.module.css';
import loaderGif from '../../assets/loader.gif';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { closeDetails } = useOutletContext<OutletContext>();
  const [details, setDetails] = useState<ItemDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/not-found');
      return;
    }
    fetchItemDetails(id, data => {
      setDetails({
        name: data.name,
        eyeColor: data.eyeColor,
        gender: data.gender,
        hairColor: data.hairColor,
        height: data.height,
        skinColor: data.skinColor,
      });
      setIsLoading(data.isLoading);
    });
  }, [id, navigate]);

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
        <ul className={styles['item-details__description']}>
          <li>Eye Color: {details.eyeColor} </li>
          <li>Gender: {details.gender} </li>
          <li>Hair Color: {details.hairColor} </li>
          <li>Height: {details.height} </li>
          <li>Skin Color: {details.skinColor} </li>
        </ul>
        <button onClick={closeDetails} className={styles['item-details__btn']}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
