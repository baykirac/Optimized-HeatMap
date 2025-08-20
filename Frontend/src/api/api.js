import axios from "axios";

const ax = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const api = {
  get: async function (path, params = {}) {
    try {
      const response = await ax.get(path, {
        params,
      });
      return parseApiResponse(response);
    } catch (e) {
      console.error(e);
      return {
        isSuccess: false,
        message: "Bilinmeyen bir hata oluştu!",
      };
    }
  },
  postParam: async function (path, params = {}) {
    try {
      const response = await ax.post(path, null, {
        params,
      });
      return parseApiResponse(response);
    } catch (e) {
      console.error(e);
      return {
        isSuccess: false,
        message: "Bilinmeyen bir hata oluştu!",
      };
    }
  },
  postBody: async function (path, body = {}) {
    try {
      const response = await ax.post(path, body);
      return parseApiResponse(response);
    } catch (e) {
      console.error(e);
      return {
        isSuccess: false,
        message: "Bilinmeyen bir hata oluştu!",
      };
    }
  },
};

function parseApiResponse(response) {
  const success = response.data.success;
  const message = response.data.message;
  const data = response.data.body;

  return {
    success,
    message,
    data
  };
}

export default api;
