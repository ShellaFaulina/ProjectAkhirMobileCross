import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import dataAllRecipe from '../dataAllRecipe.json'; // ubah nama file data resep sesuai
import imageMapping from './imageMapping';

const AllRecipe = ({ navigation }) => {
  const renderItem = (item) => {
    const imageSource = imageMapping[item.imageName];

    return (
      <TouchableOpacity
        key={item.id}
        style={styles.card}
        onPress={() => navigation.navigate('DetailScreen', { item })}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{item.kategori || 'Resep Masakan'}</Text>
          <Text style={styles.title}>{item.nama}</Text>
          <Text style={styles.detail}>Waktu: {item.durasiMasak}</Text>
          <View style={styles.bottomRow}>
            <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
            <Text style={styles.views}>{item.populer} disukai</Text>
          </View>
          {item.status && (
            <View style={styles.statusContainer}>
              <Text style={styles.status}>{item.status}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Semua Resep</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {dataAllRecipe.map((item) => renderItem(item))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff8f0' },
  header: {
    color: '#e67e22',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
    position: 'relative',
  },
  category: {
    color: '#2ecc71',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  detail: {
    color: '#7f8c8d',
    fontSize: 14,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  rating: {
    color: '#f39c12',
    fontSize: 14,
    fontWeight: 'bold',
  },
  views: {
    color: '#888',
    fontSize: 14,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: '#ffeaa7',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  status: {
    color: '#d35400',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default AllRecipe;
