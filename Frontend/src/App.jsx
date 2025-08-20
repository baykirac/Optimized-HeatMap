import { useContext } from "react";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import Loading from "./components/ui/loading";
import Context from "./context/Context";
import "./App.css";

function App() {
  const { isPageLoading } = useContext(Context);

  return (
    <div>
      <Navbar />
      <MapComponent />
      {isPageLoading && <Loading />}
    </div>
  );
}

export default App;
