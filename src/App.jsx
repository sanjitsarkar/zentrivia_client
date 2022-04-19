import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import "./App.css";
import SignupPage from "./pages/AuthPage/SignupPage";
import LoginPage from "./pages/AuthPage/Login";
import Toast from "./components/Toast";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
