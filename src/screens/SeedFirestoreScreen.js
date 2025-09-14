import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { seedVinayagarContent } from '../services/seedVinayagarFirestore';
import { seedShivaContent, seedAksharaContent } from '../services/seedShivaFirestore';

export default function SeedFirestoreScreen() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('');

    const handleSeedVinayagar = async () => {
        setLoading(true);
        setStatus('Seeding Vinayagar data...');
        try {
            await seedVinayagarContent();
            setStatus('Success! Vinayagar data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Vinayagar data: ${error.message}`);
            console.error('Error seeding Vinayagar data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedShiva = async () => {
        setLoading(true);
        setStatus('Seeding Shiva data...');
        try {
            await seedShivaContent();
            setStatus('Success! Shiva data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Shiva data: ${error.message}`);
            console.error('Error seeding Shiva data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedAkshara = async () => {
        setLoading(true);
        setStatus('Seeding Akshara Paamalai data...');
        try {
            await seedAksharaContent();
            setStatus('Success! Akshara Paamalai data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Akshara Paamalai data: ${error.message}`);
            console.error('Error seeding Akshara Paamalai data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seed Firestore Data</Text>
            <Button title="Seed Vinayagar Data" onPress={handleSeedVinayagar} disabled={loading} />
            <View style={{ height: 16 }} />
            <Button title="Seed Shiva Data" onPress={handleSeedShiva} disabled={loading} />
            <View style={{ height: 16 }} />
            <Button title="Seed Akshara Paamalai Data" onPress={handleSeedAkshara} disabled={loading} />
            {loading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}
            {!!status && <Text style={styles.status}>{status}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
    status: { marginTop: 18, fontSize: 16, color: '#007bff', textAlign: 'center' },
});
