import React, { lazy, Suspense, useContext, memo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import ErrorPage from "./pages/404ErrorPage/ErrorPage";
import AuthContext, { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ایجاد نمونه QueryClient
const queryClient = new QueryClient();

// بارگذاری تنبل کامپوننت‌ها
const Home = lazy(() => import("./pages/Home/Home"));
const Announcements = lazy(() =>
  import("./pages/Announcementts/Announcements")
);
const Articles = lazy(() => import("./pages/Articles/Articles"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const CurrentSemester = lazy(() =>
  import("./pages/CurrentSemester/CurrentSemester")
);
const PreviousSemester = lazy(() =>
  import("./pages/PreviosSemster/PreviosSemster")
);
const Login = lazy(() => import("./pages/Login/Login"));

// بارگذاری تنبل بخش ادمین
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const HomeControl = lazy(() =>
  import("./pages/Admin/ChangingPannel/Home/HomeControl")
);
const AnnoControl = lazy(() =>
  import("./pages/Admin/ChangingPannel/AnnouncementsControl/AnnoControl")
);
const CurrentSemsterControl = lazy(() =>
  import(
    "./pages/Admin/ChangingPannel/CurrentSemester/CurrentSemsterController"
  )
);
const PreviosSemesterControl = lazy(() =>
  import("./pages/Admin/ChangingPannel/PreviosSemster/PreSemsterControl")
);
const ArticlesControler = lazy(() =>
  import("./pages/Admin/ChangingPannel/Articles/ArticlesControls")
);

const ContactControl = lazy(() =>
  import("./pages/Admin/ChangingPannel/MessageAndAnswer/MessageAndAnswer")
);

// بهینه‌سازی Navbar و Footer با memo
const MemoizedNavbar = memo(Navbar);
const MemoizedFooter = memo(Footer);

// کامپوننت مدیریت روت‌ها
const AppRouter = () => {
  const { isLogin } = useContext(AuthContext);

  if (isLogin === null) {
    return <LoadingSpinner isFullPage={true} />;
  }

  return (
    <Routes>
      {/* روت‌های عمومی */}
      <Route path="/" element={<Home />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/current" element={<CurrentSemester />} />
      <Route path="/previous" element={<PreviousSemester />} />
      <Route path="/login" element={<Login />} />

      {/* روت‌های ادمین (محافظت‌شده) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin-dashboard/" element={<AdminDashboard />}>
          <Route index element={<Navigate to="home-control" replace />} />
          <Route path="home-control" element={<HomeControl />} />
          <Route path="announcements-control" element={<AnnoControl />} />
          <Route path="current-semester" element={<CurrentSemsterControl />} />
          <Route
            path="previous-semesters"
            element={<PreviosSemesterControl />}
          />
          <Route path="Articles" element={<ArticlesControler />} />
          <Route path="messages" element={<ContactControl />} />
        </Route>
      </Route>

      {/* صفحه خطای 404 */}
      <Route path="/404" element={<ErrorPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

// کامپوننت اصلی
const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <MemoizedNavbar />
            <Suspense fallback={<LoadingSpinner isFullPage={true} />}>
              <AppRouter />
            </Suspense>
            <MemoizedFooter />
          </QueryClientProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
