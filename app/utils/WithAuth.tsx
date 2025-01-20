'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Spinner } from '@heroui/react';

const WithAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { isSignedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isSignedIn) {
        router.push('/');
      }
    }, [isSignedIn, router]);

    if (isSignedIn) {
      return <WrappedComponent {...props} />;
    } else {
      return <div className='h-screen flex justify-center items-center'>
        <Spinner color="secondary" label="Verificando Acceso ..." labelColor="secondary" />
      </div>;
    }
  };

  return AuthenticatedComponent;
};

export default WithAuth;
