import { recipes, categories, ingredients } from './dataArrays';

// ✅ Ambil objek kategori lengkap
export function getCategoryById(categoryId) {
  return categories.find(data => data.id === categoryId);
}

// ✅ Ambil nama bahan
export function getIngredientName(ingredientID) {
  const found = ingredients.find(data => data.ingredientId === ingredientID);
  return found ? found.name : '';
}

// ✅ Ambil URL gambar bahan
export function getIngredientUrl(ingredientID) {
  const found = ingredients.find(data => data.ingredientId === ingredientID);
  return found ? found.photo_url : '';
}

// ✅ Ambil key nama kategori (dipakai di i18n.t())
export function getCategoryName(categoryId) {
  const found = categories.find(data => data.id === categoryId);
  return found ? found.name.toLowerCase().replace(/\s+/g, '_') : '';
}

// ✅ Ambil resep berdasarkan kategori
export function getRecipes(categoryId) {
  return recipes.filter(data => data.categoryId === categoryId);
}

// ✅ Ambil resep berdasarkan ID bahan
export function getRecipesByIngredient(ingredientId) {
  return recipes.filter(data =>
    data.ingredients.some(index => index[0] === ingredientId)
  );
}

// ✅ Hitung resep per kategori
export function getNumberOfRecipes(categoryId) {
  return recipes.filter(data => data.categoryId === categoryId).length;
}

// ✅ Ambil semua objek bahan dari array ID
export function getAllIngredients(idArray) {
  return idArray.map(index => {
    const found = ingredients.find(data => data.ingredientId === index[0]);
    return found ? [found, index[1]] : null;
  }).filter(Boolean);
}

// ✅ Cari resep berdasarkan nama bahan
export function getRecipesByIngredientName(ingredientName) {
  const nameUpper = ingredientName.toUpperCase();
  const matchingIngredients = ingredients.filter(data =>
    data.name.toUpperCase().includes(nameUpper)
  );

  const recipeSet = new Set();
  matchingIngredients.forEach(ingredient => {
    getRecipesByIngredient(ingredient.ingredientId).forEach(recipe =>
      recipeSet.add(recipe)
    );
  });

  return Array.from(recipeSet);
}

// ✅ Cari resep berdasarkan nama kategori
export function getRecipesByCategoryName(categoryName) {
  const nameUpper = categoryName.toUpperCase();
  const matchingCategories = categories.filter(data =>
    data.name.toUpperCase().includes(nameUpper)
  );

  return matchingCategories.flatMap(cat => getRecipes(cat.id));
}

// ✅ Cari resep berdasarkan nama resep
export function getRecipesByRecipeName(recipeName) {
  const nameUpper = recipeName.toUpperCase();
  return recipes.filter(data =>
    data.title.toUpperCase().includes(nameUpper)
  );
}
