import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page → Login */}
        <Route path="/" element={<Login />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />
        {/* Doctors page */}
        <Route path="/doctors" element={<Doctors />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;