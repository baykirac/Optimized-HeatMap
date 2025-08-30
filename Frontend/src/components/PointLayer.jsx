import React, { useState, useId, useEffect, useContext } from "react";
import Context from "@/context/Context";
import { Switch, SwitchLabel } from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import pointApi from "@/api/pointApi";
import { Style, Circle as CircleStyle, Fill, Stroke } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
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
      debugger;
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
            vectorSource.addFeature(feature);
          });

          const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
              image: new CircleStyle({
                radius: 4,
                fill: new Fill({ color: "blue" }),
                stroke: new Stroke({ color: "white", width: 2 }),
              }),
            }),
          });
          setPointLayer(vectorLayer);
          setPointCount(response.data.length);
          map.addLayer(vectorLayer);
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
