import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntroductionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Introduction</Text>
      <Text>Welcome to the Poem Explanation App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
}); 