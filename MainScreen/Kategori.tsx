import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

const DATA = [
  { id: '1', title: 'Nasi & Mie', count: 150},
  { id: '2', title: 'Ayam & Daging', count: 120},
  { id: '3', title: 'Seafood', count: 85},
  { id: '4', title: 'Sayuran', count: 95},
  { id: '5', title: 'Sup & Soto', count: 75},
  { id: '6', title: 'Kue & Dessert', count: 110},
  { id: '7', title: 'Minuman', count: 65},
  { id: '8', title: 'Sarapan', count: 80},
];

const numColumns = 2;
const itemWidth = Dimensions.get('window').width / numColumns - 20;

const KategoriScreen = () => {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <ImageBackground source={item.image} style={styles.image} imageStyle={{ borderRadius: 10 }}>
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.count}>{item.count} Resep</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default KategoriScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    width: itemWidth,
    height: 120,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 10,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  count: {
    color: 'white',
    fontSize: 12,
  },
});
