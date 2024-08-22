import { getFromLocalStorage } from "@/helpers/local-storage";
import { IResponse, KEY } from "@/types";
import axios from "axios";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 50000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(KEY);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: IResponse = {
      data: response?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    return error.response;
  }
);
