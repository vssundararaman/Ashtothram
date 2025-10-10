import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import taContent from '../assets/ShivaAshtothram_ta.json';
import enContent from '../assets/ShivaAshtothram_en.json';
import aksharaTa from '../assets/AksharaPaamalai_ta.json';
import aksharaEn from '../assets/AksharaPaamalai_en.json';
import venkateswaraTa from '../assets/VenkateswaraAshtothram_ta.json';
import venkateswaraEn from '../assets/VenkateswaraAshtothram_en.json';
import lakshmiTa from '../assets/LakshmiAshtothram_ta.json';
import lakshmiEn from '../assets/LakshmiAshtothram_en.json';
import hanumanTa from '../assets/HanumanAshtothram_ta.json';
import hanumanEn from '../assets/HanumanAshtothram_en.json';

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

export async function seedVenkateswaraContent() {
    await setDoc(doc(db, 'venkateswaraAshtothram', 'content'), {
        ta: venkateswaraTa,
        en: venkateswaraEn
    });
    console.log('Venkateswara Ashtothram content uploaded!');
}

export async function seedLakshmiContent() {
    await setDoc(doc(db, 'lakshmiAshtothram', 'content'), {
        ta: lakshmiTa,
        en: lakshmiEn
    });
    console.log('Lakshmi Ashtothram content uploaded!');
}

export async function seedHanumanContent() {
    await setDoc(doc(db, 'hanumanAshtothram', 'content'), {
        ta: hanumanTa,
        en: hanumanEn
    });
    console.log('Hanuman Ashtothram content uploaded!');
}
