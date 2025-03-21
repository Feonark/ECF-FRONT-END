export const fetchRecipes = async () => {
  const response = await fetch('/recipes.json');
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return await response.json();
};

export const fetchOriginCategories = async () => {
  const response = await fetch('/originCategories.json');
  if (!response.ok) {
    throw new Error("Failed to fetch origin categories");
  }
  return await response.json();
};

export const fetchTypeCategories = async () => {
  const response = await fetch('/typeCategories.json');
  if (!response.ok) {
    throw new Error("Failed to fetch type categories");
  }
  return await response.json();
};

export const fetchDifficulties = async () => {
  const response = await fetch('/difficulties.json');
  if (!response.ok) {
    throw new Error("Failed to fetch difficulties");
  }
  return await response.json();
};