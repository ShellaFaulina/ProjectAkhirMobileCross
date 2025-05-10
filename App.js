import React, { useState, useEffect } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Text,
  Platform,
  Alert,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Geolocation from 'react-native-geolocation-service';
import { createClient } from '@supabase/supabase-js';

// Supabase setup (replace with your own credentials)
const supabase = createClient('https://your-project-id.supabase.co', 'your-anon-key');
const teksTable = 'teks';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Please allow access to media library.');
      }
    })();
  }, []);

  const handleCamera = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'This app needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Camera permission denied');
        return;
      }
    }

    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
      },
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image Picker Error: ', response.errorMessage);
        } else if (response.assets?.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
          await saveToPictures(uri);
          await simpanKeSupabase('Foto diambil dari kamera', uri);
        }
      }
    );
  };

  const handleGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      async (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.error('Image Picker Error: ', response.errorMessage);
        } else if (response.assets?.length > 0) {
          const uri = response.assets[0].uri;
          setImageUri(uri);
          await simpanKeSupabase('Foto dipilih dari galeri', uri);
        }
      }
    );
  };

  const saveToPictures = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.getAlbumAsync('Pictures');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Pictures', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album.id, false);
      }
      Alert.alert('Success', 'Foto disimpan ke folder Pictures!');
    } catch (error) {
      console.error('Failed to save image: ', error);
    }
  };

  const createTextFile = async () => {
    const path = FileSystem.documentDirectory + 'test.txt';
    try {
      await FileSystem.writeAsStringAsync(path, 'Lorem ipsum dolor sit amet', {
        encoding: FileSystem.EncodingType.UTF8,
      });
      Alert.alert('Success', 'File teks berhasil dibuat!');
      await simpanKeSupabase('File teks dibuat', path);
    } catch (err) {
      console.error('Error writing file: ', err);
    }
  };

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      async (position) => {
        console.log(position.coords);
        setLocation(position.coords);
        await simpanKeSupabase('Lokasi diambil', '', position.coords);
      },
      (error) => {
        console.error(`Code ${error.code}, ${error.message}`);
        Alert.alert('Error', error.message);
      },
      {
        accuracy: { android: 'high' },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      }
    );
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version < 23) return true;

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    return status === PermissionsAndroid.RESULTS.GRANTED;
  };

  const simpanKeSupabase = async (keterangan, path = '', coords = null) => {
    try {
      const { data, error } = await supabase.from(teksTable).insert([
        {
          keterangan,
          path,
          lokasi: coords
            ? {
                latitude: coords.latitude,
                longitude: coords.longitude,
              }
            : null,
          timestamp: new Date(),
        },
      ]);
      if (error) throw error;
      console.log('Data disimpan ke Supabase:', data);
    } catch (error) {
      console.error('Gagal simpan ke Supabase:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nama: Shella Faulina</Text>
      <Text style={styles.subtitle}>NIM: 00000079493</Text>

      <Button title="OPEN CAMERA" onPress={handleCamera} />
      <Button title="OPEN GALLERY" onPress={handleGallery} />
      <Button title="CREATE TEXT FILE" onPress={createTextFile} />
      <Button title="GET GEO LOCATION" onPress={getLocation} />

      {location && (
        <View style={{ marginTop: 16 }}>
          <Text>Longitude: {location.longitude}</Text>
          <Text>Latitude: {location.latitude}</Text>
        </View>
      )}

      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    alignSelf: 'center',
  },
});
