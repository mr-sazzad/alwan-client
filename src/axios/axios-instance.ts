import axios from "axios";
import { getFromLocalStorage } from "../helpers/local-storage";
import { IErrorResponse, IResponse, KEY } from "../types";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 50000;

instance.interceptors.request.use(
  function (config) {
    const token = getFromLocalStorage(KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    };
    return responseObject;
  },

  function (error) {
    const responseObject: IErrorResponse = {
      data: {
        statusCode: error?.response?.status,
        success: error?.response?.data?.success,
        message: error?.response?.data?.message,
        errorMessages: error?.response?.data?.errorMessages,
      },
    };
    return responseObject;
  }
);
