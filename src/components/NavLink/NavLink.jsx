import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaPlusCircle } from "react-icons/fa";
//FaUser,
import { useState } from "react";
import style from "./NavLink.module.css";
import useAuth from "../../hook/useAuth";
import Spinner from "../Spinner/Spinner.jsx";

function NavLink() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLogin, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://introduction-of-ai-server.onrender.com/api/v1/auth/logout",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Logout failed");
      }
      logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <nav
        className={`${style.navbar} flex items-center justify-between p-4 w-full`}
      >
        <Link to="/">
          <div className="bg-white rounded-lg p-[1rem]">
            <h1
              className="md:text-4xl font-extrabold text-2xl bg-gradient-to-r from-slate-600 via-black to-blue-600 bg-clip-text text-transparent hover:shadow-slate-400/50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, slate 25%, white 40%, blue 55%, black 100%)",
              }}
            >
              LoneWalkeR.AI
            </h1>
          </div>
        </Link>

        <div className="hidden md:flex gap-10">
          <Link className={style.links} to="/">
            All Categories
          </Link>
        </div>

        <div className="flex items-center gap-8">
          {isLogin ? (
            <>
              <Link
                to="/addAi"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-md shadow-lg hover:from-green-600 hover:to-teal-600 transition duration-300 transform hover:scale-105"
              >
                <FaPlusCircle className="text-2xl" />
                Add New AI
              </Link>
              {/* <Link
                to="/profile"
                className="text-3xl md:text-4xl cursor-pointer hover:text-red-500 transition hidden md:block"
              >
                <FaUser />
              </Link> */}

              <button
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-md shadow-lg hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 md:block hidden"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link className={`md:block hidden ${style.links}`} to="/signup">
                Sign Up
              </Link>
              <Link className={`md:block hidden ${style.links}`} to="/login">
                Login
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            {isOpen ? (
              <FaTimes className="text-3xl" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          isOpen ? style.overlayOpen : style.overlayClose
        }`}
      >
        <button
          className="absolute top-4 right-4 text-white text-4xl"
          onClick={toggleMenu}
        >
          <FaTimes />
        </button>
        <ul className="flex flex-col items-center gap-6">
          <li>
            <Link className={style.linksMobile} to="/" onClick={toggleMenu}>
              All Categories
            </Link>
          </li>

          {isLogin ? (
            <>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/profile"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
              </li>

              <li>
                <button
                  className={style.logoutButton}
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/signup"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  className={style.linksMobile}
                  to="/login"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="mb-16"></div>
    </>
  );
}

export default NavLink;
