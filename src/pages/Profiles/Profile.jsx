import NavLink from "../../components/NavLink/NavLink";
import Footer from "../../components/Footer/Footer";
import Spinner from "../../components/Spinner/Spinner";
import Manger from "./Manger";
import User from "./User";
import Admin from "./Admin";
import { useUserInfo } from "../../hook/useUserInfo";

function Profile() {
  const { userData, loading, error } = useUserInfo();

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  // رندر کامپوننت بر اساس نقش کاربر
  switch (userData?.role) {
    case "manger":
      return (
        <div className="w-[100%] h-[100Vh]">
          <NavLink />
          <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Manger />
          </div>
          <Footer />
        </div>
      );
    case "user":
      return (
        <>
          a<NavLink />
          <div className="w-[100%] ">
            <User />
          </div>
          <Footer />
        </>
      );
    case "admin":
      return (
        <div className="w-[100%] h-[100Vh]">
          <NavLink />
          <div className="min-h-screen bg-gray-50 flex flex-col items-center">
            <Admin />
          </div>
          <Footer />
        </div>
      );
    default:
      return <Spinner />;
  }
}

export default Profile;
