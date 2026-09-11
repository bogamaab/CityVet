import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './Screens/LoginScreen';
import RegisterPetScreen from './Screens/RegisterPetScreen';
import ClientDashboardScreen from './Screens/ClientDashboardScreen';
import SelectServiceScreen from './Screens/SelectServiceScreen';
import SelectDateTimeScreen from './Screens/SelectDateTimeScreen';
import MyAppointmentsScreen from './Screens/MyAppointmentsScreen';
import VetPanelScreen from './Screens/VetPanelScreen';
import AdminPanelScreen from './Screens/AdminPanelScreen';
import CreateAccountScreen from './Screens/CreateAccountScreen';
import VetAccountScreen from './Screens/VetAccountScreen';
import PetProfileScreen from './Screens/PetProfileScreen';
import ClientProfileScreen from './Screens/ClientProfileScreen';
import AdminSpecialistsScreen from './Screens/AdminSpecialistsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterPet" component={RegisterPetScreen} />
        <Stack.Screen name="ClientDashboard" component={ClientDashboardScreen} />
        <Stack.Screen name="SelectService" component={SelectServiceScreen} />
        <Stack.Screen name="SelectDateTime" component={SelectDateTimeScreen} />
        <Stack.Screen name="MyAppointments" component={MyAppointmentsScreen} />
        <Stack.Screen name="VetPanel" component={VetPanelScreen} />
        <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="VetAccount" component={VetAccountScreen} />
        <Stack.Screen name="PetProfile" component={PetProfileScreen} />
        <Stack.Screen name="ClientProfile" component={ClientProfileScreen} />
        <Stack.Screen name="AdminSpecialists" component={AdminSpecialistsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}