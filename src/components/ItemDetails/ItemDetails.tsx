import { useEffect } from 'react';
import { useParams, useOutletContext, useNavigate } from 'react-router-dom';
import { useGetCharacterDetailsQuery } from '../../api/apiSlice';
import { OutletContext } from './types';
import styles from './ItemDetails.module.css';
import loaderGif from '../../assets/loader.gif';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { closeDetails } = useOutletContext<OutletContext>();
  const { data: details, isLoading } = useGetCharacterDetailsQuery(id!);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/not-found');
      return;
    }
  }, [id, navigate]);

  if (isLoading) {
    console.log(isLoading);
  }

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
          <li>Eye Color: {details.eye_color} </li>
          <li>Gender: {details.gender} </li>
          <li>Hair Color: {details.hair_color} </li>
          <li>Height: {details.height} </li>
          <li>Skin Color: {details.skin_color} </li>
        </ul>
        <button onClick={closeDetails} className={styles['item-details__btn']}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ItemDetails;
