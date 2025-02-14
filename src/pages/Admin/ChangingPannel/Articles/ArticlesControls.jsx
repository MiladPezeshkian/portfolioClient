// ArticlesControls.jsx
import { useState, useEffect } from "react";
import styles from "./Articles.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { FiEdit, FiTrash2, FiSearch, FiUpload } from "react-icons/fi";

const ArticlesControls = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: "",
    doi: "",
    award: "",
    featured: false,
    pdfFile: null,
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // دریافت مقالات هنگام لود اولیه
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://drfathiserver.onrender.com/api/v1/article",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        setStatus({ type: "error", message: "Failed to load articles" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

  // مدیریت تغییرات فرم
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // مدیریت آپلود فایل PDF
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormData((prev) => ({ ...prev, pdfFile: file }));
      setStatus({ type: "success", message: "PDF file selected successfully" });
    } else {
      setStatus({ type: "error", message: "Please select a valid PDF file" });
    }
  };

  // مدیریت ویرایش مقاله
  const handleEdit = (article) => {
    setEditId(article._id);
    setFormData({
      title: article.title,
      authors: article.authors.join(", "), // تبدیل آرایه به رشته جداشده با کاما
      journal: article.journal,
      year: article.year,
      doi: article.doi,
      award: article.award,
      featured: article.featured,
      pdfFile: null,
    });
  };

  // مدیریت حذف مقاله
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;

    try {
      const response = await fetch(
        `https://drfathiserver.onrender.com/api/v1/article/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (!response.ok) throw new Error("Failed to delete article");

      setArticles((prev) => prev.filter((article) => article._id !== id));
      setStatus({ type: "success", message: "Article deleted successfully" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  };

  // مدیریت ارسال فرم (ایجاد یا به‌روزرسانی)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // در حالت ایجاد، فایل PDF باید انتخاب شده باشد
    if (!formData.pdfFile && !editId) {
      setStatus({ type: "error", message: "Please select a PDF file" });
      return;
    }

    // آماده‌سازی payload برای ارسال به صورت FormData
    const payload = new FormData();
    payload.append("title", formData.title);
    // تبدیل نویسندگان از رشته به آرایه
    const authorsArray = formData.authors
      .split(",")
      .map((author) => author.trim());
    payload.append("authors", JSON.stringify(authorsArray));
    payload.append("journal", formData.journal);
    payload.append("year", formData.year);
    payload.append("doi", formData.doi);
    payload.append("award", formData.award);
    payload.append("featured", formData.featured);
    if (formData.pdfFile) {
      payload.append("pdfFile", formData.pdfFile);
    }

    try {
      setIsSubmitting(true);
      let url = "https://drfathiserver.onrender.com/api/v1/article";
      let method = "POST";

      if (editId) {
        url = `https://drfathiserver.onrender.com/api/v1/article/${editId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        credentials: "include",

        body: payload,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Operation failed");

      if (editId) {
        setArticles((prev) =>
          prev.map((article) => (article._id === editId ? data : article))
        );
      } else {
        setArticles((prev) => [...prev, data]);
      }

      setStatus({
        type: "success",
        message: `Article ${editId ? "updated" : "created"} successfully!`,
      });
      resetForm();
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Operation failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // بازنشانی فرم
  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: "",
      doi: "",
      award: "",
      featured: false,
      pdfFile: null,
    });
    setEditId(null);
  };

  // فیلتر کردن مقالات بر اساس جستجو
  const filteredArticles = articles.filter((article) => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      article.title.toLowerCase().includes(lowerSearch) ||
      article.authors.join(" ").toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Article Management Panel</h1>
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search articles..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {status.message && (
        <div className={`${styles.alert} ${styles[status.type]}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className={styles.grid}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter article title"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="authors" className={styles.label}>
              Authors
            </label>
            <input
              type="text"
              id="authors"
              name="authors"
              value={formData.authors}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter authors separated by commas"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="journal" className={styles.label}>
              Journal
            </label>
            <input
              type="text"
              id="journal"
              name="journal"
              value={formData.journal}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter journal name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="year" className={styles.label}>
              Year
            </label>
            <input
              type="number"
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter publication year"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="doi" className={styles.label}>
              DOI
            </label>
            <input
              type="text"
              id="doi"
              name="doi"
              value={formData.doi}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter DOI"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="award" className={styles.label}>
              Award
            </label>
            <input
              type="text"
              id="award"
              name="award"
              value={formData.award}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="Enter award if any"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              Featured Article
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="pdfFile" className={styles.label}>
              Upload PDF
            </label>
            <div
              className={styles.uploadArea}
              onClick={() => document.getElementById("pdfFile").click()}
            >
              <div className={styles.uploadContent}>
                <FiUpload className={styles.uploadIcon} />
                <p className={styles.uploadText}>
                  {formData.pdfFile
                    ? formData.pdfFile.name
                    : "Click to select a PDF file"}
                </p>
              </div>
            </div>
            <input
              type="file"
              id="pdfFile"
              name="pdfFile"
              accept="application/pdf"
              onChange={handleFileUpload}
              className={styles.fileInput}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={resetForm}
            disabled={isSubmitting}
          >
            {editId ? "Cancel Edit" : "Reset Form"}
          </button>
          <button
            type="submit"
            className={styles.primaryButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingSpinner />
            ) : editId ? (
              "Update Article"
            ) : (
              "Create Article"
            )}
          </button>
        </div>
      </form>

      <div className={styles.articlesTable}>
        <div className={styles.tableHeader}>
          <span>Title</span>
          <span>Authors</span>
          <span>Journal</span>
          <span>Year</span>
          <span>Actions</span>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <LoadingSpinner />
          </div>
        ) : filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div key={article._id} className={styles.tableRow}>
              <div className={styles.titleCell}>{article.title}</div>
              <div className={styles.authorsCell}>
                {article.authors.join(", ")}
              </div>
              <div className={styles.journalCell}>{article.journal}</div>
              <div className={styles.yearCell}>{article.year}</div>
              <div className={styles.actionsCell}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(article)}
                >
                  <FiEdit />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(article._id)}
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No articles found</div>
        )}
      </div>
    </div>
  );
};

export default ArticlesControls;
