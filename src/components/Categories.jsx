import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Catagory from "./Catagory";
import Spinner from "./Spinner/Spinner"; // فرض می‌کنیم کامپوننت Spinner را دارید

function Categories({ selectedCategory, setSelectedCategory }) {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true); // اضافه کردن وضعیت بارگذاری
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://introduction-of-ai-server.onrender.com/api/v1/Category"
        );
        const data = await response.json();
        setCategoryData(data.data.categories); // فرض می‌کنیم سرور داده‌ها را در یک فیلد categories ارسال می‌کند
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get("category");
    if (categoryFromUrl && categoryFromUrl !== selectedCategory) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [selectedCategory, location.search, setSelectedCategory]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/SingleCategorise/${categoryId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
        همه دسته‌بندی‌های ابزارهای هوش مصنوعی
      </h2>
      {loading ? (
        <Spinner /> // نمایش اسپینر هنگام بارگذاری
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center">
          {categoryData.map((category) => (
            <Catagory
              key={category.id}
              name={category.name}
              logo={category.logo}
              isActive={selectedCategory === category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="p-4 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out"
            />
          ))}
        </div>
      )}
    </div>
  );
}

Categories.propTypes = {
  selectedCategory: PropTypes.string,
  setSelectedCategory: PropTypes.func.isRequired,
};

export default Categories;
