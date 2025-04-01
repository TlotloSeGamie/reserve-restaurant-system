import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from './components/Navbar';
import HomeScreen from './components/HomeScreen';
import Footer from './components/Footer';
import BookingScreen from './components/BookingScreen';
import BookingSuccess from './components/BookingSuccess';
import ConfirmBooking from './components/ConfirmBooking';
import PaymentPage from './components/Payment';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import TermsAndConditions from './components/Terms&Condition';
import Cuisine from './components/Cuisine';
import Reservations from './components/Reservations';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navbar />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name='Confirm-Booking' component={ConfirmBooking} />
        <Stack.Screen name='BookingSuccess' component={BookingSuccess} />
        <Stack.Screen name='Payment' component={PaymentPage} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Terms-Condition' component={TermsAndConditions} />
        <Stack.Screen name='Cuisine' component={Cuisine} />
        <Stack.Screen name='Reservations' component={Reservations} />
      </Stack.Navigator> 
      <Footer />
    </NavigationContainer>
  );
}
