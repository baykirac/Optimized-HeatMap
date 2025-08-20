import React, { useContext, useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat } from "ol/proj";
import Context from "../context/Context";
import baseLayersListData from "../../public/baseLists";

const MapComponent = () => {
  const mapRef = useRef();
  const mapInstance = useRef(null);

  const {setMap, selectedLayer, setSelectedLayer} = useContext(Context);

  const extentTurkey = [
    fromLonLat([25.7, 35.8])[0],
    fromLonLat([25.7, 35.8])[1],
    fromLonLat([44.0, 42.1])[0],
    fromLonLat([44.0, 42.1])[1],
  ];

  useEffect(() => {
    const layer = baseLayersListData[selectedLayer];
    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [layer],
      view: new View({
        center: fromLonLat([35.2433, 38.9637]),
        zoom: 1,
        minZoom: 4,
        maxZoom: 24,
        extent: extentTurkey,
      }),
    });
    setMap(mapInstance.current);
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;

    Object.entries(baseLayersListData).forEach(([key, layer]) => {
      const visible = key === selectedLayer;
      layer.setVisible(visible);

      if (
        visible &&
        !mapInstance.current.getLayers().getArray().includes(layer)
      ) {
        mapInstance.current.addLayer(layer);
      }

      if (
        !visible &&
        mapInstance.current.getLayers().getArray().includes(layer)
      ) {
        mapInstance.current.removeLayer(layer);
      }
    });
  }, [selectedLayer]);

  return (
    <div>
      <div ref={mapRef} style={{ width: "100%", height: "95vh" }}></div>

    </div>
  );
};

export default MapComponent;
