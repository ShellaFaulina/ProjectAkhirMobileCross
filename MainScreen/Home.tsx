import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const categories = ['Salad', 'Breakfast', 'Appetizer', 'Noodle', 'Lunch'];
const STORAGE_KEY = '@last_searches';

const allRecipes = [
  { id: '1', title: 'Salad Buah', category: 'Salad', time: '10 Mins', image: require('../assets/ayamBakar.jpg') },
  { id: '2', title: 'Pancake Pisang', category: 'Breakfast', time: '15 Mins', image: require('../assets/ayamBakar.jpg') },
  { id: '3', title: 'Tahu Crispy', category: 'Appetizer', time: '10 Mins', image: require('../assets/ayamBakar.jpg') },
  { id: '4', title: 'Mie Goreng Jawa', category: 'Noodle', time: '20 Mins', image: require('../assets/ayamBakar.jpg') },
  { id: '5', title: 'Nasi Goreng', category: 'Lunch', time: '15 Mins', image: require('../assets/ayamBakar.jpg') },
];

const popularRecipes = allRecipes.slice(0, 5); // Misal ambil 5 resep pertama untuk populer

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('Salad');
  const [greeting, setGreeting] = useState({ title: '', subtitle: '' });
  const [lastSearches, setLastSearches] = useState([]);

  // Update greeting berdasarkan waktu saat ini
  const updateGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 11) {
      setGreeting({ title: 'Good Morning', subtitle: 'Rise and shine! It’s breakfast time' });
    } else if (hour >= 11 && hour < 15) {
      setGreeting({ title: 'Good Afternoon', subtitle: 'Time for a delicious lunch' });
    } else if (hour >= 15 && hour < 18) {
      setGreeting({ title: 'Good Evening', subtitle: 'How about a light snack?' });
    } else {
      setGreeting({ title: 'Good Night', subtitle: 'Time to relax and unwind' });
    }
  };

  // Load pencarian terakhir dari AsyncStorage
  const loadLastSearches = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue != null) {
        setLastSearches(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.error('Failed to load last searches:', error);
    }
  };

  // Simpan pencarian terakhir ke AsyncStorage
  const saveLastSearches = async (searches) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch (error) {
      console.error('Failed to save last searches:', error);
    }
  };

  // Hapus semua pencarian terakhir dengan konfirmasi
  const deleteAllSearches = () => {
    Alert.alert(
      'Konfirmasi',
      'Apakah kamu yakin ingin menghapus semua pencarian terakhir?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            setLastSearches([]);
            await AsyncStorage.removeItem(STORAGE_KEY);
          },
        },
      ],
    );
  };

  // Tambah item pencarian terakhir
  const addSearch = async (searchItem) => {
    try {
      // Filter duplikat dan masukkan di depan
      let updated = [searchItem, ...lastSearches.filter(i => i.id !== searchItem.id)];
      if (updated.length > 10) updated = updated.slice(0, 10);
      setLastSearches(updated);
      await saveLastSearches(updated);
    } catch (error) {
      console.error('Failed to add last search:', error);
    }
  };

  useEffect(() => {
    updateGreeting();
    loadLastSearches();
    const interval = setInterval(updateGreeting, 900000); // update tiap 15 menit
    return () => clearInterval(interval);
  }, []);

  // Filter resep sesuai kategori
  const filteredRecipes = allRecipes.filter(item => item.category === selectedCategory);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{greeting.title}</Text>
          <Text style={styles.subGreeting}>{greeting.subtitle}</Text>
        </View>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('NotificationScreen')}>
            <Icon name="notifications-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={{ marginLeft: 10 }}>
            <Icon name="person-circle-outline" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Terpopuler */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Terpopuler 🔥</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Semua Resep')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={popularRecipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.navigate('DetailScreen', { item })}
          >
            <Image source={item.image} style={styles.popularCard} />
          </TouchableOpacity>
        )}
      />

      {/* Resep Terbaru */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Resep Terbaru</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Semua Resep')}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategory === cat && styles.categoryButtonSelected,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === cat && styles.categoryTextSelected,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Filtered Recipe Cards */}
      <FlatList
        data={filteredRecipes}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ marginRight: 12 }}
            onPress={() => navigation.navigate('DetailScreen', { item })}
          >
            <View style={styles.recipeCard}>
              <Image source={item.image} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeTime}>⏱ {item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Pencarian Terakhir */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pencarian Terakhir</Text>
        <TouchableOpacity onPress={deleteAllSearches}>
          <Text style={styles.seeAll}>Delete All</Text>
        </TouchableOpacity>
      </View>

      {lastSearches.length > 0 ? (
        <FlatList
          data={lastSearches}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ marginRight: 12 }}
              onPress={() => navigation.navigate('DetailScreen', { item })}
            >
              <Image source={item.image} style={styles.lastSearchImage} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noLastSearch}>Tidak ada pencarian terakhir</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 22, fontWeight: 'bold' },
  subGreeting: { color: '#888', fontSize: 14 },
  icons: { flexDirection: 'row', alignItems: 'center' },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAll: { color: '#FF7622', fontWeight: 'bold' },
  popularCard: {
    width: 160,
    height: 120,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  categoryTabs: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  categoryButton: {
    backgroundColor: '#FFEFE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonSelected: {
    backgroundColor: '#FF7622',
  },
  categoryText: { color: '#FF7622', fontWeight: '500' },
  categoryTextSelected: {
    color: '#fff',
  },
  recipeCard: {
    width: 180,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 10,
  },
  recipeImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 8,
  },
  recipeTitle: { fontSize: 14, fontWeight: 'bold' },
  recipeTime: { color: '#888', fontSize: 12 },
  lastSearchImage: {
    width: 120,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  noLastSearch: {
    padding: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});

export default HomeScreen;
