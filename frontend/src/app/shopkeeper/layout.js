'use client';
/* eslint-disable react/no-unescaped-entities */


import { Toaster } from '@/components/ui/sonner';
import { getShopkeeperFromToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const [token, setToken] = useState(null);
  const router = useRouter(); // ✅ move it here

  useEffect(() => {
    const tokenFromCookie = getShopkeeperFromToken();

    if (tokenFromCookie) {
      setToken(tokenFromCookie);
    } else {
      router.push('/'); // 👈 redirect to home if no token
    }
  }, [router]); // ✅ safe to include router in dependency

  return (
    <div className='overflow-hidden'>
      {token && children} {/* render children only if token exists */}
      <Toaster />
    </div>
  );
}
