import { useState } from "react";
import Categories from "../../components/Categories";
import Footer from "../../components/Footer/Footer";
import NavLink from "../../components/NavLink/NavLink";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Jewelery");

  return (
    <div className="bg-gradient-to-b from-orange-100 to-orange-50 min-h-screen flex flex-col justify-between">
      {/* Navigation */}
      <NavLink />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center mx-auto max-w-7xl p-4 lg:p-8">
        <div className="w-full bg-white shadow-lg rounded-lg p-6 lg:p-10 mb-8 border border-gray-200">
          <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-6">
            Explore AI Categories
          </h1>
          <Categories
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
