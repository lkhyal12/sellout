import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import AdminDahboard from "./pages/AdminDahboard";

const App = () => {
  const { user, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // console.log("object");
  }, [checkAuth]);
  if (isCheckingAuth)
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <LoaderCircle className="text-white size-[10vw] animate-spin" />
      </div>
    );
  return (
    <>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<AdminDahboard />} />
      </Routes>
    </>
  );
};

export default App;
