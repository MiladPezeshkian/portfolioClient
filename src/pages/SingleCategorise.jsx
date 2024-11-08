import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavLink from "../components/NavLink/NavLink";
import Footer from "../components/Footer/Footer";
import Spinner from "../components/Spinner/Spinner";

function SingleCategorise() {
  const { id } = useParams();
  const [aiTools, setAiTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAiTools = async () => {
      try {
        const response = await fetch(
          `https://aiwebpage-server.onrender.com/api/v1/ai/category/${id}`
        );
        if (!response.ok) {
          throw new Error("خطا در دریافت داده‌های ابزارهای هوش مصنوعی");
        }
        const data = await response.json();
        setAiTools(data.data.ais);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAiTools();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <Spinner />
      </div>
    );
  if (error)
    return <p className="text-red-500 text-center mt-10">خطا: {error}</p>;

  return (
    <>
      <NavLink />
      <div className="flex flex-col min-h-screen" style={{ direction: "rtl" }}>
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            {id}
          </h1>

          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aiTools.map((tool) => (
              <div
                key={tool.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border border-gray-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <img
                  src={tool.image}
                  alt={`${tool.name} logo`}
                  className="h-24 w-24 object-contain mx-auto mb-4"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                  {tool.name}
                </h2>
                <p className="text-gray-700 text-justify leading-relaxed mb-4">
                  {tool.description}
                </p>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 px-6 py-3 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  مشاهده وب‌سایت
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SingleCategorise;
