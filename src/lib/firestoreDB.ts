import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { load } from 'ts-dotenv';

const env = load({
    MY_FIREBASE_CREDENTIALS: String,
});

initializeApp({
    credential: cert(env.MY_FIREBASE_CREDENTIALS)
});

export const firestoreDB = getFirestore();