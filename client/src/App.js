import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import Update from "./pages/Update";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Countries />} />
          <Route path="/:id" element={<Country />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
