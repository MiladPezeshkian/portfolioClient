// HomeControl.jsx
import { useState } from "react";
import style from "./HomeController.module.css";

function HomeControl() {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Always validate the email field
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Determine if any password field is provided
    const passwordFieldsProvided =
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword;

    // If any password field is provided, validate all password fields
    if (passwordFieldsProvided) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }
      if (!formData.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Password confirmation is required";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Password confirmation does not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Prepare the payload using the correct field name for password confirmation
        const payload = {
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
          passwordConfirm: formData.confirmPassword, // rename confirmPassword here
        };

        const response = await fetch(
          "https://drfathiserver.onrender.com/api/v1/auth/updateaccount",
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          // Handle server errors here if needed
          setErrors({ server: "Failed to update account" });
        } else {
          setSuccess("Changes saved successfully");
          // Optionally clear the form after successful submission
          setFormData({
            email: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          setErrors({});
          setTimeout(() => setSuccess(""), 3000);
        }
      } catch (error) {
        setErrors({ server: "Server error. Please try again later." });
      }
    }
  };

  return (
    <div className={style.adminPanel}>
      <h2 className={style.title}>User Account Settings</h2>

      <form onSubmit={handleSubmit} className={style.form}>
        {/* Email Field */}
        <div className={style.formGroup}>
          <label htmlFor="email" className={style.label}>
            New Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`${style.input} ${errors.email ? style.errorInput : ""}`}
          />
          {errors.email && (
            <span className={style.errorMessage}>{errors.email}</span>
          )}
        </div>

        {/* Current Password Field */}
        <div className={style.formGroup}>
          <label htmlFor="currentPassword" className={style.label}>
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={(e) =>
              setFormData({ ...formData, currentPassword: e.target.value })
            }
            className={`${style.input} ${
              errors.currentPassword ? style.errorInput : ""
            }`}
          />
          {errors.currentPassword && (
            <span className={style.errorMessage}>{errors.currentPassword}</span>
          )}
        </div>

        {/* New Password Field */}
        <div className={style.formGroup}>
          <label htmlFor="newPassword" className={style.label}>
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            className={`${style.input} ${
              errors.newPassword ? style.errorInput : ""
            }`}
          />
          {errors.newPassword && (
            <span className={style.errorMessage}>{errors.newPassword}</span>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className={style.formGroup}>
          <label htmlFor="confirmPassword" className={style.label}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            className={`${style.input} ${
              errors.confirmPassword ? style.errorInput : ""
            }`}
          />
          {errors.confirmPassword && (
            <span className={style.errorMessage}>{errors.confirmPassword}</span>
          )}
        </div>

        {/* Server Error */}
        {errors.server && (
          <div className={style.errorMessage}>{errors.server}</div>
        )}

        {/* Success Message */}
        {success && <div className={style.successMessage}>{success}</div>}

        <button type="submit" className={style.submitButton}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default HomeControl;
