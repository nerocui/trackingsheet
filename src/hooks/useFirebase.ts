import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, DocumentData } from 'firebase/firestore/lite';
import firebaseConfig from '../firebase.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const getData = (data: DocumentData, key: string, defaultValue?: any) => {
  try {
    const value = data[key];
    return !!value ? value : defaultValue;
  } catch(_) {
    return defaultValue;
  }
}

export type Trackable = {
  id: string,
  description: string,
  name: string,
  thumbnailUrl: string,
  tracking: boolean,
  url: string,
};

export const fetchTrackables = async (): Promise<Trackable[]> => {
  const db = getFirestore(app);
  const trackablesCol = collection(db, 'trackables');
  const snapshot = await getDocs(trackablesCol);
  return snapshot.docs.map(document => {
    const { id } = document;
    const data = document.data();
    return {
      id,
      description: getData(data, 'description', ''),
      name: getData(data, 'name', ''),
      thumbnailUrl: getData(data, 'thumbnailUrl', ''),
      tracking: getData(data, 'tracking', false),
      url: getData(data, 'url', ''),
    };
  });
}

export const addTrackable = async (url: string) => {
  const db = getFirestore(app);
  await addDoc(collection(db, "toAddItems"), {
    url
  });
}
