import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import dataResep from "../dataResep.json";

const DetailScreen = ({ route }: any) => {
  const { item } = route.params;
  const navigation = useNavigation();

  const resep = dataResep.find(
    (r) => r.title.toLowerCase() === item.title?.toLowerCase()
  );
  if (!resep)
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Resep tidak ditemukan</Text>
      </View>
    );

  const langkahMemasak = Array.from({ length: resep.steps.length }, (_, index) => ({
    title: `Langkah ${index + 1}`,
    detail: resep.steps[index],
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={styles.icon.color} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.recipeTitle}>{resep.title}</Text>
          <Text style={styles.subTitle}>
            {resep.category} | {resep.releaseDate}
          </Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.ratingStar}>★</Text>
          <Text style={styles.ratingValue}>{resep.rating.toFixed(2)}</Text>
        </View>

        {/* Bahan-Bahan */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Bahan-bahan</Text>
          {resep.ingredients?.map((bahan, idx) => (
            <Text key={idx} style={styles.infoValue}>
              • {bahan}
            </Text>
          ))}
        </View>

        {/* Langkah Memasak */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Langkah Memasak</Text>
          {langkahMemasak.map((step, idx) => (
            <View key={idx} style={styles.stepItem}>
              <Text style={styles.infoLabel}>{step.title}</Text>
              <Text style={styles.infoValue}>{step.detail}</Text>
            </View>
          ))}
        </View>

        {/* Info Tambahan */}
        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Info Resep</Text>
          <Text style={styles.infoLabel}>Kategori:</Text>
          <Text style={styles.infoValue}>{resep.category}</Text>
          <Text style={styles.infoLabel}>Pembuat:</Text>
          <Text style={styles.infoValue}>{resep.chef}</Text>
          <Text style={styles.infoLabel}>Tanggal Rilis:</Text>
          <Text style={styles.infoValue}>{resep.releaseDate}</Text>
          <Text style={styles.infoLabel}>Deskripsi:</Text>
          <Text style={styles.infoValue}>{resep.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;

const colors = {
  background: "#FFF8F0",    // krem lembut
  primaryText: "#4E342E",   // coklat tua
  secondaryText: "#6D4C41", // coklat medium
  accent: "#FFB74D",        // orange pastel
  sectionBg: "#FFE5B4",     // krem muda
  ratingStar: "#FFD700",    // kuning emas
  icon: "#4E342E",          // coklat tua untuk icon back
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingTop: 20,
  },
  back: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  icon: {
    color: colors.icon,
  },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 22,
    color: colors.primaryText,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.secondaryText,
    fontSize: 14,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  ratingStar: {
    color: colors.ratingStar,
    fontSize: 22,
  },
  ratingValue: {
    color: colors.primaryText,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 6,
  },
  infoBox: {
    backgroundColor: colors.sectionBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoLabel: {
    color: colors.secondaryText,
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  infoValue: {
    color: colors.primaryText,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 4,
  },
  stepItem: {
    marginBottom: 12,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  notFoundText: {
    color: colors.primaryText,
    fontSize: 16,
  },
});
