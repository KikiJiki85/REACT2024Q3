'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import SearchPage from '../../../src/App';
import React from 'react';

const Page = ({ params }: { params: { page: string } }) => {
  const router = useRouter();
  const { page } = params;

  useEffect(() => {
    if (!page || isNaN(Number(page))) {
      router.push('/not-found');
    }
  }, [page, router]);

  return <SearchPage page={page} />;
};

export default Page;
