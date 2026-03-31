import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Toaster } from "react-hot-toast";

// importing pages
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import ComingSoon from "./pages/ComingSoon.jsx";
import Test from "./pages/Test.jsx";
import ProfileSettings from "./pages/Settings.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgba(15, 23, 42, 0.9)",
            color: "#fff",
            padding: "14px 18px",
            borderRadius: "18px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 14px 40px rgba(0, 0, 0, 0.3)",
          },
        }}
      />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/comingsoon" element={<ComingSoon />} />
        <Route path="/test" element={<Test />} />
        <Route path="/settings" element={<ProfileSettings />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
