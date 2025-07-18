import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { AppContext } from '../constants/AppContext';
import i18n from '../services/i18n';

const Poem1Screen = () => {
  const { fontSize } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.panel}>
        <Card style={styles.card}>
          <Card.Content>
            <ScrollView>
              <Text style={{ fontSize }}>
                This is the first poem.
              </Text>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
      <View style={styles.panel}>
        <Card style={styles.card}>
          <Card.Content>
            <ScrollView>
              <Text style={{ fontSize }}>
                This is the explanation for the first poem.
              </Text>
            </ScrollView>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  panel: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
  },
});

export default Poem1Screen; 