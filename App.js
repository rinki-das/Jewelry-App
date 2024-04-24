// App.js

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetStarted from './components/GetStarted';
import ShoeList from './components/ShoeList';
import ShoeDetail from './components/ShoeDetail';
import Login from './components/Login';
import Register from './components/Register';
import HomeScreen from './Screens/HomeScreen';
import UpdateProfile from './Screens/UpdateProfile/UpdateProfile';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Sign in to your account', headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Sign up new Account', headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="ShoeList" component={ShoeList} options={{ title: 'Shoe List' }} />
        <Stack.Screen name="ShoeDetail" component={ShoeDetail} options={({ route }) => ({ title: route.params.item.name })} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ title: 'Update Profile', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
