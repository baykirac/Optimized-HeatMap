import api from "./api";

const bogusApi = {
    GenerateFakePointData: async (count) => await api.postParam("BogusDataCreater/GenerateFakePointData",{count})
}

export default bogusApi;