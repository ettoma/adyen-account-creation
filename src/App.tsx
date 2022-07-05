import { Navigate, Route, Router, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <nav>Home</nav>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" children={Home()} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
