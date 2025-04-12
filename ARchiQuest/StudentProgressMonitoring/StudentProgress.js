import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const StudentProgress = ({ navigation }) => {
  const [dash, setDash] = useState('Progress');

  const handlePress = (dashboard) => {
    setDash(dashboard);
    if (dashboard === 'Progress') {
      navigation.navigate('Progress');
    } else if (dashboard === 'Insights') {
      navigation.navigate('InsightPanel');
    }
};
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Student Monitoring</Text>
      </View>

      <View style={styles.dashSwitch}>
        <TouchableOpacity
          style={[styles.dashButton, dash === 'Progress' && styles.activeDash]}
          onPress={() => handlePress('Progress')}
        >
          <Text style={[styles.dashText, dash === 'Progress' && styles.activeDashText]}>Progress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dashButton, dash === 'Insights' && styles.activeDash]}
          onPress={() => handlePress('Insights')}
        >
          <Text style={[styles.dashText, dash === 'Insights' && styles.activeDashText]}>Insights</Text>
        </TouchableOpacity>
      </View>
    </View>

    
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flex: '10%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#176B87',
    marginBottom: 5,
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

export default StudentProgress;
