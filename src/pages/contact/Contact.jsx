// Contact.jsx
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./contact.module.css";
import ContactHeader from "./ContactHeader";
import ContactForm from "./ContactForm";
import InfoCards from "./InfoCards";

function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <section className={styles.section} id="contact" data-aos="fade-up">
      <div className={styles.particleBackground} />
      <ContactHeader />
      <div className={styles.container}>
        <ContactForm />
        <InfoCards />
      </div>
    </section>
  );
}

export default Contact;
