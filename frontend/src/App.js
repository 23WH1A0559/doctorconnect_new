import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";

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

        <Route path="/book/:doctorId" element={<BookAppointment />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;