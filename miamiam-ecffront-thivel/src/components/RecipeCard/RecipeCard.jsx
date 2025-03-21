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
      {filteredRecipes.length > 0 &&
        filteredRecipes &&
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
                <div>
                  <div className="triangle" />
                  <h3 className="recipe-card__title">{recipe.title}</h3>
                </div>
              </div>
            </Link>

            <button
              onClick={() => toggleFavorite(recipe.id)}
              className={`recipe-card__fav-button ${favorites.includes(recipe.id) ? "faved" : ""}`}
            >
              <img
                src={favorites.includes(recipe.id) ? filledStar : emptyStar}
                alt="Star icon"
              />
            </button>
          </article>
        ))}

      {/* {filteredRecipes.length > 0 ? (
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
              <Link to={`/recipe/${recipe.id}`}>Y ALLER</Link>
            </div>
          ))}
        </div>
      ) : (
        <div>Sorry, we haven't found any recipe matching your criterias.</div>
      )} */}
    </>
  );
};

export default RecipeCard;
