import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(`.${styles.footerSection}`, {
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
    }).from(
      `.${styles.copyright}`,
      {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: "power3.out",
      },
      "-=0.4"
    );
  }, []);

  return (
    <footer className={styles.footer} ref={footerRef}>
      <div className={styles.techPattern}></div>

      <div className={styles.footerContent}>
        {/* Academic Profile Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleText}>Academic Profile</span>
            <span className={styles.titleLine}></span>
          </h3>
          <p className={styles.profileText}>
            Dr. Parastoo Fathi is a distinguished scholar in Computer
            Engineering specializing in AI systems and software architecture.
            With 10+ years of academic leadership and 50+ peer-reviewed
            publications, she drives innovation in computational verification
            methods.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleText}>Quick Navigation</span>
            <span className={styles.titleLine}></span>
          </h3>
          <nav aria-label="Footer navigation">
            <ul className={styles.navGrid}>
              <li>
                <Link to="/research" className={styles.navItem}>
                  <span className={styles.linkMarker}></span>
                  Research Domains
                </Link>
              </li>
              <li>
                <Link to="/teaching" className={styles.navItem}>
                  <span className={styles.linkMarker}></span>
                  Teaching Portfolio
                </Link>
              </li>
              <li>
                <Link to="/publications" className={styles.navItem}>
                  <span className={styles.linkMarker}></span>
                  Publications
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.navItem}>
                  <span className={styles.linkMarker}></span>
                  Collaboration
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Contact Section */}
        <div className={styles.footerSection}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.titleText}>Academic Contact</span>
            <span className={styles.titleLine}></span>
          </h3>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <p className={styles.contactText}>
                Faculty of Engineering
                <br />
                University of Kurdistan
                <br />
                Sanandaj, Iran
              </p>
            </div>
            <div className={styles.contactItem}>
              <svg className={styles.contactIcon} viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
              </svg>
              <a
                href="mailto:parastoofathi@uok.ac.ir"
                className={styles.contactLink}
              >
                parastoofathi@uok.ac.ir
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className={styles.copyright}>
        <p className={styles.copyrightText}>
          © {new Date().getFullYear()} Dr. Parastoo Fathi
          <span className={styles.copyrightDivider}>|</span>
          All academic rights reserved
          <span className={styles.copyrightDivider}>|</span>
          <a href="#privacy" className={styles.legalLink}>
            Research Ethics Policy
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
