import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import style from "./announcement.module.css";

const API_URL = "https://drfathiserver.onrender.com/api/v1/announcement";
const CATEGORIES = [
  "University News",
  "Course Schedule",
  "Exam Timetable",
  "Research Announcement",
  "Job Opportunity",
  "Workshop",
  "Study Materials",
  "Syllabus Changes",
];
const PRIORITIES = ["low", "medium", "high"];

function AnnoControl() {
  const [announcements, setAnnouncements] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: CATEGORIES[0],
    priority: "medium",
  });

  // تابعی برای واکشی اطلاعیه‌ها
  const fetchAnnouncements = async () => {
    try {
      const res = await fetch(`${API_URL}/`, {
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch announcements");
      }
      const data = await res.json();
      setAnnouncements(data.data.announcements);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ارسال فرم برای ایجاد یا ویرایش اطلاعیه
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        // به‌روزرسانی اطلاعیه
        const res = await fetch(`${API_URL}/${currentId}`, {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to update announcement");
        }
        toast.success("Announcement updated successfully");
      } else {
        // ایجاد اطلاعیه جدید
        const res = await fetch(`${API_URL}/`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to create announcement");
        }
        toast.success("Announcement created successfully");
      }
      // تازه‌سازی لیست اطلاعیه‌ها
      await fetchAnnouncements();
      resetForm();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  // تنظیم فرم جهت ویرایش اطلاعیه
  const handleEdit = (anno) => {
    setIsEditing(true);
    setCurrentId(anno._id);
    setFormData({
      title: anno.title,
      content: anno.content,
      category: anno.category,
      priority: anno.priority,
    });
  };

  // حذف اطلاعیه
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this announcement?"))
      return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Deletion failed");
      }
      // حذف اطلاعیه از state بدون نیاز به واکشی مجدد
      setAnnouncements((prev) => prev.filter((anno) => anno._id !== id));
      toast.success("Announcement deleted successfully");
    } catch (error) {
      toast.error(error.message || "Deletion failed");
    } finally {
      setIsLoading(false);
    }
  };

  // آرشیو اطلاعیه
  const handleArchive = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}/archive`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Archive failed");
      }
      // به‌روزرسانی اطلاعیه آرشیو شده در state
      setAnnouncements((prev) =>
        prev.map((anno) =>
          anno._id === id ? { ...anno, isArchived: true } : anno
        )
      );
      toast.success("Announcement archived");
    } catch (error) {
      toast.error(error.message || "Archive failed");
    } finally {
      setIsLoading(false);
    }
  };

  // ریست کردن فرم
  const resetForm = () => {
    setIsEditing(false);
    setCurrentId(null);
    setFormData({
      title: "",
      content: "",
      category: CATEGORIES[0],
      priority: "medium",
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={style.container}>
      <h1 className={style.title}>Announcements Dashboard</h1>
      <div className={style.content}>
        {/* لیست اطلاعیه‌ها */}
        <div className={style.listContainer}>
          {announcements.map((anno) => (
            <div
              key={anno._id}
              className={`${style.card} ${
                anno.isArchived ? style.archived : ""
              }`}
              data-priority={anno.priority}
            >
              <div className={style.cardHeader}>
                <h3>{anno.title}</h3>
                <div className={style.controls}>
                  {!anno.isArchived && (
                    <>
                      <button
                        className={style.editBtn}
                        onClick={() => handleEdit(anno)}
                      >
                        Edit
                      </button>
                      <button
                        className={style.archiveBtn}
                        onClick={() => handleArchive(anno._id)}
                      >
                        Archive
                      </button>
                    </>
                  )}
                  <button
                    className={style.deleteBtn}
                    onClick={() => handleDelete(anno._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={style.cardBody}>
                <p>{anno.content}</p>
                <div className={style.meta}>
                  <span className={style.category}>{anno.category}</span>
                  <span className={style.priority}>{anno.priority}</span>
                  <span className={style.date}>
                    {new Date(anno.publishedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* فرم اطلاعیه */}
        <form className={style.form} onSubmit={handleSubmit}>
          <h2>{isEditing ? "Edit Announcement" : "New Announcement"}</h2>
          <div className={style.formGroup}>
            <label>Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className={style.formGroup}>
            <label>Content</label>
            <textarea
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className={style.textarea}
            />
          </div>
          <div className={style.formGroup}>
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className={style.formGroup}>
            <label>Priority</label>
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({ ...formData, priority: e.target.value })
              }
            >
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div className={style.formActions}>
            <button type="submit" className={style.saveBtn}>
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className={style.cancelBtn}
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnnoControl;
