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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <CacheProvider value={muiCache}> */}
      {/* <QueryClientProvider client={queryClient}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* 🔥 Devtools */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </QueryClientProvider> */}
    {/* </CacheProvider> */}
  </StrictMode>
);