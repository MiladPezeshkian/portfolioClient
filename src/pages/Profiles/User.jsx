import { useState } from "react";
import PropTypes from "prop-types";
import MyProfile from "../../components/ProfileComponents/MyProfile";
import UserOptions from "../../components/ProfileComponents/User/UserOptions";
import ResetPassword from "../../components/ProfileComponents/ResetPassword";
import MyOrder from "../../components/ProfileComponents/User/MyOrders";
import { useUserInfo } from "../../hook/useUserInfo";

function User() {
  const [activeSection, setActiveSection] = useState("myProfile");
  const { userData, setIsEditing } = useUserInfo();

  // Function to render sections
  const renderSection = () => {
    switch (activeSection) {
      case "myProfile":
        return <MyProfile UserData={userData} setIsEditing={setIsEditing} />;
      case "resetPassword":
        return <ResetPassword />;
      case "myOrder":
        return <MyOrder userData={userData} />;

      default:
        return <MyProfile userData={userData} />;
    }
  };

  return (
    <div className="flex flex-col justify-evenly items-center min-w-full bg-gray-100 p-4 md:p-8 text-xl min-h-[100vh]">
      <div className="flex flex-col md:flex-row justify-center items-start w-full max-w-7xl space-y-4 md:space-y-0 md:space-x-8 ">
        {/* Sidebar (User Options) */}
        <div className=" w-[100%] flex-grow bg-white rounded-lg p-6 md:p-10 flex items-center justify-center ">
          <UserOptions
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Content area */}
        <div className="w-[100%]  flex-grow bg-white rounded-lg p-6 md:p-10 flex items-center justify-center ">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

// PropTypes برای اعتبارسنجی نوع UserData
User.propTypes = {
  UserData: PropTypes.shape({
    role: PropTypes.string.isRequired, // نقش کاربر (مثلاً user، admin)
    name: PropTypes.string, // نام کاربر
    email: PropTypes.string, // ایمیل کاربر
    // سایر فیلدهای UserData در صورت وجود
  }),
};

export default User;
