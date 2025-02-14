// ContactForm.jsx
import { useState } from "react";
import { FiMapPin, FiMail, FiSend } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "./Contact.module.css";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://drfathiserver.onrender.com/api/v1/contact",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          title: formData.title.trim(),
          message: formData.message.trim(),
        }
      );

      if (response.data.status === "success") {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", title: "", message: "" });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error sending message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      data-aos="fade-right"
      data-aos-easing="ease-out-cubic"
    >
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input
            type="text"
            id="name"
            className={styles.input}
            placeholder=" "
            required
            pattern="[A-Za-z ]{3,50}"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <label htmlFor="name" className={styles.label}>
            <FiMapPin className={styles.inputIcon} />
            Full Name
          </label>
          <div className={styles.inputUnderline} />
        </div>

        <div className={styles.formGroup}>
          <input
            type="email"
            id="email"
            className={styles.input}
            placeholder=" "
            required
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <label htmlFor="email" className={styles.label}>
            <FiMail className={styles.inputIcon} />
            Email Address
          </label>
          <div className={styles.inputUnderline} />
        </div>
      </div>

      <div className={styles.formGroup}>
        <input
          type="text"
          id="title"
          className={styles.input}
          placeholder=" "
          required
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        <label htmlFor="title" className={styles.label}>
          <FiSend className={styles.inputIcon} />
          Subject
        </label>
        <div className={styles.inputUnderline} />
      </div>

      <div className={styles.formGroup}>
        <textarea
          id="message"
          className={styles.textarea}
          placeholder=" "
          required
          minLength="20"
          rows="6"
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        ></textarea>
        <label htmlFor="message" className={styles.label}>
          Message
        </label>
        <div className={styles.textareaUnderline} />
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        data-aos="zoom-in"
        data-aos-delay="200"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <LoadingSpinner />
          </>
        ) : (
          <>
            <FiSend className={styles.sendIcon} />
            Send Message
            <div className={styles.btnHoverEffect} />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
