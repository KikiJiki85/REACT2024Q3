import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItemDetails } from '../../api/api';
import { ItemDetailsType } from './types';

const ItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<ItemDetailsType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchItemDetails(id, data => {
        setDetails(data);
        setIsLoading(false);
      });
    }
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <img src="/src/assets/loader.gif" alt="Loading..." />
      </div>
    );
  }

  if (!details) {
    return <p>No details available</p>;
  }

  return (
    <div>
      <h2>{details.name}</h2>
      <p>{details.description}</p>
    </div>
  );
};

export default ItemDetails;
