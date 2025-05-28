import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper'; 
import SignUp from './signup';
import LoginScreen from './login';
import SplashScreen from './splash';
import ForgotPasswordScreen from './forgot_password';
import Verification from './verifikasi';
import ResetPassword from './reset_pass';
import GetStartedScreen from './get_started';
import DietForm from './DietForm'; 
// import PasswordChangedScreen from './PasswordChangedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="DietForm" component={DietForm} />
          {/* <Stack.Screen name="PasswordChanged" component={PasswordChangedScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
