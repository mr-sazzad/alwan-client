import { getFromLocalStorage } from "@/helpers/local-storage";
import { IErrorResponse, IResponse, KEY } from "@/types";
import axios from "axios";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 50000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // set accessToken to headers before request is sent
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

// Add a response interceptor

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
