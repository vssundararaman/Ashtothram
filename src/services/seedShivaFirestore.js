import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import taContent from '../assets/ShivaAshtothram_ta.json';
import enContent from '../assets/ShivaAshtothram_en.json';
import aksharaTa from '../assets/AksharaPaamalai_ta.json';
import aksharaEn from '../assets/AksharaPaamalai_en.json';

export async function seedShivaContent() {
    await setDoc(doc(db, 'shivaAshtothram', 'content'), {
        ta: taContent,
        en: enContent
    });
    console.log('Shiva Ashtothram content uploaded!');
}

export async function seedAksharaContent() {
    await setDoc(doc(db, 'aksharaPaamalai', 'content'), {
        ta: aksharaTa,
        en: aksharaEn
    });
    console.log('Akshara Paamalai content uploaded!');
}
