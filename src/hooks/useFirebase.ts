import { initializeApp } from "firebase/app";
import {
	getFirestore,
	collection,
	getDocs,
	addDoc,
	DocumentData,
	doc,
	getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore/lite";
import firebaseConfig from "../firebase.json";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const getData = (data: DocumentData, key: string, defaultValue?: any) => {
	try {
		const value = data[key];
		return !!value ? value : defaultValue;
	} catch (_) {
		return defaultValue;
	}
};

export type Trackable = {
	id: string;
	description: string;
	name: string;
	thumbnailUrl: string;
	tracking: boolean;
	url: string;
};

export const fetchTrackables = async (): Promise<Trackable[]> => {
	const db = getFirestore(app);
	const trackablesCol = collection(db, "trackables");
	const snapshot = await getDocs(trackablesCol);
	return snapshot.docs.map((document) => {
		const { id } = document;
		const data = document.data();
		return {
			id,
			description: getData(data, "description", ""),
			name: getData(data, "name", ""),
			thumbnailUrl: getData(data, "thumbnailUrl", ""),
			tracking: getData(data, "tracking", false),
			url: getData(data, "url", ""),
		};
	});
};

export const addTrackable = async (url: string) => {
	const db = getFirestore(app);
	await addDoc(collection(db, "toAddItems"), {
		url,
	});
};

export const invitationMatch = async (
	email: string,
	code: string
): Promise<boolean> => {
	const db = getFirestore(app);
	const docRef = doc(db, "invitations", email);
	const docSnap = await getDoc(docRef);
	if (!docSnap.exists()) {
		return false;
	} else {
		try {
			const data = docSnap.data();
			return data["code"] === code.trim();
		} catch (_) {
			return false;
		}
	}
};

export const startTracking = async (id: string, callback: () => void) => {
	const db = getFirestore(app);
  const trackableRef = doc(db, "trackables", id);
  try {
    await updateDoc(trackableRef, {
      tracking: true
    });
    callback();
  } catch (err) {
    console.log(err);
  }
};

export const stopTracking = async (id: string, callback: () => void) => {
	const db = getFirestore(app);
  const trackableRef = doc(db, "trackables", id);
  try {
    await updateDoc(trackableRef, {
      tracking: false
    });
    callback();
  } catch (err) {
    console.log(err);
  }
};

export const deleteItem = async (id: string, callback: () => void) => {
  const db = getFirestore(app);
  try {
    await deleteDoc(doc(db, "trackables", id));
    callback();
  } catch (err) {
    console.log(err);
  }
}
