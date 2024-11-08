// src/components/Spinner/Spinner.jsx

import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={style.spinner_overlay}>
      <div className={style.spinner_container}></div>
    </div>
  );
};

export default Spinner;
