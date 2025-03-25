import React, { useState } from "react";
import "./FormModal.css";
import brokenImage from "../../assets/images/broken-image.svg";

const FormModal = ({
  originCategories,
  typeCategories,
  difficulties,
  toggleModal,
  onUpdateRecipes,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rawImage, setRawImage] = useState(null);
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
  const [errors, setErrors] = useState([]);

  // █ █ ▄▀▄ █   █ █▀▄ ▄▀▄ ▀█▀ ██▀ █▀ █ ██▀ █   █▀▄
  // ▀▄▀ █▀█ █▄▄ █ █▄▀ █▀█  █  █▄▄ █▀ █ █▄▄ █▄▄ █▄▀

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "title":
        if (value.length < 3) return "Must be at least 3 characters.";
        if (!value) return "This field is required.";
        break;

      case "description":
        if (!value) return "This field is required.";
        if (value.length < 16) return "Must be at least 16 characters.";
        break;

      case "image":
        if (!rawImage) return "Please upload an image.";
        if (
          !rawImage.type ||
          !["image/jpg", "image/jpeg", "image/png", "image/bmp"].includes(
            rawImage.type
          )
        ) {
          return "Supported formats are JPG, PNG, and BMP.";
        }
        break;

      case "originCategory":
        if (!value) return "Please select a valid category.";
        break;

      case "typeCategory":
        if (!value) return "Please select a valid category.";
        break;

      case "totalTime":
        const totalTimeValue = parseFloat(value);
        if (totalTimeValue >= 1441) return "This number is too high.";
        if (isNaN(totalTimeValue)) return "This value must be a number.";
        if (totalTimeValue <= 0) return "This number can't be zero or below.";
        break;

      case "prepTime":
        const prepTimeValue = parseFloat(value);
        if (prepTimeValue >= 1441) return "This number is too high.";
        if (isNaN(prepTimeValue)) return "This value must be a number.";
        if (prepTimeValue <= 0) return "This number can't be zero or below.";
        break;

      case "difficulty":
        if (!value) return "Please select a valid category.";
        break;

      case "servings":
        const servingsValue = parseFloat(value);
        if (servingsValue >= 1441) return "This number is too high.";
        if (isNaN(servingsValue)) return "This value must be a number.";
        if (servingsValue <= 0) return "This number can't be zero or below.";
        break;

      case "ingredientGroups": // Validation des ingrédients
        const ingredientErrors = value.map((group, index) => {
          if (!group.title) return `Ingredient ${index + 1} is missing a name.`;
          if (!group.amount)
            return `Ingredient ${index + 1} is missing a quantity.`;
          return null;
        });
        return ingredientErrors.filter((error) => error !== null).join(" ");

      case "stepGroups":
        const stepErrors = value.map((group, index) => {
          if (!group.title) return `Step ${index + 1} is missing a name.`;
          if (!group.description)
            return `Step ${index + 1} is missing a description.`;
          return null;
        });
        return stepErrors.filter((error) => error !== null).join(" ");

      default:
        return null;
    }
    return null;
  };

  // █ █ ▄▀▄ █   █ █▀▄ ▄▀▄ ▀█▀ ██▀ ▄▀▄ █   █   █▀ █ ██▀ █   █▀▄ ▄▀▀
  // ▀▄▀ █▀█ █▄▄ █ █▄▀ █▀█  █  █▄▄ █▀█ █▄▄ █▄▄ █▀ █ █▄▄ █▄▄ █▄▀ ▄█▀

  const validateAllFields = () => {
    const newErrors = {
      title: validateField("title", title),
      description: validateField("description", description),
      image: validateField("image", image),
      originCategory: validateField("originCategory", originCategory),
      typeCategory: validateField("typeCategory", typeCategory),
      totalTime: validateField("totalTime", totalTime),
      prepTime: validateField("prepTime", prepTime),
      difficulty: validateField("difficulty", difficulty),
      servings: validateField("servings", servings),
      ingredientGroups: validateField("ingredientGroups", ingredientGroups),
      stepGroups: validateField("stepGroups", stepGroups),
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  // █▄█ ▄▀▄ █▄ █ █▀▄ █   ██▀ ▄▀▀ █▄█ ▄▀▄ █▄ █ ▄▀  ██▀
  // █ █ █▀█ █ ▀█ █▄▀ █▄▄ █▄▄ ▀▄▄ █ █ █▀█ █ ▀█ ▀▄█ █▄▄

  const handleChange = (fieldName, value, index = null) => {
    if (fieldName === "ingredientTitle" || fieldName === "ingredientAmount") {
      const updatedGroups = [...ingredientGroups];

      if (fieldName === "ingredientTitle") {
        updatedGroups[index].title = value;
      } else if (fieldName === "ingredientAmount") {
        updatedGroups[index].amount = value;
      }

      setIngredientGroups(updatedGroups);

      setErrors((prevErrors) => ({
        ...prevErrors,
        ingredientGroups: validateField("ingredientGroups", updatedGroups),
      }));
      return;
    }

    if (fieldName === "stepTitle" || fieldName === "stepDescription") {
      const updatedGroups = [...stepGroups];

      if (fieldName === "stepTitle") {
        updatedGroups[index].title = value;
      } else if (fieldName === "stepDescription") {
        updatedGroups[index].description = value;
      }

      setStepGroups(updatedGroups);

      setErrors((prevErrors) => ({
        ...prevErrors,
        stepGroups: validateField("stepGroups", updatedGroups),
      }));
      return;
    }

    if (fieldName === "title") setTitle(value);
    if (fieldName === "description") setDescription(value);
    if (fieldName === "image") setImage(value);
    if (fieldName === "originCategory") setOriginCategory(value);
    if (fieldName === "typeCategory") setTypeCategory(value);
    if (fieldName === "totalTime") setTotalTime(value);
    if (fieldName === "prepTime") setPrepTime(value);
    if (fieldName === "difficulty") setDifficulty(value);
    if (fieldName === "servings") setServings(value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validateField(fieldName, value),
    }));
  };

  // █▄█ ▄▀▄ █▄ █ █▀▄ █   ██▀ ▄▀▀ █ █ ██▄ █▄ ▄█ █ ▀█▀
  // █ █ █▀█ █ ▀█ █▄▀ █▄▄ █▄▄ ▄█▀ ▀▄█ █▄█ █ ▀ █ █  █

  const handleSubmit = () => {
    if (!validateAllFields()) {
      alert("The form must be complete.");
      return;
    }

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
    toggleModal();
    onUpdateRecipes();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRawImage(file);
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
        }}
      >
        {/* GENERAL INFORMATIONS */}
        <div className="form-content__category">
          <h3>General informations</h3>
          <div className="form-content__group">
            {/* Upload image */}
            <label htmlFor="upload__input" className="form__label upload-input">
              <img src={brokenImage} alt="" />
              <div>
                <span>Click here</span> to upload your file
              </div>
              <input
                type="file"
                id="upload__input"
                accept="image/*"
                className={errors.image ? "input-error" : ""}
                onChange={(e) => {
                  handleImageUpload(e);
                  handleChange("image", e.target.files[0]);
                }}
              />
              <span>Supported formats: JPG, PNG, BMP</span>
              {errors.image && <span className="error">{errors.image}</span>}
            </label>

            {/* Recipe title */}
            <label htmlFor="recipe__title" className="form__label">
              Recipe title
              <input
                type="text"
                id="recipe__title"
                placeholder="eg: Berries & Oath Smoothie"
                className={errors.title ? "input-error" : ""}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </label>

            {/* Recipe description */}
            <label htmlFor="recipe__description" className="form__label">
              Recipe description
              <input
                type="textarea"
                id="recipe__description"
                placeholder="eg: Savor the perfect mix of flavors with this berries & oat smoothie, a guaranteed hit for tonight’s dinner with family or friends!"
                className={errors.description ? "input-error" : ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </label>
            <div className="form__input-group">
              {/* Country category */}
              <label htmlFor="recipe__country-category" className="form__label">
                Country category
                <select
                  id="recipe__country-category"
                  className={errors.originCategory ? "input-error" : ""}
                  onChange={(e) =>
                    handleChange("originCategory", e.target.value)
                  }
                >
                  <option value="">
                    -- Please select a country category --
                  </option>
                  {originCategories &&
                    originCategories.map((originCat) => (
                      <option key={originCat.id} value={originCat.id}>
                        {originCat.name}
                      </option>
                    ))}
                </select>
                {errors.originCategory && (
                  <span className="error">{errors.originCategory}</span>
                )}
              </label>

              {/* Recipe category */}
              <label htmlFor="recipe__recipe-category" className="form__label">
                Recipe category
                <select
                  id="recipe__recipe-category"
                  className={errors.typeCategory ? "input-error" : ""}
                  onChange={(e) => {
                    handleChange("typeCategory", e.target.value);
                  }}
                >
                  <option value="">
                    -- Please select a recipe category --
                  </option>
                  {typeCategories &&
                    typeCategories.map((typeCat) => (
                      <option key={typeCat.id} value={typeCat.id}>
                        {typeCat.name}
                      </option>
                    ))}
                </select>
                {errors.typeCategory && (
                  <span className="error">{errors.typeCategory}</span>
                )}
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
                {/* Ingredient name */}
                <label
                  htmlFor={`ingredient__title_${index}`}
                  className="form__label"
                >
                  Ingredient name
                  <input
                    type="text"
                    placeholder="eg: Berries"
                    value={group.title}
                    className={errors.ingredientGroups ? "input-error" : ""}
                    onChange={(e) =>
                      handleChange("ingredientTitle", e.target.value, index)
                    }
                  />
                </label>
                {/* Ingredient quantity */}
                <label
                  htmlFor={`ingredient__amount_${index}`}
                  className="form__label"
                >
                  Quantity
                  <input
                    type="text"
                    placeholder="eg: 5 tsp"
                    value={group.amount}
                    className={errors.ingredientGroups ? "input-error" : ""}
                    onChange={(e) =>
                      handleChange("ingredientAmount", e.target.value, index)
                    }
                  />
                </label>
                {index !== 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      removeIngredient(index);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {errors.ingredientGroups && (
              <span className="error">{errors.ingredientGroups}</span>
            )}
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
                    className={errors.stepGroups ? "input-error" : ""}
                    onChange={(e) => {
                      handleChange("stepTitle", e.target.value, index);
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
                    className={errors.stepGroups ? "input-error" : ""}
                    onChange={(e) => {
                      handleChange("stepDescription", e.target.value, index);
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
            {errors.stepGroups && (
              <span className="error">{errors.stepGroups}</span>
            )}
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
              {/* Total time */}
              <label htmlFor="recipe__total-time" className="form__label">
                Total time (in min)
                <input
                  type="number"
                  id="recipe__total-time"
                  placeholder="eg: 50"
                  className={errors.totalTime ? "input-error" : ""}
                  onChange={(e) => handleChange("totalTime", e.target.value)}
                />
                {errors.totalTime && (
                  <span className="error">{errors.totalTime}</span>
                )}
              </label>

              {/* Prep time */}
              <label htmlFor="recipe__prep-time" className="form__label">
                Preparation time (in min)
                <input
                  type="number"
                  id="recipe__prep-time"
                  placeholder="eg: 25"
                  className={errors.prepTime ? "input-error" : ""}
                  onChange={(e) => handleChange("prepTime", e.target.value)}
                />
                {errors.prepTime && (
                  <span className="error">{errors.prepTime}</span>
                )}
              </label>
            </div>
            <div className="form__input-group">
              {/* Difficulty */}
              <label htmlFor="recipe__difficulty" className="form__label">
                Difficulty
                <select
                  id="recipe__difficulty"
                  className={errors.difficulty ? "input-error" : ""}
                  onChange={(e) => handleChange("difficulty", e.target.value)}
                >
                  <option value="">-- Please select a difficulty --</option>
                  {difficulties &&
                    difficulties.map((difficulty) => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.name}
                      </option>
                    ))}
                </select>
                {errors.difficulty && (
                  <span className="error">{errors.difficulty}</span>
                )}
              </label>

              {/* Servings */}
              <label htmlFor="recipe__servings" className="form__label">
                Number of servings
                <input
                  type="number"
                  id="recipe__servings"
                  placeholder="eg: 5"
                  className={errors.servings ? "input-error" : ""}
                  onChange={(e) => handleChange("servings", e.target.value)}
                />
                {errors.servings && (
                  <span className="error">{errors.servings}</span>
                )}
              </label>
            </div>
          </div>
        </div>
      </form>
      <div className="modal-footer">
        <button
          type="button"
          onClick={() => toggleModal()}
          className="tertiary-action-button"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="action-button"
          onClick={() => handleSubmit()}
        >
          Create recipe
        </button>
      </div>
    </div>
  );
};

export default FormModal;
