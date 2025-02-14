// CurrentSemesterController.jsx
import { useEffect, useState, useCallback } from "react";
import styles from "./CurrentSemsterController.module.css";
import { FiClock, FiEdit, FiAlertTriangle } from "react-icons/fi";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import ToastNotification from "../../../../components/ToastNotification/ToastNotification";
import ScheduleHeader from "./ScheduleHeader";
import ScheduleTable from "./ScheduleTable";
import MobileSchedule from "./MobileSchedule";
import EditModal from "./EditModal";

const daysOfWeek = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = [
  "8:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

const CurrentSemesterController = () => {
  const [schedule, setSchedule] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSave, setShowSave] = useState(false);

  // دریافت اطلاعات برنامه از API
  const fetchSchedule = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        "https://drfathiserver.onrender.com/api/v1/schedules/getall"
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const { data } = await res.json();
      setSchedule(data?.schedules?.[0] || null);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch schedule");
      console.error("API Error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedule();
  }, [fetchSchedule]);

  // تابع رندر محتویات سلول
  const renderCellContent = (day, time) => {
    const baseData =
      schedule?.timetable?.find((t) => t.time === time)?.days?.[day] || {};
    const pendingData = pendingChanges[`${day}-${time}`] || {};

    const displayData = {
      course:
        pendingData.course !== undefined
          ? pendingData.course
          : baseData.course || "",
      location:
        pendingData.location !== undefined
          ? pendingData.location
          : baseData.location || "",
    };

    // اگر مقدار فقط شامل فضای خالی باشد، آن را به عنوان رشته خالی در نظر بگیر
    const courseText =
      displayData.course.trim() === "" ? "" : displayData.course;
    const locationText =
      displayData.location.trim() === "" ? "" : displayData.location;

    return courseText || locationText ? (
      <div className={styles.courseCard}>
        <div className={styles.courseHeader}>
          <FiClock className={styles.timeIcon} />
          <h4>{courseText}</h4>
        </div>
        {locationText && <p className={styles.locationText}>{locationText}</p>}
      </div>
    ) : (
      <div className={styles.emptyCell}>
        <FiEdit className={styles.editIcon} />
        <span>No Scheduled Class</span>
      </div>
    );
  };

  // ویرایش سلول
  const handleCellEdit = (day, time, field, value) => {
    const newValue = value.trim();
    setPendingChanges((prev) => ({
      ...prev,
      [`${day}-${time}`]: {
        ...prev[`${day}-${time}`],
        [field]: newValue,
        day,
        timeSlot: time,
      },
    }));
    setShowSave(true);
  };

  // پاکسازی محتوای سلول (با فعال کردن دکمه ذخیره)
  const handleClearCell = (day, time) => {
    setPendingChanges((prev) => ({
      ...prev,
      [`${day}-${time}`]: {
        course: "",
        location: "",
        day,
        timeSlot: time,
      },
    }));
    setShowSave(true);
  };

  // حذف تغییرات سلول (برای دکمه Discard)
  const discardChanges = () => {
    setPendingChanges((prev) => {
      const newChanges = { ...prev };
      const key = `${editingCell.day}-${editingCell.time}`;
      delete newChanges[key];
      return newChanges;
    });
    setEditingCell(null);
  };

  // ذخیره تغییرات (Bulk Save)
  const handleBulkSave = async () => {
    try {
      const changes = Object.values(pendingChanges);
      if (changes.length === 0) return;

      const res = await fetch(
        "https://drfathiserver.onrender.com/api/v1/schedules/setAll",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ changes }),
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}: Update failed`);

      const { data } = await res.json();
      setSchedule((prev) => ({ ...prev, ...data.schedule }));
      setPendingChanges({});
      setShowSave(false);
      setEditingCell(null);
    } catch (err) {
      setError(err.message || "Failed to save changes");
      console.error("Save Error:", err);
    }
  };

  // بستن مدال ویرایش
  const closeModal = () => {
    setEditingCell(null);
  };

  return (
    <div className={styles.adminContainer}>
      <ScheduleHeader
        showSave={showSave}
        handleBulkSave={handleBulkSave}
        pendingChanges={pendingChanges}
      />

      <main className={styles.contentWrapper}>
        {isLoading ? (
          <div className={styles.loadingOverlay}>
            <LoadingSpinner size="xl" />
            <p className={styles.loadingText}>Loading Schedule Data...</p>
          </div>
        ) : schedule ? (
          <div className={styles.tableWrapper}>
            <div className={styles.desktopView}>
              <ScheduleTable
                timeSlots={timeSlots}
                daysOfWeek={daysOfWeek}
                renderCellContent={renderCellContent}
                pendingChanges={pendingChanges}
                setEditingCell={setEditingCell}
              />
            </div>
            <div className={styles.mobileView}>
              <MobileSchedule
                timeSlots={timeSlots}
                daysOfWeek={daysOfWeek}
                pendingChanges={pendingChanges}
                schedule={schedule}
                setEditingCell={setEditingCell}
              />
            </div>
          </div>
        ) : (
          <div className={styles.noData}>
            <h2>No Schedule Found</h2>
            <p>Create a new schedule to get started</p>
          </div>
        )}

        {editingCell && (
          <EditModal
            editingCell={editingCell}
            pendingChanges={pendingChanges}
            handleCellEdit={handleCellEdit}
            handleClearCell={handleClearCell}
            discardChanges={discardChanges}
            closeModal={closeModal}
          />
        )}
      </main>

      {error && (
        <div className={styles.notificationContainer}>
          <ToastNotification
            type="error"
            message={error}
            icon={<FiAlertTriangle className={styles.errorIcon} />}
            onClose={() => setError(null)}
          />
        </div>
      )}
    </div>
  );
};

export default CurrentSemesterController;
