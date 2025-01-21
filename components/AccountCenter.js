import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons for icons
import { createStackNavigator } from '@react-navigation/stack';


const ProfileScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.heading}>User Profile</Text>
  </View>
);

const PasswordSecurityScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.heading}>Change Password</Text>
    <Text style={styles.text}>Saved Login</Text>
    <Text style={styles.text}>Login Alerts</Text>
  </View>
);

const PersonalDetailsScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.heading}>Contact Details</Text>
    <Text style={styles.text}>Editable Form</Text>
  </View>
);

const AccountOwnershipScreen = () => (
  <View style={styles.screen}>
  <Text style={styles.heading}>Account Deactivation or Deletion</Text>
  <Text style={styles.text}>
    If you choose to deactivate your account, your profile will be temporarily disabled and hidden from other users. 
    Deleting your account is permanent and cannot be undone. Please proceed with caution.
  </Text>
  <TouchableOpacity style={styles.button} onPress={() => alert('Deactivate Account')}>
    <Text style={styles.buttonText}>Deactivate Account</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => alert('Delete Account')}>
    <Text style={styles.buttonText}>Delete Account</Text>
  </TouchableOpacity>
</View>

);

const AccountCenterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Profile')}>
        <Icon name="person-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PasswordSecurity')}>
        <Icon name="lock-closed-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Password & Security</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PersonalDetails')}>
        <Icon name="clipboard-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Personal Details</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('AccountOwnership')}>
        <Icon name="settings-outline" size={24} color="#007bff" style={styles.icon} />
        <Text style={styles.optionText}>Account Ownership & Control</Text>
      </TouchableOpacity>
    </View>
  );
};

const AccountStack = createStackNavigator();

export const AccountCenterStack = () => {
  return (
    <AccountStack.Navigator initialRouteName="AccountCenterScreen">
      <AccountStack.Screen name="AccountCenterScreen" component={AccountCenterScreen} />
      <AccountStack.Screen name="Profile" component={ProfileScreen} />
      <AccountStack.Screen name="PasswordSecurity" component={PasswordSecurityScreen} />
      <AccountStack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <AccountStack.Screen name="AccountOwnership" component={AccountOwnershipScreen} />
    </AccountStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9', 
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15, 
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22, 
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#007bff', 
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    backgroundColor: '#dc3545', 
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});