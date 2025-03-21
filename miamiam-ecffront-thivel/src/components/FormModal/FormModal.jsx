import React, { useState } from "react";
import "./FormModal.css";

const FormModal = ({ originCategories, typeCategories, difficulties }) => {
  const [ingredientGroups, setIngredientGroups] = useState([
    { title: "", amount: "" },
  ]);

  const [stepGroups, setStepGroups] = useState([
    { title: "", description: "" },
  ]);

  const addIngredient = () => {
    setIngredientGroups([
      ...ingredientGroups,
      {
        name: "",
        quantity: "",
      },
    ]);
  };

  const removeIngredient = (indexToRemove) => {
    setIngredientGroups(
      ingredientGroups.filter((_, index) => index !== indexToRemove)
    );
  };

  const addStep = () => {
    setStepGroups([
      ...stepGroups,
      {
        name: "",
        quantity: "",
      },
    ]);
  };

  const removeStep = (indexToRemove) => {
    setStepGroups(stepGroups.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div>
        <h1>Add new recipe</h1>
      </div>
      <form method="post" className="form">
        {/* GENERAL INFORMATIONS */}
        <div className="form-content__category">
          <h3>General informations</h3>
          <div className="form-content__group">
            <label htmlFor="upload__input" className="form__label">
              <img src="" alt="" />
              <span>Click here</span> to upload your file
              <input type="file" id="upload__input" accept="image/*" />
              <span>Supported formats: JPG, PNG, BMP</span>
            </label>
            <label htmlFor="recipe__title" className="form__label">
              Recipe title
              <input
                type="text"
                id="recipe__title"
                placeholder="eg: Berries & Oath Smoothie"
              />
            </label>
            <label htmlFor="recipe__description" className="form__label">
              Recipe description
              <input
                type="textarea"
                id="recipe__description"
                placeholder="eg: Savor the perfect mix of flavors with this berries & oat smoothie, a guaranteed hit for tonight’s dinner with family or friends!"
              />
            </label>
            <div>
              <label htmlFor="recipe__country-category">
                Country category
                <select id="recipe__country-category">
                  <option value={null}>
                    -- Please select a country category --
                  </option>
                  {originCategories &&
                    originCategories.map((originCat) => (
                      <option value={originCat.id}>{originCat.name}</option>
                    ))}
                </select>
              </label>
              <label htmlFor="recipe__recipe-category">
                Recipe category
                <select id="recipe__recipe-category">
                  <option value={null}>
                    -- Please select a recipe category --
                  </option>
                  {typeCategories &&
                    typeCategories.map((typeCat) => (
                      <option value={typeCat.id}>{typeCat.name}</option>
                    ))}
                </select>
              </label>
            </div>
          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="form-content__category">
          <h3>Ingredients</h3>
          <div className="form-content__group">
            {ingredientGroups.map((group, index) => (
              <div className="form-content__input-group" key={index}>
                <label htmlFor={`ingredient__title_${index}`}>
                  Ingredient name
                  <input
                    type="text"
                    placeholder="eg: Berries"
                    value={group.title}
                    onChange={(e) => {
                      const updatedGroups = [...ingredientGroups];
                      updatedGroups[index].title = e.target.value;
                      setIngredientGroups(updatedGroups);
                    }}
                  />
                </label>
                <label htmlFor={`ingredient__amount_${index}`}>
                  Quantity
                  <input
                    type="text"
                    placeholder="eg: 5 tsp"
                    value={group.amount}
                    onChange={(e) => {
                      const updatedGroups = [...ingredientGroups];
                      updatedGroups[index].amount = e.target.value;
                      setIngredientGroups(updatedGroups);
                    }}
                  />
                </label>
                {index !== 0 && (
                  <button type="button" onClick={() => removeIngredient(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                addIngredient();
              }}
            >
              Add ingredient
            </button>
          </div>
        </div>

        {/* STEPS */}
        <div className="form-content__category">
          <h3>Steps</h3>
          <div className="form-content__group">
            {stepGroups.map((group, index) => (
              <div className="form-content__input-group" key={index}>
                <label htmlFor={`step__title_${index}`}>
                  Step name
                  <input
                    type="text"
                    placeholder="Prepare batter"
                    value={group.title}
                    onChange={(e) => {
                      const updatedGroups = [...stepGroups];
                      updatedGroups[index].title = e.target.value;
                      setStepGroups(updatedGroups);
                    }}
                  />
                </label>
                <label htmlFor={`step__description_${index}`}>
                  Description
                  <input
                    type="textarea"
                    placeholder="Mix teff flour, water, and salt, then let ferment overnight."
                    value={group.description}
                    onChange={(e) => {
                      const updatedGroups = [...stepGroups];
                      updatedGroups[index].description = e.target.value;
                      setStepGroups(updatedGroups);
                    }}
                  />
                </label>
                {index !== 0 && (
                  <button type="button" onClick={() => removeStep(index)}>
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                addStep();
              }}
            >
              Add step
            </button>
          </div>
        </div>

        {/* ADDITIONAL INFORMATION */}
        <div className="form-content__category">
          <h3>Additional information</h3>
          <div className="form-content__group">
            <div>
              <label htmlFor="recipe__total-time">
                Total time (in min)
                <input type="number" id="recipe__total-time" />
              </label>
              <label htmlFor="recipe__prep-time">
                Preparation time (in min)
                <input type="number" id="recipe__prep-time" />
              </label>
            </div>
            <div>
              <label htmlFor="recipe__difficulty">
                Difficulty
                <select id="recipe__difficulty">
                  <option value={null}>-- Please select a difficulty --</option>
                  {difficulties &&
                    difficulties.map((difficulty) => (
                      <option value={difficulty.id}>{difficulty.name}</option>
                    ))}
                </select>
              </label>
              <label htmlFor="recipe__servings">
                Number of servings
                <input type="number" id="recipe__servings" />
              </label>
            </div>
          </div>
        </div>
        <div>
          <button>Cancel</button>
          <button type="submit">Create recipe</button>
        </div>
      </form>
    </div>
  );
};

export default FormModal;
