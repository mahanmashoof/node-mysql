import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Countries from "./pages/Countries";
import Country from "./pages/Country";
import Update from "./pages/Update";
import Login from "./pages/Login";
import AuthWarning from "./pages/AuthWarning";
import { useVerifyToken } from "./CustomHooks";
import { Suspense } from "react";

function App() {
  const { auth } = useVerifyToken();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth-warning" element={<AuthWarning />} />
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {auth ? <Countries /> : <AuthWarning />}
              </Suspense>
            }
          />
          <Route path="/:id" element={auth ? <Country /> : <AuthWarning />} />
          <Route path="/add" element={auth ? <Add /> : <AuthWarning />} />
          {auth && (
            <Route
              path="/update/:id"
              element={auth ? <Update /> : <AuthWarning />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
