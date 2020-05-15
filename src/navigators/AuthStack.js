import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import ForgetPassword from '../screens/ForgetPassword';

const Stack = createStackNavigator();

const AuthenticationStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticationStack;
