import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [registeredUser, setRegisteredUserState] = useState(null);
  const [user, setUserState] = useState(null);
  const [vibrate, setVibrateState] = useState(true);
  const [fastMode, setFastModeState] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('registeredUser');
        if (storedUser) {
          setRegisteredUserState(JSON.parse(storedUser));
        }

        const storedVibrate = await AsyncStorage.getItem('vibrate');
        if (storedVibrate !== null) {
          setVibrateState(storedVibrate === 'true');
        }

        const storedFastMode = await AsyncStorage.getItem('fastMode');
        if (storedFastMode !== null) {
          setFastModeState(storedFastMode === 'true');
        }

      } catch (e) {
        console.log('Failed to load data', e);
      }
    };

    loadUserData();
  }, []);

  const setRegisteredUser = async (user) => {
    try {
      await AsyncStorage.setItem('registeredUser', JSON.stringify(user));
      setRegisteredUserState(user);
    } catch (e) {
      console.log('Failed to save user', e);
    }
  };

  const setUser = async (user) => {
    try {
      await AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      setUserState(user);
    } catch (e) {
      console.log('Failed to save login user', e);
    }
  };

  const setVibrate = async (value) => {
    try {
      await AsyncStorage.setItem('vibrate', value.toString());
      setVibrateState(value);
    } catch (e) {
      console.log('Failed to save vibrate setting', e);
    }
  };

  const setFastMode = async (value) => {
    try {
      await AsyncStorage.setItem('fastMode', value.toString());
      setFastModeState(value);
    } catch (e) {
      console.log('Failed to save fast mode setting', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registeredUser,
        user,
        setRegisteredUser,
        setUser,
        vibrate,
        setVibrate,
        fastMode,
        setFastMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};