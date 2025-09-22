import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { seedVinayagarContent } from '../services/seedVinayagarFirestore';
import { seedShivaContent, seedAksharaContent, seedVenkateswaraContent, seedLakshmiContent, seedHanumanContent } from '../services/seedShivaFirestore';

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

    const handleSeedVenkateswara = async () => {
        setLoading(true);
        setStatus('Seeding Venkateswara data...');
        try {
            await seedVenkateswaraContent();
            setStatus('Success! Venkateswara data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Venkateswara data: ${error.message}`);
            console.error('Error seeding Venkateswara data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSeedLakshmi = async () => {
        setLoading(true);
        setStatus('Seeding Lakshmi data...');
        try {
            await seedLakshmiContent();
            setStatus('Success! Lakshmi data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Lakshmi data: ${error.message}`);
            console.error('Error seeding Lakshmi data:', error);
        } finally {
            setLoading(false);
        }
    };
    const handleSeedHanuman = async () => {
        setLoading(true);
        setStatus('Seeding Hanuman data...');
        try {
            await seedHanumanContent();
            setStatus('Success! Hanuman data seeded to Firestore.');
        } catch (error) {
            setStatus(`Error seeding Hanuman data: ${error.message}`);
            console.error('Error seeding Hanuman data:', error);
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
            <View style={{ height: 16 }} />
            <Button title="Seed Venkateswara Data" onPress={handleSeedVenkateswara} disabled={loading} />
            <View style={{ height: 16 }} />
            <Button title="Seed Lakshmi Data" onPress={handleSeedLakshmi} disabled={loading} />
            <View style={{ height: 16 }} />
            <Button title="Seed Hanuman Data" onPress={handleSeedHanuman} disabled={loading} />
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
