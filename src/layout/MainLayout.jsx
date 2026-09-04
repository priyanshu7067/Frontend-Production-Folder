import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WalletModal from "../components/ui/WalletModal";
import { AuthRoutes } from "../constants/routes";

const MainLayout = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate(AuthRoutes.LOGIN);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between">
      <Header onLoginClick={handleLoginClick} />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />

      <WalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
      />
    </div>
  );
};

export default MainLayout;