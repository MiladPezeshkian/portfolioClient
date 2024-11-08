import React, { useState, Suspense, useEffect } from "react";
import { useUserInfo } from "../../hook/useUserInfo";
import AdminOptions from "../../components/ProfileComponents/Admin/AdminOptions";

// Lazy loading the components
const MyProfile = React.lazy(() =>
  import("../../components/ProfileComponents/MyProfile")
);
const ResetPassword = React.lazy(() =>
  import("../../components/ProfileComponents/ResetPassword")
);
const GetAllProducts = React.lazy(() =>
  import(
    "../../components/ProfileComponents/Admin/MangeProducts/GetAllProducts"
  )
);
const GetProduct = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeProducts/GetProduct")
);
const EditAProduct = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeProducts/EditAProduct")
);
const AddNewProduct = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeProducts/AddNewProduct")
);
const DeleteAProduct = React.lazy(() =>
  import(
    "../../components/ProfileComponents/Admin/MangeProducts/DeleteAProduct"
  )
);
const AddCoupon = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeCoupon/AddCoupon")
);
const DeleteCoupon = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeCoupon/DeleteCoupon")
);
const EditCoupon = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeCoupon/EditCoupon")
);
const GetACoupon = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeCoupon/GetACoupon")
);
const GetAllCoupon = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeCoupon/GetAllCoupon")
);
const DeleteComment = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeComments/DeleteComment")
);
const EditComments = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeComments/EditComments")
);
const GetAllComments = React.lazy(() =>
  import(
    "../../components/ProfileComponents/Admin/MangeComments/GetAllComments"
  )
);
const GetUserComments = React.lazy(() =>
  import(
    "../../components/ProfileComponents/Admin/MangeComments/GetUserComments"
  )
);
const DeleteOrder = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/ManageOrders/DeleteOrder")
);
const EditOrder = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/ManageOrders/EditOrder")
);
const GetAOrder = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/ManageOrders/GetAOrder")
);
const GetAllOrders = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/ManageOrders/GetAllOrders")
);
const BanUser = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUser/BanUser")
);
const EditAUser = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUser/EditAUser")
);
const GetAUser = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUser/GetAUser")
);
const GetAllUser = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUser/GetAllUser")
);
const BestSelling = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/Reports/BestSelling")
);
const Reports = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/Reports/SalesReports")
);
const Answr = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUsersEmail/AnswerEmail")
);
const GetAllEmail = React.lazy(() =>
  import("../../components/ProfileComponents/Admin/MangeUsersEmail/GetAllEmail")
);

function Admin() {
  const [activeSection, setActiveSection] = useState("myProfile");
  const { userData, setIsEditing } = useUserInfo();
  const [choseOne, setChoseOne] = useState(null);
  const [choseOneOrder, setChoseOneOrder] = useState(null);
  const [choseOneCoupon, setChoseOneCoupon] = useState(null);
  const [choseOneComment, setChoseOneComment] = useState(null);
  const [Email, setEmail] = useState(null);
  // Function to render sections
  const renderSection = () => {
    switch (activeSection) {
      case "myProfile":
        return <MyProfile UserData={userData} setIsEditing={setIsEditing} />;
      case "resetPassword":
        return <ResetPassword />;
      case "getAllProduct":
        return <GetAllProducts />;
      case "getProduct":
        return <GetProduct />;
      case "EditProduct":
        return <EditAProduct />;
      case "addProduct":
        return <AddNewProduct />;
      case "DeleteProduct":
        return <DeleteAProduct />;
      case "DeleteCoupon":
        return <DeleteCoupon choseOneCoupon={choseOneCoupon} />;
      case "getAllCoupon":
        return <GetAllCoupon setChoseOneCoupon={setChoseOneCoupon} />;
      case "getCoupon":
        return <GetACoupon choseOneCoupon={choseOneCoupon} />;
      case "addCoupon":
        return <AddCoupon />;
      case "EditCoupon":
        return <EditCoupon choseOneCoupon={choseOneCoupon} />;
      case "getUserComments":
        return <GetUserComments choseOneComment={choseOneComment} />;
      case "EditComments":
        return <EditComments choseOneComment={choseOneComment} />;
      case "DeleteComments":
        return <DeleteComment choseOneComment={choseOneComment} />;
      case "getAllComments":
        return <GetAllComments setChoseOneComment={setChoseOneComment} />;
      case "getAllOrders":
        return <GetAllOrders setChoseOneOrder={setChoseOneOrder} />;
      case "getOrder":
        return <GetAOrder choseOneOrder={choseOneOrder} />;
      case "EditOrder":
        return <EditOrder choseOneOrder={choseOneOrder} />;
      case "DeleteOrder":
        return <DeleteOrder choseOneOrder={choseOneOrder} />;
      case "getAllUser":
        return <GetAllUser setChoseOne={setChoseOne} />;
      case "getUser":
        return <GetAUser choseOne={choseOne} />;
      case "EditUser":
        return <EditAUser choseOne={choseOne} />;
      case "DeleteUser":
        return <BanUser choseOne={choseOne} />;
      case "salesReport":
        return <Reports />;
      case "getAllEmails":
        return <GetAllEmail setEmail={setEmail} />;
      case "AnswerEmail":
        return <Answr Email={Email} />;

      case "bestSellingProducts":
        return <BestSelling />;

      default:
        return <MyProfile userData={userData} />;
    }
  };

  useEffect(() => {
    renderSection();
  }, [
    choseOne,
    activeSection,
    setEmail,
    setChoseOneCoupon,
    setChoseOneComment,
    setChoseOneOrder,
  ]); // Listen for changes in choseOne and activeSection

  return (
    <div className="flex flex-col justify-evenly items-center min-w-full bg-gray-100 p-4 md:p-8 text-xl">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full max-w-7xl space-y-4 md:space-y-0 md:space-x-8 ">
        {/* Sidebar (User Options) */}
        <div className="md:w-[100%] min-w-[30rem] flex-grow bg-white rounded-lg p-6 md:p-10 flex items-center md:justify-start justify-center min-h-[400px] md:min-h-[500px] flex-col">
          <h1 className="font-semibold text-red-400 text-center md:text-[3rem] text-[2rem] mb-6">
            Admin Page
          </h1>
          <AdminOptions
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>

        {/* Content area */}
        <div className="w-[100%] flex-grow bg-white rounded-lg p-6 md:p-10 flex items-center justify-center min-h-[400px] md:min-h-[500px]">
          <Suspense fallback={<div>Loading...</div>}>
            {renderSection()}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Admin;
