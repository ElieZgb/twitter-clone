import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoggedOut from './LoggedOutScreen';
import LoginScreen from './LoginScreen';
import CreateAccountScreen from './CreateAccountScreen.js';
import SignUpScreen from './SignUpScreen';
import HomeScreen from './HomeScreen';
import TweetUploadScreen from './TweetUploadScreen';

const Stack = createStackNavigator()

const screenOptions = {
    headerShown: false,
}

export const SignedInNavigations = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home screen' screenOptions={screenOptions}>
            <Stack.Screen name='Home screen' component={HomeScreen} options={{gestureEnabled: false}} />
            <Stack.Screen name='Tweet upload screen' component={TweetUploadScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutNavigations = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Logged out screen' screenOptions={screenOptions}>
            <Stack.Screen name='Logged out screen' component={LoggedOut} />
            <Stack.Screen name='Login screen' component={LoginScreen} />
            <Stack.Screen name='Create account screen' component={CreateAccountScreen} />
            <Stack.Screen name='Signup screen' component={SignUpScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)