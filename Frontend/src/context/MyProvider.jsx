import { useState } from "react";
import Context from "./Context";

const MyProvider = ({ children  }) => {
  const [map, setMap] = useState();
  const [selectedLayer, setSelectedLayer] = useState("osm");

  const value = {
    map,
    setMap,
    selectedLayer,
    setSelectedLayer
  };
  
  return <Context.Provider value={value}>{children }</Context.Provider>;
};

export default MyProvider;
