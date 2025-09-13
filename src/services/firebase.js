import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCsmuFxB1yiUld9_Qf79zLLDq-8n4bewL8",
    authDomain: "ashtothram-25a3d.firebaseapp.com",
    projectId: "ashtothram-25a3d",
    storageBucket: "ashtothram-25a3d.firebasestorage.app",
    messagingSenderId: "937440299183",
    appId: "1:937440299183:web:ea68c4a0978393276fac5a",
    measurementId: "G-CNJPVLHPTE"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
