import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// ✅ TanStack Query
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// ✅ Devtools (optional but useful)
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// ✅ MUI Cache (Tailwind conflict fix)
import { CacheProvider } from "@emotion/react";
import muiCache from "./lib/muiCache";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  {/* <StrictMode> */}
    {/* <CacheProvider value={muiCache}> */}
    {/* <QueryClientProvider client={queryClient}> */}
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="dark"
          toastClassName="custom-toast"
          bodyClassName="custom-toast-body"
          progressClassName="custom-toast-progress"
        />
        <App />
      </AuthProvider>
    {/* 🔥 Devtools */}
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    {/* </QueryClientProvider> */}
    {/* </CacheProvider> */}
  {/* </StrictMode>, */}
    </BrowserRouter>
);
