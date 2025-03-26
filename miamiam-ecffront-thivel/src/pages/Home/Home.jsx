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

  // Ici je vais aller chercher à la fois les recettes stockées dans "recipes.json" et les recettes ajoutées en localStorage (s'il y en a)
  const getRecipes = async () => {
    try {
      const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const apiRecipes = await fetchRecipes();
      const combinedRecipes = [...localRecipes, ...apiRecipes]; // une fois récupérées je les combine
      setRecipes(combinedRecipes);
      setFilteredRecipes(combinedRecipes); // j'utilise filteredRecipes pour l'affichage étant donné que mes différents filtres (catégories de la recette, recherche et favoris) vont venir modifier le contenu de ce tableau
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

  // toggleFavorite va me permettre d'ajouter ou supprimer une recette des favoris (en localStorage)
  const toggleFavorite = (recipeId) => {
    let updatedFavorites;
    if (favorites.includes(recipeId)) {
      updatedFavorites = favorites.filter((id) => id !== recipeId); // Si mon tableau favorites contient l'id de la recette sur lequel je viens de cliquer le bouton favori, alors je filtre l'affichage pour que seules les recettes ne contenant pas cet id restent dans le tableau.
    } else {
      updatedFavorites = [...favorites, recipeId]; // Sinon, j'ajoute l'id de la recette dans le tableau.
    }
    setFavorites(updatedFavorites); // J'actualise l'état du tableau des favoris
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // J'actualise le localStorage pour qu'il intègre mes nouvelles données
  };

  // Simple toggle pour l'ouverture de la modale. Il s'agit juste d'inverser l'état
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  // La fonction applyFilters va me permettre de filtrer mes recettes. J'ai 4 types de filtres interconnectés : favoris, origine de la recette, type et valeur de la recherche.
  // Mon but c'est que les recettes soient filtrées selon ces critères simultanément
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

  // Ce useEffect me permet de récupérer les données nécessaires à l'affichage de mes données + la récupération des favoris en localStorage à chaque chargement de la page (et seulement une fois)
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

  // Ce useEffect se déclenche seulement lorsque les états mentionnés changent. Il va me permettre d'actualiser en temps réel l'affichage des recettes lorsque l'utilisateur les filtrent
  useEffect(() => {
    applyFilters();
  }, [selectedOriginCat, selectedTypeCat, searchValue, recipes, showOnlyFav]);

  // Et enfin celui-là me permet de bloquer le scroll de la page Home lorsque la modale est ouverte.
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
              <button className={`action-button`} onClick={() => toggleModal()}>
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
        <div className="modal-overlay" onClick={() => toggleModal()}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <FormModal
              originCategories={originCategories}
              typeCategories={typeCategories}
              difficulties={difficulties}
              toggleModal={toggleModal}
              onUpdateRecipes={getRecipes}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
