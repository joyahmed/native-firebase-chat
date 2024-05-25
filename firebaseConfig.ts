import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
	getReactNativePersistence,
	initializeAuth
} from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDq8YGZoTFMFjdnHmhr72zkSItaIklwymw',
	authDomain: 'native-firebase-chat-d5960.firebaseapp.com',
	projectId: 'native-firebase-chat-d5960',
	storageBucket: 'native-firebase-chat-d5960.appspot.com',
	messagingSenderId: '156874731987',
	appId: '1:156874731987:web:50915a379ab92b4c35ff26'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomsRef = collection(db, 'roooms');
