import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { User } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "@/lib/firebase-config";
import { getFirestore, collection, getDocs, Timestamp, query, doc, setDoc, getDoc, DocumentData, where, orderBy, limit, deleteDoc, getCountFromServer } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

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
      return { userId: docSnap.id, ...docSnap.data() };
    } else {
      console.log('No such user!');
    }
  } else {
    console.log('No user is currently signed in!');
  }
}

// get users from firebase DB
export const getUsers = async () => {
  const q = query(collection(db, "users"));
  const querySnapshot = await getDocs(q);
  const users: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ userId: doc.id, ...doc.data() });
  });
  return users;
};

// get user by id from firebase DB
export const getUserById = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('No such event!');
  }
};

export const getReservations = async (timestamp: Timestamp) => {
  // Get the start and end of the day for the given timestamp
  const startOfDay = Timestamp.fromDate(new Date(timestamp.toDate().setHours(0, 0, 0, 0)));
  const endOfDay = Timestamp.fromDate(new Date(timestamp.toDate().setHours(23, 59, 59, 999)));

  // Query for reservations within the day range
  const q = query(
    collection(db, "reservations"),
    where("dateStart", ">=", startOfDay),
    where("dateStart", "<=", endOfDay)
  );

  const querySnapshot = await getDocs(q);
  const reservations: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    reservations.push({ reservationId: doc.id, ...doc.data() });
  });

  return reservations;
};

// delete reservation from firebase DB
export const deleteReservationById = async (reservationId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'reservations', reservationId);
    await deleteDoc(docRef);
    console.log(`Reservation with ID ${reservationId} has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error; // Re-throw the error if you want to handle it higher up
  }
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

// add event to the firebase DB, the paramter is a FormData object
export const addEvent = async (formData: FormData) => {
  const docRef = doc(collection(db, 'events'));
  return await setDoc(docRef, {
    title: formData.get('title'),
    collective: formData.get('collective'),
    city: formData.get('city'),
    ticketUrl: formData.get('ticket-url'),
    address: formData.get('address'),
    dateStart: Timestamp.fromDate(new Date(formData.get('date-start') as string)),
    dateEnd: Timestamp.fromDate(new Date(formData.get('date-end') as string)),
    description: formData.get('description'),
    imgUrl: formData.get('img-url'),
  });
};

// delete event from firebase DB
export const deleteEventById = async (eventId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'events', eventId);
    await deleteDoc(docRef);
    console.log(`Event with ID ${eventId} has been deleted successfully.`);
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error; // Re-throw the error if you want to handle it higher up
  }
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
    return { courseId: docSnap.id, ...docSnap.data() };
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
interface CheckoutItem {
  id: string;
  quantity: number;
  type: string;
}

export const getCheckoutItemsByIds = async (items: CheckoutItem[]) => {
  const checkoutItems: DocumentData[] = [];
  for (const item of items) {
    const docRef = doc(db, item.type, item.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      checkoutItems.push({ itemId: docSnap.id, ...docSnap.data() });
    } else {
      console.log('No such item!');
    }
  }
  return checkoutItems;
};

// get services from firebase DB
export const getServices = async () => {
  const q = query(collection(db, "services"));
  const querySnapshot = await getDocs(q);
  const services: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    services.push({ serviceId: doc.id, ...doc.data() });
  });
  return services;
};

// get venues from firebase DB
export const getVenues = async () => {
  const q = query(collection(db, "venues"));
  const querySnapshot = await getDocs(q);
  const venues: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    venues.push({ venueId: doc.id, ...doc.data() });
  });
  return venues;
};

// get blogs from firebase DB, sorted by date
export const getBlogs = async () => {
  const q = query(collection(db, "blogs"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const blogs: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    blogs.push({ blogId: doc.id, ...doc.data() });
  });
  return blogs;
};

// get messages from firebase DB sorted by date
export const getMessages = async () => {
  const q = query(collection(db, "messages"), orderBy("date", "desc"));
  const querySnapshot = await getDocs(q);
  const messages: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    messages.push({ messageId: doc.id, ...doc.data() });
  });
  return messages;
};

// add message to the firebase DB, the paramter is a FormData object
export const addMessage = async (formData: FormData) => {
  const docRef = doc(collection(db, 'messages'));
  return await setDoc(docRef, {
    firstName: formData.get('first-name'),
    lastName: formData.get('last-name'),
    email: formData.get('email'),
    phoneNumber: formData.get('phone-number'),
    message: formData.get('message'),
    status: 'unread',
    date: Timestamp.now(),
  });
};

// get unread messages count
export const getUnreadMessagesCount = async () => {
  const coll = collection(db, "messages");
  const q = query(coll, where("status", "==", "unread"));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export const fileUpload = async (file: File, folder: string) => {
  const storageRef = ref(storage, `${folder}/${file.name}`);
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
}