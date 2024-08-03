'use client';

import { useSearchParams } from 'next/navigation';
import SearchPage from '../../../src/App';
import React from 'react';

const Page = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  return <SearchPage page={page} />;
};

export default Page;
