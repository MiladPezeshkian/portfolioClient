import { useState, useEffect } from "react";
import styles from "./PreSemsterControl.module.css";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PreviousSemesters = () => {
  // State variables
  const [semesters, setSemesters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    year: "",
    season: "Fall",
    students: 0,
    courses: [],
  });
  const [newCourse, setNewCourse] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define endpoints
  const GET_ALL_URL = "https://drfathiserver.onrender.com/api/v1/prevSemester"; // GET all semesters
  const SINGLE_URL = "https://drfathiserver.onrender.com/api/v1/prevSemester"; // For create, update, delete

  // Fetch all semesters on component mount
  useEffect(() => {
    const fetchSemesters = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(GET_ALL_URL, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch semesters: ${response.status}`);
        }
        const data = await response.json();
        // Expecting the data in the format: { data: [...] }
        setSemesters(data.data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSemesters();
  }, []);

  // Handle form submission for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let url = "";
      let method = "";
      if (isEditing) {
        url = `${SINGLE_URL}/${formData._id}`;
        method = "PUT";
      } else {
        url = SINGLE_URL;
        method = "POST";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", // include JWT cookie
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${isEditing ? "update" : "create"} semester: ${
            response.status
          }`
        );
      }

      // Reload the page after a successful operation
      window.location.reload();
    } catch (err) {
      console.error("Submission error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  // Populate the form with the semester to edit
  const handleEdit = (semester) => {
    setIsEditing(true);
    setFormData({
      _id: semester._id,
      year: semester.year,
      season: semester.season,
      students: semester.students,
      courses: semester.courses,
    });
  };

  // Delete a semester after confirming in the modal
  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${SINGLE_URL}/${selectedId}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete semester: ${response.status}`);
      }
      // Reload the page after deletion
      window.location.reload();
    } catch (err) {
      console.error("Deletion error:", err);
      setError(err.message);
      setLoading(false);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Reset the form to its default state
  const resetForm = () => {
    setIsEditing(false);
    setFormData({
      _id: "",
      year: "",
      season: "Fall",
      students: 0,
      courses: [],
    });
    setNewCourse("");
  };

  // Add a course to the courses array
  const addCourse = () => {
    if (newCourse.trim()) {
      setFormData((prev) => ({
        ...prev,
        courses: [...prev.courses, newCourse.trim()],
      }));
      setNewCourse("");
    }
  };

  // Remove a course by index
  const removeCourse = (index) => {
    setFormData((prev) => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index),
    }));
  };

  // If the data is still loading, show a loading message
  if (loading) {
    return <LoadingSpinner />;
  }

  // If there was an error, display it
  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Previous Semesters Management</h1>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this semester?</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button className={styles.deleteBtn} onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.content}>
        {/* Semester List */}
        <div className={styles.listContainer}>
          {semesters.map((semester) => (
            <div key={semester._id} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>
                  {semester.season} {semester.year}
                </h3>
                <div className={styles.controls}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(semester)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      setSelectedId(semester._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className={styles.cardBody}>
                <p>Students: {Number(semester.students).toLocaleString()}</p>
                <div className={styles.courses}>
                  {semester.courses.map((course, i) => (
                    <span key={i} className={styles.coursePill}>
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CRUD Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{isEditing ? "Edit Semester" : "Create New Semester"}</h2>

          <div className={styles.formGroup}>
            <label>Year</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Season</label>
            <select
              value={formData.season}
              onChange={(e) =>
                setFormData({ ...formData, season: e.target.value })
              }
            >
              <option>Fall</option>
              <option>Spring</option>
              <option>Summer</option>
              <option>Winter</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Number of Students</label>
            <input
              type="number"
              value={formData.students}
              onChange={(e) =>
                setFormData({ ...formData, students: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Courses</label>
            <div className={styles.courseInput}>
              <input
                type="text"
                value={newCourse}
                onChange={(e) => setNewCourse(e.target.value)}
                placeholder="Add a course"
              />
              <button
                type="button"
                className={styles.addCourseBtn}
                onClick={addCourse}
              >
                Add
              </button>
            </div>
            <div className={styles.selectedCourses}>
              {formData.courses.map((course, i) => (
                <div key={i} className={styles.courseItem}>
                  {course}
                  <button
                    type="button"
                    className={styles.removeCourse}
                    onClick={() => removeCourse(i)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.saveBtn}>
              {isEditing ? "Update" : "Create"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreviousSemesters;
