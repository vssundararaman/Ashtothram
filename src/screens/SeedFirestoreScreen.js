import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { seedVinayagarContent } from '../services/seedVinayagarFirestore';

export default function SeedFirestoreScreen() {
    const [status, setStatus] = useState('');

    const handleSeed = async () => {
        setStatus('Seeding...');
        try {
            await seedVinayagarContent();
            setStatus('Success! Data seeded to Firestore.');
        } catch (e) {
            setStatus('Error: ' + e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seed Firestore (Dev Only)</Text>
            <Button title="Seed Vinayagar Content" onPress={handleSeed} />
            {status ? <Text style={styles.status}>{status}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    status: { marginTop: 20, fontSize: 16, color: 'green' },
});
