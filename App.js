import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './components/HomeScreen';
import RestaurantDetails from './components/RestaurantDetails';
import Footer from './components/Footer';
import SettingsScreen from './components/Settings';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AccountCenterStack } from './components/AccountCenter'; 
import AdminDashboard from './components/Admin/AdminDashboard';
import TermsAndConditions from './components/Terms&Condition';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RestaurantDetails" component={RestaurantDetails} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name='TermsConditions' component={TermsAndConditions} />
          {/* <Stack.Screen name="AccountCenter" component={AccountCenterStack} /> */}
          {/* <Stack.Screen name='Admin' component={AdminDashboard} /> */}
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;