import PropTypes from "prop-types";

function Catagory({ name, logo, isActive, onClick }) {
  return (
    <div
      className={`max-w-[200px] w-full h-[240px] border rounded-lg flex flex-col justify-center items-center p-5 cursor-pointer transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:bg-blue-400 hover:text-white hover:border-blue ${
        isActive ? "" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={logo}
        alt={name}
        className="h-[60px] mb-3 object-contain transition-transform duration-300 ease-in-out transform hover:scale-110"
      />
      <p className="text-center font-semibold tracking-wide text-sm md:text-base">
        {name}
      </p>
    </div>
  );
}

Catagory.propTypes = {
  name: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Catagory;
