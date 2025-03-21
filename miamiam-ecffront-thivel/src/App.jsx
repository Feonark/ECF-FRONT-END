import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Home from "./pages/Home/Home";
import Recipe from "./pages/Recipe/Recipe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/recipe/:id" element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
