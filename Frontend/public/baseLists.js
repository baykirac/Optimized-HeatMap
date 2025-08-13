import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";

const baseLayersListData = {
  osm: new TileLayer({
    source: new OSM(),
    visible: true,
    title: "OSM",
  }),
  satellite: new TileLayer({
    source: new XYZ({
      url:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    }),
    visible: false,
    title: "Satellite",
  }),
  cartoLight: new TileLayer({
    source: new XYZ({
      url:
        "https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "CartoDB Light",
  }),
  cartoDark: new TileLayer({
    source: new XYZ({
      url:
        "https://cartodb-basemaps-{a-d}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "CartoDB Dark",
  }),
};

export default baseLayersListData;