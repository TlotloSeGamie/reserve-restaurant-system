import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import TermsAndConditions from './Terms&Condition';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function SignUp({ navigation }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const password = watch("password"); 

  const registeredEmails = ["test@example.com", "user@domain.com"];

  const onSubmit = async (data) => {
    if (registeredEmails.includes(data.email)) {
      console.log('This email is already registered!');
    } else {
      registeredEmails.push(data.email);
      console.log(`Welcome, ${data.firstName}! You have registered successfully.`);
  
      try {
        const userDetails = {
          firstName: data.firstName,
          email: data.email,
          password: data.password,
        };
        await AsyncStorage.setItem('userDetails', JSON.stringify(userDetails)); 
        navigation.navigate('Login'); 
      } catch (error) {
        console.error('Error saving user details:', error);
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name</Text>
        <Controller
          control={control}
          name="firstName"
          rules={{ required: 'First name is required' }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.firstName && styles.errorInput]}
              placeholder="Enter your first name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.firstName && <Text style={styles.errorText}>{errors.firstName.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: { value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, message: 'Enter a valid email' },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Enter your email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
            />
          )}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Password is required',
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: 'Password must be at least 8 characters, include an uppercase letter, number, and special character',
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, errors.password && styles.errorInput, { flex: 1 }]}
                placeholder="Enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                <Text style={styles.toggleButtonText}>
                  {passwordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Confirm Password</Text>
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: 'Please confirm your password',
            validate: (value) => value === password || 'Passwords do not match',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.errorInput, { flex: 1 }]}
                placeholder="Re-enter your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!confirmPasswordVisible}
              />
              <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                <Text style={styles.toggleButtonText}>
                  {confirmPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? <Text style={styles.link}>Login</Text></Text>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TouchableOpacity
            onPress={() => setIsModalVisible(false)}
            style={{ padding: 15, alignSelf: 'flex-end' }}
          >
            <Text style={{ fontSize: 18, color: 'rgb(24, 48, 135)' }}>Close</Text>
          </TouchableOpacity>
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <TermsAndConditions />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgb(190, 193, 194)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: 'rgb(51, 51, 51)',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'rgb(120, 120, 120)',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgb(190, 193, 194)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'rgb(8, 46, 12)',
  },
  errorText: {
    color: 'rgb(8, 46, 12)',
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: 'rgb(89, 112, 194)',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    color: 'rgb(120, 120, 120)',
  },
  link: {
    color: 'rgb(44, 71, 169)',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'rgb(44, 71, 169)',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
