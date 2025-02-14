import { Link } from "react-router-dom";
import style from "./Header.module.css";
function Header() {
  return (
    <header className={style.header}>
      <div className={style.techGrid} />

      <div className={style.contentWrapper}>
        <div className={style.textPanel}>
          <div className={style.titleGroup}>
            <h1 className={style.title}>
              <span className={style.name}>Dr. ParastoFathi</span>
              <span className={style.role}>
                Professor of Artificial Intelligence
              </span>
            </h1>
            <div className={style.titleLine} />
          </div>

          <div className={style.aboutPanel}>
            <h2 className={style.aboutTitle}>Research Expertise</h2>
            <p className={style.aboutText}>
              Dr. Parastoo Fathi, hold a Ph.D. in Computer Engineering with a
              specialization in Software Engineering from Tarbiat Modares
              University, Tehran. I am currently a visiting professor at the
              Faculty of Electrical and Computer Engineering at the University
              of Kurdistan, where I contribute to academic excellence and
              research innovation. My expertise spans diverse fields, including
              complex networks, bioinformatics, data science, search-based
              software architecture design, decentralized control for
              self-adaptive distributed systems, and runtime software
              verification. My work is characterized by a multidisciplinary
              approach, addressing key challenges at the intersection of
              computation, biology, and software systems.
            </p>
          </div>

          <div className={style.ctaGroup}>
            <a href="www.google.com" className={style.primaryCta}>
              Academic Portfolio
              <span className={style.ctaUnderline} />
            </a>
            <Link className={style.secondaryCta} to="articles">
              Recent Publications
            </Link>
          </div>
        </div>

        <div className={style.visualPanel}>
          <div className={style.profileFrame}>
            <img
              src="/imgs/women.png"
              alt="Dr. Parastoo Fathi"
              className={style.profileImage}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
