import React, { useState, useEffect } from "react";
import {
  fetchRecipes,
  fetchOriginCategories,
  fetchTypeCategories,
  fetchDifficulties,
} from "../../utils/api";
import "./Home.css";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import FormModal from "../../components/FormModal/FormModal";
import Logo from "../../assets/images/miamiam-logo.svg";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
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

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <div className="home-container">
      <header className="home-header">
        <img src={Logo} alt="Logo de Miam miam" className="home-logo" />

        <div className="header-content">
          <h1 className="header-title">Recipes</h1>
          <div className="origin-cat__buttons">
            <button
              onClick={() => setSelectedOriginCat(null)}
              className={`origin-cat__button ${
                selectedOriginCat === null ? "origin-cat__btn-active" : ""
              }`}
            >
              <span>🌍</span> All
            </button>

            {originCategories.map((originCat) => (
              <button
                key={originCat.id}
                onClick={() => setSelectedOriginCat(originCat.id)}
                className={`origin-cat__button ${
                  selectedOriginCat === originCat.id
                    ? "origin-cat__btn-active"
                    : ""
                }`}
              >
                <span>{originCat.icon}</span> {originCat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="home-main">
        <div className="filter-panel">
          <div className="filter-panel__buttons">
            <button
              onClick={() => setSelectedTypeCat(null)}
              className={`filter-panel__button ${
                selectedTypeCat === null ? "filter-panel__btn-active" : ""
              }`}
            >
              All
            </button>
            {typeCategories.map((typeCat) => (
              <button
                key={typeCat.id}
                onClick={() => setSelectedTypeCat(typeCat.id)}
                className={`filter-panel__button ${
                  selectedTypeCat === typeCat.id
                    ? "filter-panel__btn-active"
                    : ""
                }`}
              >
                {typeCat.name}
              </button>
            ))}
          </div>

          <div className="iconed-input">
            <input
              type="search"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              className="filter-panel__search-input"
            />
          </div>
        </div>

        <div className="home-recipes-panel">
          <div className="home-recipes-panel__header">
            <p>{filteredRecipes.length} recipes found</p>
            <div className="home__action-buttons">
              <button
                onClick={() => setShowOnlyFav((prev) => !prev)}
                className="toggle-button"
              >
                {showOnlyFav ? "Show only fav" : "Show all recipes"}
                <div
                  className={`toggle-container ${
                    showOnlyFav ? "toggle-container-active" : ""
                  }`}
                >
                  <div
                    className={`toggle-circle ${
                      showOnlyFav ? "toggle-circle-active" : ""
                    }`}
                  />
                </div>
              </button>
              <button
                className={`action-button`}
                onClick={() => setIsModalOpen(true)}
              >
                Create recipe
              </button>
            </div>
          </div>

          <div className="recipe-cards__grid">
            <RecipeCard
              filteredRecipes={filteredRecipes}
              toggleFavorite={toggleFavorite}
              favorites={favorites}
            />
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <FormModal
              originCategories={originCategories}
              typeCategories={typeCategories}
              difficulties={difficulties}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
