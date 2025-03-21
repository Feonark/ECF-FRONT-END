import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchRecipes } from "../../utils/api";
import "./Recipe.css";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    getRecipe();
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

  return (
    <div>
      <img src={recipe.image} alt="" />
      <h1>{recipe.title}</h1>
      <div>
        {recipe.steps &&
          recipe.steps.map((step, index) => (
            <div key={index}>
              {step.title} {step.description}
            </div>
          ))}
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              {ingredient.title} {ingredient.amount}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Recipe;
