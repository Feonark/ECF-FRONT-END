import React, { useState, useEffect } from "react";
import {
  fetchRecipes,
  fetchOriginCategories,
  fetchTypeCategories,
  fetchDifficulties,
} from "../../utils/api";
import "./Home.css";
import FormModal from "../../components/FormModal/FormModal";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [originCategories, setOriginCategories] = useState([]);
  const [typeCategories, setTypeCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [selectedOriginCat, setSelectedOriginCat] = useState(null);
  const [selectedTypeCat, setSelectedTypeCat] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showOnlyFav, setShowOnlyFav] = useState(false);

  const getRecipes = async () => {
    try {
      const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const apiRecipes = await fetchRecipes();
      const combinedRecipes = [...localRecipes, ...apiRecipes];

      setRecipes(combinedRecipes);
      setFilteredRecipes(combinedRecipes);
    } catch (error) {
      console.error("Error while loading recipes:", error);
    }
  };

  const getOriginCategories = async () => {
    try {
      const data = await fetchOriginCategories();
      setOriginCategories(data);
    } catch (error) {
      console.error("Error while loading origin categories:", error);
    }
  };

  const getTypeCategories = async () => {
    try {
      const data = await fetchTypeCategories();
      setTypeCategories(data);
    } catch (error) {
      console.error("Error while loading type categories:", error);
    }
  };

  const getDifficulties = async () => {
    try {
      const data = await fetchDifficulties();
      setDifficulties(data);
    } catch (error) {
      console.error("Error while loading difficulties:", error);
    }
  };

  const toggleFavorite = (recipeId) => {
    let updatedFavorites;
    if (favorites.includes(recipeId)) {
      updatedFavorites = favorites.filter((id) => id !== recipeId);
    } else {
      updatedFavorites = [...favorites, recipeId];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const applyFilters = () => {
    let filteredData = recipes;

    if (showOnlyFav) {
      filteredData = filteredData.filter((recipe) =>
        favorites.includes(recipe.id)
      );
    }

    if (selectedOriginCat !== null) {
      filteredData = filteredData.filter(
        (recipe) => recipe.originCategory.id === selectedOriginCat
      );
    }

    if (selectedTypeCat !== null) {
      filteredData = filteredData.filter(
        (recipe) => recipe.typeCategory.id === selectedTypeCat
      );
    }

    filteredData = filteredData.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredRecipes(filteredData);
  };

  useEffect(() => {
    getRecipes();
    getOriginCategories();
    getTypeCategories();
    getDifficulties();

    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedOriginCat, selectedTypeCat, searchValue, recipes, showOnlyFav]);

  return (
    <div>
      <div>
        <button
          onClick={() => setSelectedOriginCat(null)}
          className={selectedOriginCat === null ? "red" : ""}
        >
          All
        </button>
        {originCategories.map((originCat) => (
          <button
            key={originCat.id}
            onClick={() => setSelectedOriginCat(originCat.id)}
            className={selectedOriginCat === originCat.id ? "red" : ""}
          >
            {originCat.name}
          </button>
        ))}
      </div>

      <div>
        <input type="search" onChange={(e) => setSearchValue(e.target.value)} />
      </div>

      <div>
        <button
          onClick={() => setSelectedTypeCat(null)}
          className={selectedTypeCat === null ? "red" : ""}
        >
          All
        </button>
        {typeCategories.map((typeCat) => (
          <button
            key={typeCat.id}
            onClick={() => setSelectedTypeCat(typeCat.id)}
            className={selectedTypeCat === typeCat.id ? "red" : ""}
          >
            {typeCat.name}
          </button>
        ))}
      </div>

      <button onClick={() => setShowOnlyFav((prev) => !prev)}>
        {showOnlyFav ? "Show all recipes" : "Show only fav"}
      </button>

      {filteredRecipes.length > 0 ? (
        <div>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id}>
              <img src={recipe.image} alt="" />
              <div>{recipe.title}</div>
              <div>{recipe.id}</div>
              <button onClick={() => toggleFavorite(recipe.id)}>
                {favorites.includes(recipe.id)
                  ? "Remove from fav"
                  : "Add to fav"}
              </button>{" "}
            </div>
          ))}
        </div>
      ) : (
        <div>Sorry, we haven't found any recipe matching your criterias.</div>
      )}
      <FormModal
        originCategories={originCategories}
        typeCategories={typeCategories}
        difficulties={difficulties}
      />
    </div>
  );
}

export default App;
