import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Progress = ({ embedded }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learning Progress</Text>
      <Text style={styles.subtitle}>Your overall learning journey</Text>

      {!embedded && (
        <>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.buttonText}>Go to Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'semi-bold',
    color: '#176B87',
    marginBottom: '1%',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  subtitle: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: '#176B87',
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Progress;
