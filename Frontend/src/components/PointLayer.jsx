import React, { useState, useId, useEffect, useContext } from "react";
import Context from "@/context/Context";
import { Switch, SwitchLabel } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import pointApi from "@/api/pointApi";
import { Heatmap as HeatmapLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import WKT from "ol/format/WKT";

const PointLayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pointLayer, setPointLayer] = useState();
  const [pointCount, setPointCount] = useState(0);

  const { map } = useContext(Context);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const fetchPoints = async () => {
    await pointApi.GetAllPoints().then((response) => {
      if (response.success) {
        setPointCount(response.data.length);
        if (response.data.length != pointCount) {
          const points = response.data;
          const wkt = new WKT();
          const vectorSource = new VectorSource();

          points.forEach((point) => {
            const feature = wkt.readFeature(point.geolocWkt, {
              dataProjection: "EPSG:4326",
              featureProjection: "EPSG:3857",
            });
            feature.set("weight", 0.1);
            vectorSource.addFeature(feature);
          });

          const heatmapLayer = new HeatmapLayer({
            source: vectorSource,
            blur: 15,
            radius: 8,
            weight: (feature) => feature.get("weight"),
          });

          setPointLayer(heatmapLayer);
          setPointCount(response.data.length);
          map.addLayer(heatmapLayer);
        } else if (response.data.length == pointCount) {
          map.addLayer(pointLayer);
        }
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchPoints();
    } else {
      if (pointLayer) {
        map.removeLayer(pointLayer);
      }
    }
  }, [isOpen]);

  return (
    <Tooltip content={isOpen ? "Açık" : "Kapalı"} openDelay={100}>
      <span>
        {" "}
        <Switch.Root colorPalette="green" size="md" onCheckedChange={toggle}>
          <SwitchLabel color="white">Point Katmanını Getir</SwitchLabel>
          <Switch.HiddenInput onchecked />
          <Switch.Control />
        </Switch.Root>
      </span>
    </Tooltip>
  );
};

export default PointLayer;
