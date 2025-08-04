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
              <span className={style.name}>Dr. milad pezeshkian</span>
              <span className={style.role}>
                Professor of Artificial Intelligence
              </span>
            </h1>
            <div className={style.titleLine} />
          </div>

          <div className={style.aboutPanel}>
            <h2 className={style.aboutTitle}>Research Expertise</h2>
            <p className={style.aboutText}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex natus
              itaque voluptas fuga incidunt obcaecati illo velit sint minima!
              Porro repudiandae, minus reprehenderit quam molestias ad labore
              atque nostrum eius ratione ipsam vitae saepe impedit quasi
              corrupti pariatur ea illo quod minima vel delectus tenetur?
              Tempore sunt id amet maxime obcaecati aperiam nemo ullam.
              Voluptatem iusto consequatur ex? Velit nisi provident a molestias
              maiores, laborum, reiciendis dolores. Rem omnis amet, eos illo,
              inventore ipsum esse expedita numquam quam aperiam quis accusamus
              maxime iure dolore earum natus possimus voluptate quod officia
              molestiae a. Delectus repudiandae in, magni nisi labore assumenda.
              Temporibus laborum iste distinctio quisquam voluptates in facilis
              fuga, eaque unde neque illo molestiae ducimus aliquid iusto nihil
              doloremque eligendi recusandae, beatae error vel. Dicta quas rem
              sed ex nemo recusandae facere est corrupti eligendi nam deleniti
              necessitatibus, quae quis, ipsa minima minus repellendus! Ab neque
              eum voluptas cupiditate facere distinctio voluptates nostrum
              aspernatur! A, eligendi suscipit. Doloribus inventore adipisci
              odit voluptatibus enim similique nesciunt sit dolorum animi,
              incidunt quidem corporis? Sunt, obcaecati?
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
              src="/imgs/man.png"
              alt="SomePHOTO"
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
