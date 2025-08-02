import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AksharaPaamalaiScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Poem 3</Text>
      <Text>Poem text goes here.</Text>
      <Text>Meaning goes here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
}); 