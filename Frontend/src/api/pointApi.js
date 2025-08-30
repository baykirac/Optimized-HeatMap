import api from "./api";

const pointApi = {
    GetAllPoints: async () => await api.get("HeatMap/GetAll")
}

export default pointApi;