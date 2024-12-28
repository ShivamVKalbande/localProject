import { Button, StyleSheet } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screen/HomeScreen';
import DashboardScreenMaha from './src/screen/dashboardScreenMaha';
import subDepartmentScreen from './src/screen/subDepartmentScreen';
import ProfileScreen from './src/screen/ProfileScreen';
import ContactScreen from './src/screen/ContactScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      screenOptions={{ headerShown: false }}
      >
        {/* Define your screens here */}
        <Stack.Screen name="HOME" component={HomeScreen} />        
        <Stack.Screen name="MAHA" component={DashboardScreenMaha} />
        <Stack.Screen name="PROFILE" component={ProfileScreen} />
        <Stack.Screen name="SUBDEPARTMENT" component={subDepartmentScreen} />
        <Stack.Screen name="CONTACT" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});