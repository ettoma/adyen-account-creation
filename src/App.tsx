import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import "./App.css";
import AssignStore from "./pages/AssignStore";
import Home from "./pages/Home";
import NewMerchant from "./pages/NewMerchant";
import NewStore from "./pages/NewStore";

function App() {
  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new_merchant" element={<NewMerchant />} />
          <Route path="/new_store" element={<NewStore />} />
          <Route path="/assign_store" element={<AssignStore />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
