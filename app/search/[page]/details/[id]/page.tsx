'use client';

import { useSearchParams } from 'next/navigation';
import ItemDetails from '../../../../../src/components/ItemDetails/ItemDetails';
import SearchPage from '../../../../../src/App';
import React from 'react';

const DetailsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const page = searchParams.get('page') || undefined;

  return (
    <div>
      <SearchPage page={page} />
      {id && <ItemDetails id={id} />}
    </div>
  );
};

export default DetailsPage;
