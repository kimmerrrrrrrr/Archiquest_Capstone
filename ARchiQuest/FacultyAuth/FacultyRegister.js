import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const FacultyRegister = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  
    const handleSignUp = async () => {
      let isValid = true;
      const newErrors = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      };
  
      if (!firstName) {
        newErrors.firstName = 'First Name is required';
        isValid = false;
      }
      if (!lastName) {
        newErrors.lastName = 'Last Name is required';
        isValid = false;
      }
      if (!email) {
        newErrors.email = 'Email is required';
        isValid = false;
      }
      if (!password) {
        newErrors.password = 'Password is required';
        isValid = false;
      }
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Confirm Password is required';
        isValid = false;
      }
  
      if (password && confirmPassword && password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        isValid = false;
      }
  
      setErrors(newErrors);
  
      if (isValid) {
        try {
          const auth = getAuth();
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
          });
    
          alert('Registration Successful');
          navigation.navigate('FacultyLogin');
        } catch (error) {
          alert(error.message);
        }
      }
    };

  return (
    
    <View style={styles.container}>
      <Text style={styles.title}>Faculty Registration</Text>
      <Text style={styles.subtitle}>Join ArchiQuest as a Faculty Member</Text>
      
      <Text style={styles.label}>First Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="First Name" 
        keyboardType="text" 
        value={firstName} 
        onChangeText={setFirstName} 
      />
      {errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}

      <Text style={styles.label}>Last Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Last Name" 
        keyboardType="text" 
        value={lastName} 
        onChangeText={setLastName} 
      />
      {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input} 
        placeholder="email@example.com" 
        keyboardType="email-address" 
        value={email} 
        onChangeText={setEmail} 
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome5
            name={showPassword ? 'eye-slash' : 'eye'}
            size={15}
            color="#176B87"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="••••••••"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <FontAwesome5
            name={showConfirmPassword ? 'eye-slash' : 'eye'}
            size={15}
            color="#176B87"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}


      <TouchableOpacity style={styles.registerButton} onPress={handleSignUp}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('FacultyLogin')}>
                <Text style={styles.signInLink}> Click Here</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#176B87',
  },
  subtitle: {
    fontSize: 14,
    color: '#7a7a7a',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    width: '90%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#176B87',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 2,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#176B87',
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#176B87',
    paddingVertical: 12,
    width: '90%',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    color: '#007bff',
    marginTop: 5,
  },

  signInContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
},

  signInLink: {
  color: '#007bff',
},

errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginLeft: '20', 
  },
});

export default FacultyRegister;
