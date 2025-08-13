import ReactDOM from "react-dom/client";
import MyProvider from "./context/MyProvider.jsx";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <MyProvider>
      <App />
    </MyProvider>
  </Provider>
);
