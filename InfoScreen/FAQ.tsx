import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FAQ = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.header}>Pertanyaan Umum (FAQ)</Text>

        {faqList.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.question}>🍽️ {item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const faqList = [
  {
    question: 'Apakah aplikasi ResepKu ini gratis?',
    answer:
      'Ya, ResepKu sepenuhnya gratis dan bisa digunakan tanpa biaya berlangganan. Semua fitur tersedia tanpa perlu login premium.',
  },
  {
    question: 'Apakah semua resep di aplikasi ini bisa dipercaya?',
    answer:
      'Kami mengkurasi resep dari berbagai sumber terpercaya dan komunitas pengguna. Namun, selalu sesuaikan dengan selera dan kondisi dapur masing-masing.',
  },
  {
    question: 'Bisakah saya menyimpan resep favorit?',
    answer:
      'Tentu! Kamu bisa menggunakan fitur "Bookmark" untuk menyimpan resep favorit dan mengaksesnya kapan saja dari menu Bookmark.',
  },
  {
    question: 'Apakah saya bisa menambahkan resep sendiri?',
    answer:
      'Saat ini fitur untuk menambahkan resep pribadi belum tersedia. Namun, kami sedang mengembangkan fitur ini untuk update mendatang.',
  },
  {
    question: 'Kenapa gambar atau data resep tidak muncul?',
    answer:
      'Coba periksa koneksi internet kamu. Jika masih bermasalah, silakan coba tutup dan buka kembali aplikasi atau hubungi tim kami.',
  },
  {
    question: 'Bagaimana jika saya ingin mencari resep tertentu?',
    answer:
      'Gunakan fitur pencarian di halaman utama dan ketik nama resep atau bahan yang ingin kamu cari.',
  },
  {
    question: 'Apakah aplikasi ini bisa digunakan secara offline?',
    answer:
      'Sebagian fitur memerlukan koneksi internet, seperti memuat data terbaru. Namun, resep yang sudah dibuka bisa tetap diakses selama aplikasi tidak ditutup.',
  },
  {
    question: 'Apakah resep-resep di sini cocok untuk pemula?',
    answer:
      'Ya! Kami menyediakan resep dengan langkah-langkah yang mudah diikuti, cocok untuk pemula maupun yang sudah berpengalaman di dapur.',
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8f0',
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d35400',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  question: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 8,
  },
  answer: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});

export default FAQ;
