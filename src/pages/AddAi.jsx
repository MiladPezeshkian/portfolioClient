import { useEffect, useState } from "react";
import Spinner from "../components/Spinner/Spinner";
import Footer from "../components/Footer/Footer";
import NavLink from "../components/NavLink/NavLink";

function AddAi() {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    description: "",
    category: "",
    imageLink: "",
    image: null,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://aiwebpage-server.onrender.com/api/v1/category"
        );
        const data = await response.json();
        setCategoryData(data.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: file,
      imageLink: "",
    }));
  };

  const handleImageLinkChange = (e) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageLink: value,
      image: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    if (formData.imageLink) {
      formDataToSend.append("imageLink", formData.imageLink);
    } else if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch(
        "https://aiwebpage-server.onrender.com/api/v1/ai",
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: " هوش مصنوعی با موفقیت اضافه شد! ممنون از همکاری شما ",
        });
        setFormData({
          name: "",
          website: "",
          description: "",
          category: "",
          imageLink: "",
          image: null,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: result.message || "خطایی رخ داد.",
        });
      }
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "خطایی در ارسال درخواست وجود دارد.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <NavLink />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            افزودن هوش مصنوعی جدید
          </h2>
          {statusMessage && (
            <p
              className={`text-center py-4 px-6 mb-6 rounded-md ${
                statusMessage.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {statusMessage.text}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                نام
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="نام هوش مصنوعی را وارد کنید"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                لینک سایت
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                توضیحات
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="توضیحات مختصر در مورد هوش مصنوعی"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="4"
                maxLength="200"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                دسته‌بندی
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>
                  انتخاب دسته‌بندی
                </option>
                {categoryData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                لینک تصویر (در صورت وجود)
              </label>
              <input
                type="url"
                name="imageLink"
                value={formData.imageLink}
                onChange={handleImageLinkChange}
                placeholder="https://example.com/image.jpg"
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity ${
                  formData.image
                    ? "opacity-50 pointer-events-none"
                    : "opacity-100"
                }`}
                disabled={Boolean(formData.image)}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                آپلود فایل تصویر (در صورت وجود)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-opacity ${
                  formData.imageLink
                    ? "opacity-50 pointer-events-none"
                    : "opacity-100"
                }`}
                disabled={Boolean(formData.imageLink)}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white py-3 px-6 rounded-md font-semibold transition-colors duration-300 ease-in-out`}
              >
                {isSubmitting ? <Spinner /> : "افزودن هوش مصنوعی"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddAi;
