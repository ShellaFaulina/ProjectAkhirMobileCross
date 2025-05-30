import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image
} from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import i18n from '../../../i18n';

export default function HomeScreen(props) {
  const { navigation } = props;

  const [locale, setLocale] = useState(i18n.locale); // ✅ simpan locale aktif

  useLayoutEffect(() => {
    navigation.setOptions({
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

  // ✅ Pantau perubahan bahasa
  useEffect(() => {
    const interval = setInterval(() => {
      if (i18n.locale !== locale) {
        setLocale(i18n.locale); // trigger re-render
      }
    }, 500);
    return () => clearInterval(interval);
  }, [locale]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>
          {i18n.t(item.title.toLowerCase().replace(/\s+/g, "_"))}
        </Text>
        <Text style={styles.category}>
          {i18n.t(getCategoryName(item.categoryId).toLowerCase().replace(/\s+/g, "_"))}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <View>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
