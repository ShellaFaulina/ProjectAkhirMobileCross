import React, { useLayoutEffect, useState, useEffect } from "react";
import { FlatList, Text, View, Image, TouchableHighlight } from "react-native";
import styles from "./styles";
import { categories } from "../../data/dataArrays";
import { getNumberOfRecipes } from "../../data/MockDataAPI";
import MenuImage from "../../components/MenuImage/MenuImage";
import i18n from "../../../i18n";

export default function CategoriesScreen(props) {
  const { navigation } = props;
  const [locale, setLocale] = useState(i18n.locale);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  // Re-render screen when locale changes (trick: observe locale periodically)
  useEffect(() => {
    const interval = setInterval(() => {
      if (i18n.locale !== locale) {
        setLocale(i18n.locale); // trigger re-render
      }
    }, 500);
    return () => clearInterval(interval);
  }, [locale]);

  const onPressCategory = (item) => {
    const title = i18n.t(item.name.toLowerCase().replace(/\s+/g, "_")); // translate title
    const category = item;
    navigation.navigate("RecipesList", { category, title });
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.photo_url }} />
        <Text style={styles.categoriesName}>
          {i18n.t(item.name.toLowerCase().replace(/\s+/g, "_"))}
        </Text>
        <Text style={styles.categoriesInfo}>
          {getNumberOfRecipes(item.id)} {i18n.t("recipes")}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
}
