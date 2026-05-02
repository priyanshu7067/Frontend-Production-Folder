import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WalletModal from "../components/ui/WalletModal";

const MainLayout = () => {
  const [openWalletModal, setOpenWalletModal] = useState(false);

  return (
    <>
      <Header onLoginClick={() => setOpenWalletModal(true)} />

      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>

      <Footer />

      {/* 🔥 MODAL AT ROOT LEVEL */}
      <WalletModal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(false)}
      />
    </>
  );
};

export default MainLayout;