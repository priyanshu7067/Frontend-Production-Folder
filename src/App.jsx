import { useState } from "react";
import HomeSection from "./website/HomeSection";
import Navigation from "./navigations/Navigation";
import { useAuth } from "./context/AuthContext";
import PageLoader from "./components/global/PageLoader";
function App() {
  const { loading } = useAuth();
  return (
    <>
    {loading && <PageLoader />}
      <Navigation />
    </>
  );
}

export default App;
