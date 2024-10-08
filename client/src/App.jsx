import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import MainPage from "./pages/MainPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ChangePass from "./pages/ForgotPassPage.jsx";
import Services from "./pages/AllServicesPage.jsx";
import AboutUs from "./pages/AboutUsPage.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ModalAuth from "./components/ModalAuth/ModalAuth.jsx";
import { AuthContext } from "./context/AuthContext";
import style from "./styles/app.module.css";
import Confidencity from "./pages/ConfidencityPage.jsx";
import Politicy from "./pages/PoliticyPage.jsx";
import { SnackbarProvider } from "notistack";
import AccountPage from "./pages/AccountPage.jsx";
import SupportPage from "./pages/SupportPage.jsx";
import ClientServicePage from "./pages/ClientServicesPage/ClientServicePage.jsx";
import ServiceCardModal from "./components/ServiceCardModal.jsx";
import AdminPanel from "./pages/AdminPanelPage.jsx";
import OrderCallPopUp from "./components/OrderCallPopUp.jsx";
import axios from "axios";
function App() {
  const [isOpen, setIsOpen] = useState(false); //ModalAuth
  const { isLoading } = useContext(AuthContext);
  const location = useLocation();
  const handleModalClose = () => {
    setIsOpen(false);
  };

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false); // ServiceModal
  const handleServiceModalClose = () => {
    setIsServiceModalOpen(false);
  };

  const [isOrderCallPopUpOpen, setIsOrderCallPopUpOpen] = useState(false); // OrderACallModal
  const handleOrderCallPopUpClose = () => {
    setIsOrderCallPopUpOpen(false);
  };

  const routesWithHeaderFooter = [
    "/",
    "/services",
    "/aboutus",
    "/confidencity",
    "/politicy",
    "/account/password",
  ];

  return (
    <>
      <SnackbarProvider />
      {isLoading ? (
        <div className={style.loader_container}>
          <div className={style.spinner}></div>
        </div>
      ) : (
        <>
          <ModalAuth isOpen={isOpen} onClose={handleModalClose} />

          <OrderCallPopUp
            isOpen={isOrderCallPopUpOpen}
            onClose={handleOrderCallPopUpClose}
          />

          <ServiceCardModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClose={handleServiceModalClose}
            isServiceModalOpen={isServiceModalOpen}
          />

          {routesWithHeaderFooter.includes(location.pathname) && (
            <Header setIsOpen={setIsOpen} />
          )}
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  setIsServiceModalOpen={setIsServiceModalOpen}
                  setIsOpen={setIsOpen}
                  setIsOrderCallPopUpOpen={setIsOrderCallPopUpOpen}
                />
              }
            />
            <Route
              path="/services"
              element={
                <Services
                  setIsServiceModalOpen={setIsServiceModalOpen}
                  setIsOpen={setIsOpen}
                />
              }
            />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/confidencity" element={<Confidencity />} />
            <Route path="/politicy" element={<Politicy />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/account/password" element={<ChangePass />} />
            <Route path="/my/services" element={<ClientServicePage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
          {routesWithHeaderFooter.includes(location.pathname) && <Footer />}
        </>
      )}
    </>
  );
}

export default App;
