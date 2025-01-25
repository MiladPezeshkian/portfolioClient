import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Research from "./Pages/Research/Research";
import Announcements from "./Pages/Anno/Announcements";
import Publications from "./Pages/publication/Publications";
import Contact from "./Pages/contact/Contact";
import CurrentSemester from "./Pages/CurrentSemester/CurrentSemester";
import PreviousSemester from "./Pages/PreviosSemster/PreviosSemster"; // Corrected import name
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./Pages/Errorpage/ErrorPage";

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
