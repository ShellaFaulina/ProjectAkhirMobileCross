import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const EditRecipeScreen = ({ route, navigation }) => {
  // Ambil data resep dari parameter route
  const { recipe } = route.params;

  const [image, setImage] = useState<string | null>(recipe?.image || null);
  const [title, setTitle] = useState(recipe?.title || '');
  const [serves, setServes] = useState(recipe?.serves || '');
  const [cookTime, setCookTime] = useState(recipe?.cookTime || '');
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients || [{ name: '', quantity: '' }]
  );
  const [steps, setSteps] = useState(recipe?.steps || ['']);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) return;
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientChange = (index: number, key: string, value: string) => {
    const updated = [...ingredients];
    updated[index][key] = value;
    setIngredients(updated);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleStepChange = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const handleSave = () => {
    if (!title || !serves || !cookTime || ingredients.some(i => !i.name || !i.quantity) || steps.some(s => !s)) {
      Alert.alert('Error', 'Semua field wajib diisi!');
      return;
    }
    // Simpan perubahan resep ke database di sini
    Alert.alert('Sukses', 'Resep berhasil diperbarui!');
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Konfirmasi Hapus',
      `Apakah kamu yakin ingin menghapus resep "${title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            // Hapus resep dari database di sini
            Alert.alert('Dihapus', 'Resep berhasil dihapus!');
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#7F4F24" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Resep</Text>

      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image" size={40} color="#ccc" />
            <Text style={styles.placeholderText}>Tambah Foto Resep</Text>
          </View>
        )}
        <TouchableOpacity onPress={takePhoto} style={styles.cameraIcon}>
          <Ionicons name="camera" size={20} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>

      <TextInput
        placeholder="Nama Resep"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholderTextColor="#B08968"
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Porsi"
          style={styles.smallInput}
          keyboardType="numeric"
          value={serves}
          onChangeText={setServes}
          placeholderTextColor="#B08968"
        />
        <TextInput
          placeholder="Waktu Masak (menit)"
          style={styles.smallInput}
          keyboardType="numeric"
          value={cookTime}
          onChangeText={setCookTime}
          placeholderTextColor="#B08968"
        />
      </View>

      <Text style={styles.sectionTitle}>Bahan-bahan</Text>
      {ingredients.map((ing, index) => (
        <View key={index} style={styles.row}>
          <TextInput
            placeholder="Nama Bahan"
            style={styles.mediumInput}
            value={ing.name}
            onChangeText={(text) => handleIngredientChange(index, 'name', text)}
            placeholderTextColor="#B08968"
          />
          <TextInput
            placeholder="Jumlah"
            style={styles.mediumInput}
            value={ing.quantity}
            onChangeText={(text) => handleIngredientChange(index, 'quantity', text)}
            placeholderTextColor="#B08968"
          />
        </View>
      ))}
      <TouchableOpacity onPress={handleAddIngredient}>
        <Text style={styles.addText}>+ Tambah Bahan</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Langkah-langkah</Text>
      {steps.map((step, idx) => (
        <TextInput
          key={idx}
          placeholder={`Langkah ${idx + 1}`}
          style={styles.input}
          value={step}
          onChangeText={(text) => handleStepChange(idx, text)}
          multiline
          placeholderTextColor="#B08968"
        />
      ))}
      <TouchableOpacity onPress={handleAddStep}>
        <Text style={styles.addText}>+ Tambah Langkah</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Hapus Resep</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8F0' },
  backButton: { marginBottom: 8, alignSelf: 'flex-start' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 18, color: '#7F4F24' },
  imageContainer: {
    position: 'relative',
    marginBottom: 18,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FFE5B4',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  image: {
    width: windowWidth - 40,
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: windowWidth - 40,
    height: 200,
    borderRadius: 12,
    backgroundColor: '#FFE8D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#B08968',
    fontSize: 14,
    marginTop: 8,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#EF4444',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  input: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 8,
    marginBottom: 14,
    fontSize: 15,
    color: '#7F4F24',
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  smallInput: {
    backgroundColor: 'white',
    flex: 0.48,
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    color: '#7F4F24',
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  mediumInput: {
    backgroundColor: 'white',
    flex: 0.48,
    padding: 14,
    borderRadius: 8,
    fontSize: 15,
    color: '#7F4F24',
    borderWidth: 1,
    borderColor: '#FFE5B4',
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 12,
    color: '#7F4F24',
  },
  addText: {
    color: '#EF4444',
    marginBottom: 24,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 2,
  },
  saveButton: {
    backgroundColor: '#EF4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
  },
  saveButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  deleteButton: {
    backgroundColor: '#fff',
    borderColor: '#EF4444',
    borderWidth: 1.5,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditRecipeScreen;