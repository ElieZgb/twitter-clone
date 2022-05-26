import firebase from "firebase";

const firebaseConfig = {
	apiKey: "API_KEY",
	authDomain: "AUTH_DOMAIN",
	projectId: "PROJECT_ID",
	storageBucket: "STORAGE_BUCKET",
	messagingSenderId: "MESSAGING_SENDER_ID",
	appId: "APP_ID",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();

export { firebase, db };
