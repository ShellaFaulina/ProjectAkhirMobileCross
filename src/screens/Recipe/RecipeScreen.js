import React, { useLayoutEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import styles from "./styles";
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import {
  getIngredientName,
  getCategoryName,
  getCategoryById,
} from "../../data/MockDataAPI";
import BackButton from "../../components/BackButton/BackButton";
import ViewIngredientsButton from "../../components/ViewIngredientsButton/ViewIngredientsButton";
import i18n from "../../../i18n";

const { width: viewportWidth } = Dimensions.get("window");

export default function RecipeScreen(props) {
  const { navigation, route } = props;
  const item = route.params?.item;
  const category = getCategoryById(item.categoryId);
  const titleKey = getCategoryName(category.id); // key: 'cookies', 'salad', etc.
  const recipeKey = item.title.toLowerCase().replace(/\s+/g, '_'); // e.g. "Vegan Cookies" → "vegan_cookies"
  const slider1Ref = useRef(null);
  const progress = useSharedValue(0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerLeft: () => <BackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <View />,
    });
  }, []);

  const renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: item }} />
      </View>
    </TouchableHighlight>
  );

  const onPressPagination = (index) => {
    slider1Ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const onPressIngredient = (ingredient) => {
    const name = getIngredientName(ingredient);
    navigation.navigate("Ingredient", { ingredient, name });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <View style={styles.carousel}>
          <Carousel
            ref={(c) => (slider1Ref.current = c)}
            loop={false}
            width={viewportWidth}
            height={viewportWidth}
            autoPlay={false}
            data={item.photosArray}
            scrollAnimationDuration={1000}
            renderItem={renderImage}
            onProgressChange={progress}
          />
          <Pagination.Basic
            renderItem={() => (
              <View style={{ backgroundColor: "rgba(255,255,255,1)", flex: 1 }} />
            )}
            progress={progress}
            data={item.photosArray}
            dotStyle={styles.paginationDot}
            containerStyle={styles.paginationContainer}
            onPress={onPressPagination}
          />
        </View>
      </View>

      <View style={styles.infoRecipeContainer}>
        {/* 🔁 Resep name ikut diterjemahkan */}
        <Text style={styles.infoRecipeName}>
          {i18n.t(recipeKey)}
        </Text>

        {/* 🔁 Kategori diterjemahkan */}
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("RecipesList", { category, title: titleKey })
            }
          >
            <View>
              <Text style={styles.category}>
                {i18n.t(titleKey).toUpperCase()}
              </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.infoContainer}>
          <Image
            style={styles.infoPhoto}
            source={require("../../../assets/icons/time.png")}
          />
          <Text style={styles.infoRecipe}>
            {item.time} {i18n.t("minutes")}
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <ViewIngredientsButton
            onPress={() => {
              const ingredients = item.ingredients;
              const translatedTitle = i18n.t(recipeKey);
              const viewTitle = `${i18n.t("ingredients_for")} ${translatedTitle}`;
              navigation.navigate("IngredientsDetails", { ingredients, title: viewTitle });
            }}
          />
        </View>

        <View style={styles.infoContainer}>
          {/* Deskripsi tetap dalam bahasa Inggris */}
          <Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
