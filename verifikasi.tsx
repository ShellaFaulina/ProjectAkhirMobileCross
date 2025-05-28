import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }

    // Optional: automatically submit if all fields are filled
    if (index === 3 && value) {
      Keyboard.dismiss();
      handleSubmit(newCode.join(''));
    }
  };

  const handleSubmit = (finalCode) => {
    console.log('Code entered:', finalCode);
    // Ganti ini dengan validasi atau navigasi ke halaman reset password
    navigation.navigate('ResetPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verifikasi</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Enter 4 digit code</Text>
        <Text style={styles.subtitle}>
          Enter 4 digit code that you receive on your email (chris.waro@example.com)
        </Text>

        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputs.current[index] = ref}
              style={styles.codeInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(value) => handleChange(value, index)}
              value={digit}
              autoFocus={index === 0}
              returnKeyType="next"
            />
          ))}
        </View>

        <Text style={styles.resendText}>
          Not received a code? <Text style={styles.resendLink}>Resend</Text>
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => handleSubmit(code.join(''))}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  codeInput: {
    borderBottomWidth: 2,
    borderColor: '#ccc',
    fontSize: 24,
    width: 60,
    height: 60,
    textAlign: 'center',
    color: '#000',
  },
  resendText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },
  resendLink: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF8A00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
