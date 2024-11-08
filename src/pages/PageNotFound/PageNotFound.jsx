import { Link } from "react-router-dom";
import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";

function PageNotFound() {
  return (
    <>
      <NavLink />
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
          <h1 className="text-red-500 font-bold lg:text-[15rem] md:text-[10rem] text-[4rem] whitespace-nowrap drop-shadow-lg">
            404
          </h1>
          <p className="text-gray-300 lg:text-3xl md:text-2xl text-lg mt-4">
            Oops! The page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="mt-[5rem] px-8 py-4 text-2xl md:w-auto border-2 border-red-600 text-red-600 bg-transparent rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            Back to Home Page
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PageNotFound;
