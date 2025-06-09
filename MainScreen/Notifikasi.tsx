import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const notifications = {
  Today: [
    {
      id: 1,
      title: "New recipe!",
      desc: "Far far away, behind the word mountains, far from the countries.",
      unread: true,
    },
    {
      id: 2,
      title: "Don’t forget to try your saved recipe",
      desc: "Far far away, behind the word mountains, far from the countries.",
      unread: true,
    },
  ],
  Yesterday: [
    {
      id: 3,
      title: "Don’t forget to try your saved recipe",
      desc: "Far far away, behind the word mountains, far from the countries.",
      unread: false,
    },
  ],
};

const NotificationScreen = () => {
  const [selectedTab, setSelectedTab] = useState("All");
  const navigation = useNavigation();

  const filterNotifications = () => {
    if (selectedTab === "All") return notifications;
    const filtered = {};
    Object.entries(notifications).forEach(([day, list]) => {
      filtered[day] = list.filter((item) =>
        selectedTab === "Unread" ? item.unread : !item.unread
      );
    });
    return filtered;
  };

  const renderNotificationCard = (item) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.iconWrapper}>
        <Ionicons name="fast-food-outline" size={22} color="white" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      {item.unread && <View style={styles.dot} />}
    </View>
  );

  const tabs = ["All", "Unread", "Read"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#7F4F24" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Notifications</Text>

        <View style={{ width: 24 }} />
      </View>

      <View style={styles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              selectedTab === tab && styles.activeTabButton,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.listContainer}>
        {Object.entries(filterNotifications()).map(([day, data]) => (
          <View key={day}>
            {data.length > 0 && <Text style={styles.dayHeader}>{day}</Text>}
            {data.map((item) => renderNotificationCard(item))}
          </View>
        ))}
        <Text style={styles.endText}>You’re all set!</Text>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#7F4F24",
  },
  tabRow: {
    flexDirection: "row",
    marginVertical: 20,
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 5,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTabButton: {
    backgroundColor: "#FF6F3C",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A67C52",
  },
  activeTabText: {
    color: "white",
  },
  dayHeader: {
    marginVertical: 10,
    fontWeight: "bold",
    fontSize: 16,
    color: "#7F4F24",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 10,
    position: "relative",
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // elevation for Android
    elevation: 3,
  },
  iconWrapper: {
    backgroundColor: "#2ECC71",
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#7F4F24",
  },
  desc: {
    fontSize: 13,
    color: "#6B4B2A",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF3B30",
    position: "absolute",
    right: 10,
    top: 10,
  },
  endText: {
    textAlign: "center",
    marginVertical: 20,
    color: "#6B4B2A",
  },
  listContainer: {
    flex: 1,
  },
});
