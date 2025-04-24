import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC-zJk-zTcR8I4DskZHjZKyuM1ii79lAys',
  authDomain: 'event-booking-app-eb544.firebaseapp.com',
  projectId: 'event-booking-app-eb544',
  storageBucket: 'event-booking-app-eb544.firebasestorage.app',
  messagingSenderId: '476831810347',
  appId: '1:476831810347:web:e8a7cd7806937872b4bb6e',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
