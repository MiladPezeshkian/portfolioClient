import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Contact.module.css";
import { FiMapPin, FiMail, FiPhone, FiSend } from "react-icons/fi";

function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic
  };

  return (
    <section className={styles.section} id="contact" data-aos="fade-up">
      <div className={styles.particleBackground} />

      <div className={styles.header}>
        <h2 className={styles.title}>
          <span className={styles.titleUnderline}>Contact</span>
        </h2>
        <p className={styles.subtitle}>
          Let&apos;s Innovate Together - Connect for Research Collaborations &
          Academic Discourse
        </p>
      </div>

      <div className={styles.container}>
        {/* Interactive Form */}
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
              id="subject"
              className={styles.input}
              placeholder=" "
              required
            />
            <label htmlFor="subject" className={styles.label}>
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
            ></textarea>
            <label htmlFor="message" className={styles.label}>
              Your Message
            </label>
            <div className={styles.textareaUnderline} />
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <FiSend className={styles.sendIcon} />
            Transmit Inquiry
            <div className={styles.btnHoverEffect} />
          </button>
        </form>

        {/* Animated Contact Cards */}
        <div
          className={styles.infoContainer}
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div className={styles.infoCard}>
            <div className={styles.cardGlow} />
            <FiMapPin className={styles.cardIcon} />
            <h3 className={styles.infoTitle}>Strategic Location</h3>
            <div className={styles.infoContent}>
              <p>Faculty of ECE</p>
              <p>University of Kurdistan</p>
              <p>Sanandaj, Iran</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardGlow} />
            <FiMail className={styles.cardIcon} />
            <h3 className={styles.infoTitle}>Digital Reach</h3>
            <div className={styles.infoContent}>
              <a href="mailto:p.fathi@uok.ac.ir" className={styles.link}>
                p.fathi@uok.ac.ir
              </a>
              <a href="mailto:parastoo.fathi@gmail.com" className={styles.link}>
                parastoo.fathi@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.cardGlow} />
            <FiPhone className={styles.cardIcon} />
            <h3 className={styles.infoTitle}>Acoustic Connection</h3>
            <div className={styles.infoContent}>
              <a href="tel:+988733454000" className={styles.link}>
                +98 87 3345 4000
              </a>
              <span className={styles.extension}>Ext: 2214</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
