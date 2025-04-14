import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FacultyDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Faculty Dashboard</Text>
      </View>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Create Design Plan')}>
        <Text style={styles.buttonText}>Create Design Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StudentProgress')}>
        <Text style={styles.buttonText}>Student Progress Monitoring</Text>
      </TouchableOpacity>
      
    </View>

    
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: '10%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    padding: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flext-start',
    backgroundColor: '#fff',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#176B87',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#176B87',
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    flex: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dashSwitch: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#b4d4ff',
    borderRadius: 8,
    paddingHorizontal: '10%',
    paddingVertical: '1.5%',
    margin: '2%',
  },
  dashButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '2.5%',
    paddingHorizontal: '20%',
    borderRadius: 6,
    margin: '.5%',
  },
  activeDash: {
    backgroundColor: '#86b6f6',
  },
  dashText: {
    marginLeft: 5,
    fontSize: 15,
    color: '#176B87',
  },
  activeDashText: {
    color: '#fff',
  },
  
});

export default FacultyDashboard;
