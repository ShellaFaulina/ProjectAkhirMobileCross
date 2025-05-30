import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView,
  Platform, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { supabase } from './supabaseClient'; // Import supabase client

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signIn({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      navigation.navigate('DietForm'); // Ganti dengan halaman utama setelah login
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./assets/favicon.png')} style={styles.logo} />
        <Text style={styles.title}>Login</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#000"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#000"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color="#666"
                style={styles.eyeIcon}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginText}>{loading ? 'Loading...' : 'Login'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.googleButton} disabled>
            <View style={styles.socialContent}>
              <Image
                source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Login with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.facebookButton} disabled>
            <View style={styles.socialContent}>
              <FontAwesome
                name="facebook"
                size={20}
                color="#fff"
                style={styles.socialIcon}
              />
              <Text style={styles.facebookText}>Login with Facebook</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>
              Belum punya akun? <Text style={styles.signupLink}>Daftar</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  label: {
    fontSize: 13,
    color: '#000',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#000',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    marginLeft: -30,
    marginRight: 10,
  },
  forgotText: {
    color: '#666',
    textAlign: 'right',
    marginBottom: 20,
    fontSize: 13,
  },
  loginButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    fontWeight: 'bold',
    color: '#fff', 
  },
  googleButton: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  facebookButton: {
    backgroundColor: '#1877F2',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 20,
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  socialText: {
    fontWeight: 'bold',
    color: '#000',
  },
  facebookText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  signupText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 13,
  },
  signupLink: {
    fontWeight: 'bold',
    color: '#000',
  },
});