// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyB0Q6aYTkFk-ExoGnKKw_GvM5d4l2Z4728',
	authDomain: 'nextjs-netflix-clone-40915.firebaseapp.com',
	projectId: 'nextjs-netflix-clone-40915',
	storageBucket: 'nextjs-netflix-clone-40915.appspot.com',
	messagingSenderId: '40537142883',
	appId: '1:40537142883:web:320f8c2a07050049a62a56',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }