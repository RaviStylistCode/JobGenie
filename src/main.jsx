import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./components/theme-provider";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor=persistStore(store);

export const apiserver=import.meta.env.VITE_apiserver;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
          <Toaster />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
