'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './AuthContext';
import { Spinner } from '@heroui/react';

const WithAdminAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { isSignedIn, profile } = useAuth();
    const router = useRouter();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
      if (isSignedIn === false || (profile && profile.role !== 'admin')) {
        router.push('/');
      } else if (isSignedIn && profile) {
        setIsCheckingAuth(false);
      }
    }, [isSignedIn, profile, router]);

    if (isCheckingAuth || !isSignedIn) {
      return (
        <div className="h-screen flex justify-center items-center">
          <Spinner color="secondary" label="Verificando Acceso ..." labelColor="secondary" />
        </div>
      );
    }

    if (profile?.role === 'admin') {
      return <WrappedComponent {...props} />;
    }

    return null;
  };

  return AuthenticatedComponent;
};

export default WithAdminAuth;
