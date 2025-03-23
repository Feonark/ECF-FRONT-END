import React from "react";
import { Link } from "react-router";
import "./RecipeCard.css";
import timerIcon from "../../assets/images/timer.svg";
import difficultyIcon from "../../assets/images/difficulty-meter.svg";
import emptyStar from "../../assets/images/star-empty.svg";
import filledStar from "../../assets/images/star-filled.svg";

const RecipeCard = ({ filteredRecipes, toggleFavorite, favorites }) => {
  return (
    <>
      {filteredRecipes.length > 0 && filteredRecipes ? (
        filteredRecipes.map((recipe) => (
          <article className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <div
                className="recipe-card__content"
                style={{ backgroundImage: `url(${recipe.image})` }}
              >
                <div className="recipe-card__chips">
                  <div className="recipe-card__chip">
                    <img src={timerIcon} alt="Difficulty meter icon" />
                    <p>{recipe.totalTime} min</p>
                  </div>
                  <div className="recipe-card__chip">
                    <img src={difficultyIcon} alt="Difficulty meter icon" />
                    <p>{recipe.difficulty?.name}</p>
                  </div>
                </div>
                <div className="recipe-card__bottom">
                  <div className="triangle" />
                  <h3 className="recipe-card__title">{recipe.title}</h3>
                </div>
              </div>
            </Link>

            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`recipe-card__fav-button ${
                favorites.includes(recipe.id) ? "faved" : ""
              }`}
            >
              <img
                src={favorites.includes(recipe.id) ? filledStar : emptyStar}
                alt="Star icon"
              />
            </button>
          </article>
        ))
      ) : (
        <p>Sorry, we haven't found any recipe matching your criterias.</p>
      )}
    </>
  );
};

export default RecipeCard;
