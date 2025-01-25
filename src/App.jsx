import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Research from "./Pages/Research/Research.jsx";
import Announcements from "./Pages/Announcementts/Announcements.jsx";
import Publications from "./Pages/Publication/Publications.jsx";
import Contact from "./Pages/Contact/Contact.jsx";
import CurrentSemester from "./Pages/CurrentSemester/CurrentSemester.jsx";
import PreviousSemester from "./Pages/PreviosSemster/PreviosSemster.jsx"; // Corrected import name
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ErrorPage from "./Pages/Errorpage/ErrorPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/publications" element={<Publications />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/current" element={<CurrentSemester />} />
        <Route path="/previous" element={<PreviousSemester />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
