import { LogIn, LogOut, ShoppingCart, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, isAdmin } = useAuthStore();
  const cart = [1];
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-20 bg-black/80">
      <nav className=" flex items-center justify-between px-6 py-3">
        <h1
          className="text-blue-600  cursor-pointer font-bold text-3xl"
          onClick={() => navigate("/")}
        >
          SellOut
        </h1>

        <div className="links flex items-center gap-5">
          <Link to="/" className="text-gray-400 hover:text-blue-600 ">
            Home
          </Link>
          {cart && cart.length > 0 && (
            <Link className="relative flex items-center gap-1  text-gray-400 hover:text-blue-600">
              <span className="bg-blue-500 text-white w-4 h-4 flex items-center justify-center rounded-full absolute -top-2.5 -left-2 text-xs">
                {cart.length}
              </span>
              <ShoppingCart size={20} />
              Cart
            </Link>
          )}

          {user && isAdmin && (
            <Link
              to="/admin-dashboard"
              className="bg-blue-600 text-white px-4 py-0.5 rounded font-semibold text-sm"
            >
              Admin
            </Link>
          )}

          {user && (
            <button
              className="bg-gray-600 text-gray-100 outline-none border-none rounded cursor-pointer flex items-center gap-2 px-2 py-1"
              onClick={() => logOut()}
            >
              <LogOut size={20} />
              Logout
            </button>
          )}

          {!user && (
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-600 text-gray-100 outline-none border-none rounded cursor-pointer flex items-center gap-2 px-3 py-1"
                onClick={() => navigate("/login")}
              >
                <LogIn size={20} />
                Login
              </button>

              <button
                className="bg-gray-600 text-gray-100 outline-none border-none rounded cursor-pointer flex items-center gap-2 px-2 py-1"
                onClick={() => navigate("/signup")}
              >
                <UserPlus size={20} />
                Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
