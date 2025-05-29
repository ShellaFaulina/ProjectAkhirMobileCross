import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const DATA = [
  {
    id: '1',
    title: 'Rendang Daging Sapi',
    chef: 'Chef Anita',
    time: '120 menit',
    level: 'Sulit',
    likes: 1245,
    savedAt: '2 hari yang lalu',
    image: require('../assets/rendang.jpeg'),
  },
  {
    id: '2',
    title: 'Sate Ayam Madura',
    chef: 'Chef Budi',
    time: '45 menit',
    level: 'Sedang',
    likes: 982,
    savedAt: '5 hari yang lalu',
    image: require('../assets/ayamBakar.jpg'),
  },
  {
    id: '3',
    title: 'Nasi Uduk Betawi',
    chef: 'Chef Diana',
    time: '30 menit',
    level: 'Mudah',
    likes: 754,
    savedAt: '1 minggu yang lalu',
    image: require('../assets/sotoAyam.jpeg'),
  },
];

const BookmarkScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetailScreen', { item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://ui-avatars.com/api/?name=' + item.chef }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.chef}>{item.chef}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        </View>

        <View style={styles.meta}>
          <Text style={styles.metaText}>
            <Ionicons name="time-outline" size={14} /> {item.time}
          </Text>
          <Text style={styles.metaText}>
            <MaterialCommunityIcons name="signal" size={14} /> {item.level}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.like}>
            <Ionicons name="heart" size={14} color="red" /> {item.likes}
          </Text>
          <Text style={styles.savedAt}>Disimpan {item.savedAt}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart" size={20} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resep Favorit</Text>
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="gray" />
        <TextInput
          placeholder="Cari resep favorit..."
          style={styles.input}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={DATA.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchBox: {
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 1 },
    position: 'relative',
  },
  image: {
    width: 120,
    height: 120,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    gap: 10,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  chef: {
    fontSize: 12,
    color: '#888',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  meta: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  like: {
    fontSize: 12,
    color: 'red',
  },
  savedAt: {
    fontSize: 12,
    color: '#666',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
