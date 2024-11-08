import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "./context/AuthContext"; // مطمئن شوید مسیر درست است
import { UserInfoProvider } from "./context/UserInfoContext.jsx";
import Spinner from "./components/Spinner/Spinner.jsx";

const Home = lazy(() => import("./pages/Home/Home"));

const Register = lazy(() => import("./pages/Register/Register"));
const Login = lazy(() => import("./pages/login/Login.jsx"));

const PageNotFound = lazy(() => import("./pages/PageNotFound/PageNotFound"));
const SingleCategorise = lazy(() => import("./pages/SingleCategorise.jsx"));

const AddAi = lazy(() => import("./pages/AddAi.jsx"));
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserInfoProvider>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />

              <Route
                path="/addAi"
                element={
                  <ProtectedRoute
                    component={AddAi}
                    NavigateTo="login"
                    Message="PLease Login First"
                  />
                }
              />
              <Route
                path="/SingleCategorise/:id"
                element={<SingleCategorise />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </UserInfoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
