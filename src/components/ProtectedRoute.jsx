import useAuth from "../hook/useAuth";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner/Spinner";

const ProtectedRoute = ({ component: Component, NavigateTo, Message }) => {
  const { isLogin, loading, error } = useAuth();

  // اگر هنوز وضعیت لاگین بررسی نشده باشد، اسپینر را نمایش بده
  if (loading) {
    return <Spinner />;
  }

  // اگر خطایی رخ داده یا لاگین نیست
  if (error || !isLogin) {
    return <Navigate to={`/${NavigateTo}`} state={{ message: Message }} />;
  }

  // در غیر این صورت، کامپوننت مورد نظر رندر شود
  return <Component />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  NavigateTo: PropTypes.string.isRequired,
  Message: PropTypes.string.isRequired,
};

export default ProtectedRoute;
