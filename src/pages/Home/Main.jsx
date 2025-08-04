import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Main.module.css";

function Main() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero} data-aos="fade-down">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Advancing AI & Software Engineering
            <span className={styles.heroSubtitle}>
              dr milad pezeshkian, Ph.D.
            </span>
          </h1>
          <p className={styles.heroText}>
            Leading research in adaptive systems and computational verification
            at the University of Kurdistan. Pioneering ethical AI frameworks and
            distributed architectures through 50+ peer-reviewed publications.
          </p>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className={styles.researchSection}>
        <div className={styles.sectionHeader} data-aos="fade-right">
          <h2 className={styles.sectionTitle}>Research Frontiers</h2>
          <p className={styles.sectionSubtitle}>
            Innovating at the intersection of theory and practice
          </p>
        </div>

        <div className={styles.researchGrid}>
          <div className={styles.researchCard} data-aos="fade-up">
            <div className={styles.researchIcon}>🧪</div>
            <h3>Adaptive AI Systems</h3>
            <p>
              Developing self-optimizing architectures for dynamic environments
            </p>
          </div>

          <div
            className={styles.researchCard}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className={styles.researchIcon}>🔬</div>
            <h3>Computational Verification</h3>
            <p>Runtime verification techniques for distributed systems</p>
          </div>

          <div
            className={styles.researchCard}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className={styles.researchIcon}>🌐</div>
            <h3>Ethical AI Frameworks</h3>
            <p>Responsible AI development for biomedical applications</p>
          </div>
        </div>
      </section>

      {/* Featured Publication Section */}
      <section className={styles.publicationSection} data-aos="fade-up">
        <div className={styles.publicationContent}>
          <div className={styles.publicationText}>
            <h2>Featured Publication</h2>
            <h3>
              &quot;Self-Adaptive Architectures in Distributed Systems &quot;
            </h3>
            <p className={styles.journalName}>
              IEEE Transactions on Software Engineering
            </p>
            <p className={styles.abstract}>
              Novel framework for runtime verification in decentralized
              environments, cited 120+ times since 2022 publication.
            </p>
            <button className={styles.readButton}>Read Paper →</button>
          </div>
          <div className={styles.publicationImage}>
            <img
              src="./imgs/mainimage.jpg"
              alt=""
              className={styles.imageOverlay}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Main;
