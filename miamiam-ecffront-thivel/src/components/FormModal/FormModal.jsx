import React, { useState } from "react";
import "./FormModal.css";
import brokenImage from "../../assets/images/broken-image.svg";

const FormModal = ({
  originCategories,
  typeCategories,
  difficulties,
  setIsModalOpen,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [originCategory, setOriginCategory] = useState("");
  const [typeCategory, setTypeCategory] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [difficulty, setDifficulty] = useState("");
  const [servings, setServings] = useState(0);

  const [ingredientGroups, setIngredientGroups] = useState([
    { title: "", amount: "" },
  ]);
  const [stepGroups, setStepGroups] = useState([
    { title: "", description: "" },
  ]);

  const handleSubmit = () => {
    const newRecipe = {
      id: Date.now(),
      title,
      description,
      image,
      originCategory: originCategories.find(
        (cat) => cat.id === parseInt(originCategory)
      ),
      typeCategory: typeCategories.find(
        (cat) => cat.id === parseInt(typeCategory)
      ),
      prepTime,
      totalTime,
      difficulty: difficulties.find((diff) => diff.id === parseInt(difficulty)),
      servings,
      ingredients: ingredientGroups,
      steps: stepGroups,
    };

    const storedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    storedRecipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(storedRecipes));

    alert("Recipe added successfully!");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const addIngredient = () => {
    setIngredientGroups([
      ...ingredientGroups,
      {
        title: "",
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
        title: "",
        quantity: "",
      },
    ]);
  };

  const removeStep = (indexToRemove) => {
    setStepGroups(stepGroups.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <div className="modal-header">
        <h2>Add new recipe</h2>
      </div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* GENERAL INFORMATIONS */}
        <div className="form-content__category">
          <h3>General informations</h3>
          <div className="form-content__group">
            <label htmlFor="upload__input" className="form__label upload-input">
              <img src={brokenImage} alt="" />
              <div>
                <span>Click here</span> to upload your file
              </div>
              <input
                type="file"
                id="upload__input"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <span>Supported formats: JPG, PNG, BMP</span>
            </label>
            <label htmlFor="recipe__title" className="form__label">
              Recipe title
              <input
                type="text"
                id="recipe__title"
                placeholder="eg: Berries & Oath Smoothie"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="recipe__description" className="form__label">
              Recipe description
              <input
                type="textarea"
                id="recipe__description"
                placeholder="eg: Savor the perfect mix of flavors with this berries & oat smoothie, a guaranteed hit for tonight’s dinner with family or friends!"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className="form__input-group">
              <label htmlFor="recipe__country-category" className="form__label">
                Country category
                <select
                  id="recipe__country-category"
                  onChange={(e) => setOriginCategory(e.target.value)}
                >
                  <option value={null}>
                    -- Please select a country category --
                  </option>
                  {originCategories &&
                    originCategories.map((originCat) => (
                      <option key={originCat.id} value={originCat.id}>
                        {originCat.name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="recipe__recipe-category" className="form__label">
                Recipe category
                <select
                  id="recipe__recipe-category"
                  onChange={(e) => setTypeCategory(e.target.value)}
                >
                  <option value={null}>
                    -- Please select a recipe category --
                  </option>
                  {typeCategories &&
                    typeCategories.map((typeCat) => (
                      <option key={typeCat.id} value={typeCat.id}>
                        {typeCat.name}
                      </option>
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
              <div className="item-add-group" key={index}>
                <label
                  htmlFor={`ingredient__title_${index}`}
                  className="form__label"
                >
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
                <label
                  htmlFor={`ingredient__amount_${index}`}
                  className="form__label"
                >
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
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="remove-button"
                  >
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
              className="secondary-action-button"
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
              <div className="item-add-group" key={index}>
                <label htmlFor={`step__title_${index}`} className="form__label">
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
                <label
                  htmlFor={`step__description_${index}`}
                  className="form__label"
                >
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
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="remove-button"
                  >
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
              className="secondary-action-button"
            >
              Add step
            </button>
          </div>
        </div>

        {/* ADDITIONAL INFORMATION */}
        <div className="form-content__category">
          <h3>Additional information</h3>
          <div className="form-content__group">
            <div className="form__input-group">
              <label htmlFor="recipe__total-time" className="form__label">
                Total time (in min)
                <input
                  type="number"
                  id="recipe__total-time"
                  onChange={(e) => setTotalTime(Number(e.target.value))}
                />
              </label>
              <label htmlFor="recipe__prep-time" className="form__label">
                Preparation time (in min)
                <input
                  type="number"
                  id="recipe__prep-time"
                  onChange={(e) => setPrepTime(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="form__input-group">
              <label htmlFor="recipe__difficulty" className="form__label">
                Difficulty
                <select
                  id="recipe__difficulty"
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value={null}>-- Please select a difficulty --</option>
                  {difficulties &&
                    difficulties.map((difficulty) => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="recipe__servings" className="form__label">
                Number of servings
                <input
                  type="number"
                  id="recipe__servings"
                  onChange={(e) => setServings(Number(e.target.value))}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="modal-footer">
        <button
          type="button"
          onClick={() => setIsModalOpen(false)}
          className="tertiary-action-button"
        >
          Cancel
        </button>
        <button type="submit" className="action-button">
          Create recipe
        </button>
      </div>
    </div>
  );
};

export default FormModal;
