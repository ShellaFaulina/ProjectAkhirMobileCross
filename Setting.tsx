import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

const Setting = ({ navigation }) => {
  const [vibrate, setVibrate] = useState(true);
  const [fastMode, setFastMode] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    const loadSettings = async () => {
      const storedVibrate = await AsyncStorage.getItem('vibrate');
      const storedFastMode = await AsyncStorage.getItem('fastMode');
      const storedDarkMode = await AsyncStorage.getItem('darkMode');

      if (storedVibrate !== null) setVibrate(storedVibrate === 'true');
      if (storedFastMode !== null) setFastMode(storedFastMode === 'true');
      if (storedDarkMode !== null) setDarkMode(storedDarkMode === 'true');
    };
    loadSettings();
  }, []);

  const toggleSetting = async (key, value, setValue) => {
    setValue(value);
    await AsyncStorage.setItem(key, value.toString());
  };

  const handleLogout = async () => {
    Alert.alert('Konfirmasi', 'Yakin ingin logout?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('user');
          setUser(null);
          navigation.replace('Login');
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>⚙️ Pengaturan</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tampilan</Text>

        <SettingRow
          title="Mode Gelap"
          description="Aktifkan tampilan gelap"
          value={darkMode}
          onValueChange={(v) => toggleSetting('darkMode', v, setDarkMode)}
        />
        <SettingRow
          title="Fast Mode"
          description="Sembunyikan thumbnail resep"
          value={fastMode}
          onValueChange={(v) => toggleSetting('fastMode', v, setFastMode)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interaksi</Text>

        <SettingRow
          title="Getar"
          description="Getar saat data dimuat"
          value={vibrate}
          onValueChange={(v) => toggleSetting('vibrate', v, setVibrate)}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi</Text>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoTitle}>Tentang Aplikasi</Text>
          <Text style={styles.infoDesc}>Pelajari lebih lanjut tentang ResepKu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoTitle}>Beri Rating</Text>
          <Text style={styles.infoDesc}>Bantu kami dengan ulasan kamu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoItem}>
          <Text style={styles.infoTitle}>Versi Aplikasi</Text>
          <Text style={styles.infoDesc}>ResepKu v1.0.0</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const SettingRow = ({ title, description, value, onValueChange }) => (
  <View style={styles.row}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
    <Switch value={value} onValueChange={onValueChange} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff8f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  infoItem: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  infoDesc: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Setting;
