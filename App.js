import React, { useState, createContext } from "react";
import {
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

// Screens
import Home from "./MainScreen/Home";
import AllRecipe from "./MainScreen/AllRecipe";
import Categories from "./MainScreen/Kategori";
import Bookmark from "./MainScreen/Bookmark";
import FAQ from "./InfoScreen/FAQ";
import Setting from "./InfoScreen/Setting";
import Search from "./MainScreen/Search";
import DetailMenu from "./MainScreen/DetailMenu";
import NotificationScreen from "./MainScreen/Notifikasi";
import CreateRecipe from "./ProfileScreen/CreateRecipe";
import Profile from "./ProfileScreen/Profile"; // Tambahkan baris ini untuk import Profile
import EditProfile from "./ProfileScreen/EditProfile";
import EditRecipe from "./ProfileScreen/EditRecipe";

// Auth screens
import SplashScreen from "./LoginScreen/splash";
import LoginScreen from "./LoginScreen/Login";
import RegisterScreen from "./LoginScreen/Register";
import GetStartedScreen from "./LoginScreen/getStarted";

// Auth Context
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FF6F3C",
        tabBarInactiveTintColor: "#7F4F24",
        tabBarStyle: { backgroundColor: "#FFF8F0" },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Ionicons name="home-outline" size={size} color={color} />;
          } else if (route.name === "Search") {
            return <Ionicons name="search-outline" size={size} color={color} />;
          } else if (route.name === "CreateRecipe") {
            return <Ionicons name="add-circle" size={size + 8} color={color} />;
          } else if (route.name === "Bookmark") {
            return <Ionicons name="bookmark-outline" size={size} color={color} />;
          } else if (route.name === "Profile") {
            return <Ionicons name="person-outline" size={size} color={color} />;
          }
        },
        tabBarLabel: route.name === "CreateRecipe" ? "" : undefined,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="CreateRecipe"
        component={CreateRecipe}
        options={{
          tabBarLabel: "",
          title: "Tambah Resep",
          tabBarIconStyle: { marginTop: -8 },
        }}
      />
      <Tab.Screen name="Bookmark" component={Bookmark} />
      <Tab.Screen
        name="Profile"
        component={Profile} // Ganti dengan ProfileScreen jika ada
        options={{ title: "Profil" }}
      />
    </Tab.Navigator>
  );
};

// Stack Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="GetStarted" component={GetStartedScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="AllRecipe" component={AllRecipe} />
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="FAQ" component={FAQ} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DetailMenu" component={DetailMenu} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="EditRecipe" component={EditRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Root App
export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
