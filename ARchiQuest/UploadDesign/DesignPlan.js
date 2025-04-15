import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
//import { Picker } from '@react-native-picker/picker';
import { useNavigation} from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { collection } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL, addDoc} from 'firebase/storage';
import * as FileSystem from 'expo-file-system';


const DesignPlan = () => {
  const navigation = useNavigation();
  const [planName, setPlanName] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState(5000);
  //const [environment, setEnvironment] = useState('Urban Setting');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);




const handleSave = async () => {
  if (!planName || !description || !selectedFile || !selectedFile.uri) {
    alert('Please complete all fields and upload a valid 3D file.');
    return;
  }

  try {
    console.log('📦 Uploading:', selectedFile.name, selectedFile.uri);

    // 1. Convert local file URI to blob
    const response = await fetch(selectedFile.uri);
    const blob = await response.blob();

    // 2. Upload blob to Firebase Storage
    const fileRef = ref(storage, `3dmodels/${selectedFile.name}`);
    await uploadBytes(fileRef, blob);
    const downloadURL = await getDownloadURL(fileRef);

    // 3. Save metadata to Firestore
    await addDoc(collection(db, 'designPlans'), {
      planName,
      description,
      budget,
      modelURL: downloadURL,
      createdAt: new Date()
    });

    alert('✅ Design Plan Saved!');
    console.log('✅ Saved to Firestore:', downloadURL);

  } catch (error) {
    console.error('❌ Error saving plan:', error);
    alert('Error saving plan. Please try again.');
  }
};

  



  const pick3DFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
      });
  
      console.log('📦 Full file picker result:', result);
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0]; // ✅ get actual file data
  
        const allowedExtensions = ['.glb', '.gltf', '.obj'];
        const isValid = allowedExtensions.some(ext =>
          file.name.toLowerCase().endsWith(ext)
        );
  
        if (!isValid) {
          alert('❌ Invalid file type. Please select a .glb, .gltf, or .obj file.');
          return;
        }
  
        setSelectedFile(file); // ✅ save correct file object
        console.log('✅ Selected file:', file.name);
      } else {
        console.log('❌ No valid file selected.');
      }
    } catch (error) {
      console.error('File pick error:', error);
      alert('Failed to select a file.');
    }
  };
  
  


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Design Plan</Text>

      
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Design</Text>

        <TouchableOpacity onPress = {() => navigation.navigate('MaterialsTab')}> 
        <Text style={styles.tab}>Materials</Text>
        </TouchableOpacity>

        <Text style={styles.tab}>Preview</Text>
      </View>

      <Text style={styles.sectionTitle}>Design Plan Details</Text>
      <Text style={styles.sectionSubtitle}>Create a new AR learning experience</Text>

      <Text style={styles.label}>Plan Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter plan name"
        value={planName}
        onChangeText={setPlanName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Describe the learning objectives"
        multiline
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Budget Allocation</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={10000}
        step={100}
        minimumTrackTintColor="#176B87"
        maximumTrackTintColor="#d3d3d3"
        value={budget}
        onValueChange={setBudget}
      />
      <Text style={styles.budgetValue}>₱{budget.toLocaleString()}</Text>

      <Text style = {styles.label}>Upload 3D Model</Text>
      <TouchableOpacity style = {styles.uploadButton} onPress={pick3DFile}>
      <Text style={styles.uploadButtonText}>Choose File</Text>
      </TouchableOpacity>

      {selectedFile && (
        <Text style={styles.fileName}>📁 {selectedFile.name}</Text>
      )}

      <View style={styles.switchRow}>
        <Switch value={isPublic} onValueChange={setIsPublic} />
        <Text style={styles.switchText}>Make this plan public to other instructors</Text>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Design</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#176B87',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 12,
    color: '#7a7a7a',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#176B87',
    color: '#176B87',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  budgetValue: {
    textAlign: 'right',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#176B87',
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#176B87',
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  uploadButton: {
  backgroundColor: '#176B87',
  paddingVertical: 10,
  paddingHorizontal: 15,
  borderRadius: 6,
  alignItems: 'center',
  marginBottom: 10,
},
uploadButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
fileName: {
  fontSize: 14,
  color: '#333',
  marginBottom: 10,
},

});


export default DesignPlan;
