import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { user, loading, signUp } = useAuthStore();

  const navigate = useNavigate();
  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.name?.trim() || !formData.email?.trim() || !formData.password)
      return toast.error("All fields are required", { id: "signup page" });
    const { success } = await signUp(
      formData.name,
      formData.email,
      formData.password,
    );
    if (success) return navigate("/");
  }

  if (user) return <Navigate to="/" />;
  return (
    <div className="min-h-screen w-full py-16 flex items-center justify-center">
      <div className="bg-black/80 py-10 px-5 rounded-lg w-140 max-w-3xl">
        <h2 className="text-2xl font-semibold text-center md:text-3xl lg:text-4xl text-blue-600 mb-6">
          Create an account
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            value={formData.name}
            name="name"
            placeholder="Name..."
            onChange={handleChange}
            className="w-full bg-white px-2 py-1 text-lg border border-gray-500 focus:ring-2 focus:ring-blue-700 rounded outline-none"
          />
          <input
            type="email"
            value={formData.email}
            name="email"
            placeholder="Email..."
            onChange={handleChange}
            className="w-full bg-white px-2 py-1 text-lg border border-gray-500 focus:ring-2 focus:ring-blue-700 rounded outline-none"
          />
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Password..."
            onChange={handleChange}
            className="w-full bg-white px-2 py-1 text-lg border border-gray-500 focus:ring-2 focus:ring-blue-700 rounded outline-none"
          />

          <button
            className="w-full py-2 flex items-center justify-center text-lg font-bold text-white bg-blue-600 cursor-pointer rounded disabled:opacity-60 disabled:pointer-events-none"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin text-gray-300 size-6" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
        <div className="text-white mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-700 font-semibold">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
