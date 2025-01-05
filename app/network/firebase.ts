import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/lib/firebase-config";
import { getFirestore, collection, getDocs, Timestamp, query, doc, setDoc, getDoc, DocumentData, where, orderBy, limit } from "firebase/firestore";

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

// get events from firebase DB
export const getEvents = async () => {
  const q = query(collection(db, "events"));
  const querySnapshot = await getDocs(q);
  const events: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    events.push({ eventId: doc.id, ...doc.data() });
  });
  return events;
};

export const getUpcomingEvents = async () => {
  const q2 = query(
    collection(db, "events"),
    where("dateStart", ">=", Timestamp.now()),
    orderBy("dateStart", "asc"),
    limit(10)
  );

  const q1 = query(
    collection(db, "events"),
    where("dateEnd", ">=", Timestamp.now()),
    orderBy("dateEnd", "asc"),
    limit(10)
  );

  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);

  const events: DocumentData[] = [];

  // Collect results from both queries
  querySnapshot1.forEach((doc) => {
    events.push({ eventId: doc.id, ...doc.data() });
  });

  querySnapshot2.forEach((doc) => {
    events.push({ eventId: doc.id, ...doc.data() });
  });

  // Optionally, remove duplicates (in case events match both queries)
  const uniqueEvents = Array.from(new Set(events.map((a) => a.eventId)))
    .map((id) => events.find((a) => a.eventId === id));

  return uniqueEvents;
};


export const getPastEvents = async () => {
  const q = query(collection(db, "events"), where("dateEnd", "<", Timestamp.now()), limit(10), orderBy("dateStart", "desc"));
  const querySnapshot = await getDocs(q);
  const events: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    events.push({ eventId: doc.id, ...doc.data() });
  });
  return events;
};

// get event by id from firebase DB
export const getEventById = async (eventId: string) => {
  const docRef = doc(db, 'events', eventId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such event!');
  }
};

// get courses from firebase DB
export const getCourses = async () => {
  const q = query(collection(db, "courses"));
  const querySnapshot = await getDocs(q);
  const courses: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    courses.push({ courseId: doc.id, ...doc.data() });
  });
  return courses;
};

// get course by id from firebase DB
export const getCourseById = async (courseId: string) => {
  const docRef = doc(db, 'courses', courseId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such course!');
  }
};

// get items from store from firebase DB
export const getStoreItems = async () => {
  const q = query(collection(db, "store"));
  const querySnapshot = await getDocs(q);
  const storeItems: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    storeItems.push({ itemId: doc.id, ...doc.data() });
  });
  return storeItems;
};

// get item by id from store from firebase DB
export const getStoreItemById = async (itemId: string) => {
  const docRef = doc(db, 'store', itemId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { itemId: docSnap.id, ...docSnap.data() };
  } else {
    console.log('No such item!');
  }
};

// get get item by id from store from firebase DB but the parameter is an array of ids
export const getCheckoutItemsByIds = async (itemIds: string[]) => {
  const checkoutItems: DocumentData[] = [];
  for (const itemId of itemIds) {
    const docRef = doc(db, 'store', itemId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      checkoutItems.push({ itemId: docSnap.id, ...docSnap.data() });
    } else {
      console.log('No such item!');
    }
  }
  return checkoutItems;
};