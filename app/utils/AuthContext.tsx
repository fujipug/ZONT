'use client';
import React, { createContext, useState, useContext, useEffect } from "react";
import { ReactNode } from "react";
import { firebaseGetProfile, firebaseRegister, firebaseSignIn, firebaseSignOut } from "../network/firebase";
import { DocumentData } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  isSignedIn: boolean;
  profile: any;
  register: (formData: FormData) => Promise<void>;
  signIn: (formData: FormData) => Promise<void>;
  signOut: () => void;
}>({
  isSignedIn: false,
  profile: null,
  register: async () => { },
  signIn: async () => { },
  signOut: async () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const auth = getAuth();
  const router = useRouter();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
        getProfile();
      }
    });
  }, []);

  const register = async (formData: FormData) => {
    const user = await firebaseRegister(formData);

    if (user) {
      setIsSignedIn(true);
      getProfile();
    }
  }

  const signIn = async (formData: FormData) => {
    const user = await firebaseSignIn(formData);

    if (user) {
      setIsSignedIn(true);
      getProfile();
    }
  };

  const signOut = async () => {
    await firebaseSignOut().then(() => {
      setIsSignedIn(false);
      setProfile(null);
      router.push('/');
    });
  }

  const getProfile = async () => {
    const user = await firebaseGetProfile();
    if (user) {
      setProfile(user);
    }
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, profile, register, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
