import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import taContent from '../assets/ShivaAshtothram_ta.json';
import enContent from '../assets/ShivaAshtothram_en.json';

export async function seedShivaContent() {
    await setDoc(doc(db, 'shivaAshtothram', 'content'), {
        ta: taContent,
        en: enContent
    });
    console.log('Shiva Ashtothram content uploaded!');
}
