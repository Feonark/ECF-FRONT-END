import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchRecipes } from "../../utils/api";
import emptyStar from "../../assets/images/star-empty.svg";
import filledStar from "../../assets/images/star-filled.svg";
import timerIcon from "../../assets/images/timer-recipe.svg";
import servingsIcon from "../../assets/images/servings-recipe.svg";
import difficultyIcon from "../../assets/images/difficulty-meter-recipe.svg";
import checkIcon from "../../assets/images/check-icon.svg";
import arrowLeftDefault from "../../assets/images/arrow-left-default.svg";

import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [favorites, setFavorites] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    getRecipe();

    const storedFavs = localStorage.getItem("favorites");
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  const getRecipe = async () => {
    try {
      const localRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
      const apiRecipes = await fetchRecipes();
      const combinedRecipes = [...localRecipes, ...apiRecipes];
      const recipe = combinedRecipes.find(
        (recipe) => recipe.id === parseInt(id)
      );
      setRecipe(recipe);
    } catch (error) {
      console.error("Error while loading recipe:", error);
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

  return (
    <>
      <header className="recipe-header">
        <div className="recipe-header__right-panel">
          <div className="recipe-header__action-buttons">
            <button onClick={() => navigate("/")} className="back-button">
              <img src={arrowLeftDefault}></img>
            </button>
            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`fav-button ${
                favorites.includes(recipe.id) ? "faved" : ""
              }`}
            >
              <img
                src={favorites.includes(recipe.id) ? filledStar : emptyStar}
                alt="Star icon"
              />
            </button>
          </div>

          <div className="recipe-header__content">
            <div className="chips recipe-header__chips">
              <div className="chip">
                <p>{recipe?.originCategory?.name} cuisine</p>
              </div>
              <div className="chip">
                <p>{recipe?.typeCategory?.name}</p>
              </div>
            </div>
            <h1 className="recipe-header__title">{recipe?.title}</h1>
            <p className="recipe-header__description">{recipe?.description}</p>
          </div>
        </div>
        <figure className="recipe-figure">
          <img
            src={recipe?.image}
            className="recipe-image"
            alt={`${recipe?.title} recipe image`}
          />
        </figure>
      </header>

      <main className="recipe-main">
        <div className="recipe-main__left-panel">
          <div className="additional-infos">
            <div className="add-infos__group">
              <div className="additional-info">
                <img src={timerIcon} alt="" />
                <div className="info-content">
                  <p>{recipe?.totalTime} min</p>
                  <p>total time</p>
                </div>
              </div>
              <div className="additional-info">
                <img src={timerIcon} alt="" />
                <div className="info-content">
                  <p>{recipe?.prepTime} min</p>
                  <p>prep time</p>
                </div>
              </div>
            </div>
            <div className="add-infos__group">
              <div className="additional-info">
                <img src={difficultyIcon} alt="" />
                <div className="info-content">
                  <p>{recipe?.difficulty?.name}</p>
                  <p>difficulty</p>
                </div>
              </div>
              <div className="additional-info">
                <img src={servingsIcon} alt="" />
                <div className="info-content">
                  <p>{recipe?.servings}</p>
                  <p>{recipe.servings === 1 ? "serving" : "servings"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="ingredients">
            <div className="ingredients-title">
              <h3 className="recipe-h3-light">{recipe?.ingredients?.length}</h3>
              <h3 className="recipe-h3-dark">
                {recipe?.ingredients?.length === 1
                  ? "ingredient"
                  : "ingredients"}
              </h3>
            </div>

            <div className="ingredients-group">
              {recipe.ingredients &&
                recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient">
                    <div className="ingredient-title">
                      <img src={checkIcon} alt="Check icon" />
                      <p className="ingredient-p-bold">{ingredient?.title}</p>
                    </div>
                    <p>{ingredient?.amount}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="recipe-main__right-panel">
          <div className="steps">
            {recipe.steps &&
              recipe.steps.map((step, index) => (
                <div key={index} className="step">
                  <div className="step-title">
                    <h3>{step?.title}</h3>
                  </div>
                  <div className="step-description">
                    <p>{step?.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Recipe;
