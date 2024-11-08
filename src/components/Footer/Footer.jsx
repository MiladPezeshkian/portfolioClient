// src/components/Footer/Footer.jsx
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedinIn,
  faTelegramPlane,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={`${style.footers} bg-black text-white py-12`}>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-12">
        {/* Logo and Description */}
        <div>
          <Link to={"/"}>
            <h1
              className="md:text-4xl font-extrabold text-2xl bg-white bg-gradient-to-r from-white via-red-600  to-blue-600 bg-clip-text text-transparent 
            hover:shadow-slate-400/50"
              style={{
                backgroundImage:
                  "linear-gradient(to right, white 25%, red 40%,  red 100%)",
              }}
            >
              LoneWalker.AI
            </h1>
          </Link>
          <p className="text-lg mt-2">Best deals on all products</p>
        </div>

        {/* Navigation Links (Example Sections) */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <Link to="/" className={style.footerLink}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/add" className={style.footerLink}>
                Add New AI
              </Link>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account</h2>
          <ul className="space-y-3 text-lg">
            <li>
              <Link to="/login" className={style.footerLink}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className={style.footerLink}>
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Follow Me In !</h2>
          <div className="flex flex-col space-y-3 text-lg">
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faInstagram}
                className={style.socialIcon}
              />
              <span>Milad_pezeshkian</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faLinkedinIn}
                className={style.socialIcon}
              />
              <span>Milad Pezeshkian</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon
                icon={faTelegramPlane}
                className={style.socialIcon}
              />
              <span>Milad_pezeshkian</span>
            </div>
            <div className="flex items-center space-x-2">
              <FontAwesomeIcon icon={faGithub} className={style.socialIcon} />
              <span>Milad Pezeshkian</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-sm">
        <hr className="border-gray-700 mb-4" />
        <p>&copy; 2024 LoneWalKeR.AI All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
