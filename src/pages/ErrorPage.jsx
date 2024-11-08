import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavLink from "../components/NavLink/NavLink";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function ErrorPage({ BackToPage, Message }) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFadeIn(true);
    }, 200); // اضافه کردن تاخیر برای افکت fade-in

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <NavLink />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col items-center justify-center flex-grow px-4 text-center">
          <h1
            className={`text-red-500 font-extrabold lg:text-[10rem] md:text-[8rem] text-[4rem] whitespace-nowrap transition-opacity duration-700 ${
              fadeIn ? "opacity-100" : "opacity-0"
            } drop-shadow-lg`}
          >
            {Message}
          </h1>
          <p className="text-gray-400 lg:text-2xl md:text-xl text-lg mt-4">
            We could not find the page you were looking for.
          </p>
          <Link
            to={`/${BackToPage}`}
            className="mt-[5rem] px-10 py-4 text-2xl md:w-auto border-2 border-red-600 text-red-600 bg-transparent rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 transform"
          >
            Back to {BackToPage} Page
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

ErrorPage.propTypes = {
  Message: PropTypes.string.isRequired,
  BackToPage: PropTypes.string.isRequired,
};

export default ErrorPage;
