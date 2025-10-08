import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './pages/Homepage';    
import RegisterPage from './pages/RegisterPage';
import ReviewPage from './pages/ReviewPage';

const Stack = createNativeStackNavigator();

export default function Dashboard() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Review" component={ReviewPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}