import React, { useState, useEffect } from "react";
import {
  fetchRecipes,
  fetchOriginCategories,
  fetchTypeCategories,
} from "../../utils/api";
import "./Home.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [originCategories, setOriginCategories] = useState([]);
  const [typeCategories, setTypeCategories] = useState([]);
  const [selectedOriginCat, setSelectedOriginCat] = useState(null);
  const [selectedTypeCat, setSelectedTypeCat] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const getRecipes = async () => {
    try {
      const data = await fetchRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
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

  const applyFilters = () => {
    let filteredData = recipes;

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
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedOriginCat, selectedTypeCat, searchValue, recipes]);

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

      <button>Show only fav</button>

      {filteredRecipes.length > 0 ? (
        <div>
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id}>
              <div>{recipe.title}</div>
              <div>{recipe.id}</div>
              <button>Add to fav</button>
            </div>
          ))}
        </div>
      ) : (
        <div>Sorry, we haven't found any recipe matching your criterias.</div>
      )}
    </div>
  );
}

export default App;
