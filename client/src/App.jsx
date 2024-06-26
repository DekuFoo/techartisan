import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import MainPage from "./pages/MainPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Services from "./pages/Services.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalAuth from "./components/ModalAuth";
import { AuthContext } from "./context/AuthContext";
import style from "./styles/app.module.css";
import Confidencity from "./pages/Confidencity.jsx";
import Politicy from "./pages/Politicy.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoading } = useContext(AuthContext);
  const location = useLocation();
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const routesWithHeaderFooter = [
    "/main",
    "/services",
    "/aboutus",
    "/confidencity",
    "/politicy",
  ];
  return (
    <>
      {isLoading ? (
        <div className={style.loader_container}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <>
          <ModalAuth isOpen={isOpen} onClose={handleModalClose} />
          {routesWithHeaderFooter.includes(location.pathname) && (
            <Header setIsOpen={setIsOpen} />
          )}
          <Routes>
            <Route path="/main" element={<MainPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/confidencity" element={<Confidencity />} />
            <Route path="/politicy" element={<Politicy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {routesWithHeaderFooter.includes(location.pathname) && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
