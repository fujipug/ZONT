import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/lib/firebase-config";
import { getFirestore, collection, getDocs, Timestamp, query, doc, setDoc, getDoc } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

export const firebaseRegister = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const pass = formData.get('password') as string;

  return await createUserWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      const firstName = formData.get('first-name') as string;
      const lastName = formData.get('last-name') as string;
      const djName = formData.get('dj-name') as string;

      createUserInFirestore(user, firstName, lastName, djName);
      return user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
}

export const firebaseSignIn = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const pass = formData.get('password') as string;

  return await signInWithEmailAndPassword(auth, email, pass)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
    });
}

import { User } from "firebase/auth";

const createUserInFirestore = async (user: User, firstName: string, lastName: string, djName: string) => {
  const docRef = doc(db, 'users', user.uid);
  return await setDoc(docRef, {
    email: user.email,
    firstName: firstName,
    lastName: lastName,
    djName: djName,
    points: 0,
    createdAt: Timestamp.now(),
  });
};

export const firebaseGetProfile = async () => {
  const user = auth.currentUser;
  if (user) {
    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such user!');
    }
  } else {
    console.log('No user is currently signed in!');
  }
}

export const getReservations = async (timestamp: Timestamp, hours: number) => {
  console.log(`Checking reservations for timestamp: ${timestamp.toDate().toString()} and hours: ${hours}`);

  const q = query(collection(db, "reservations"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    // check if the timestamp and hours added to the timestamp is between the start and end time of the reservation
    // const startOfReservation = doc.data().dateTime.toDate();

  });
};

export const firebaseSignOut = async () => {
  return await signOut(auth).then(() => {
    return true;
  }).catch((error) => {
    const errorMessage = error.message;
    return errorMessage;
  });
}