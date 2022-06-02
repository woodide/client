import axios from "axios";
import { SERVER_URL } from "../config";

export function FetchPost(url, data, config) {
  return axios.post(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      Authorization: localStorage["loginData"],
    },
  });
}

export function FetchGet(url, config) {
  return axios.get(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      Authorization: localStorage["loginData"],
    },
  });
}

export function FetchPut(url, data, config) {
  return axios.put(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      Authorization: localStorage["loginData"],
    },
  });
}

export function FetchDelete(url, config) {
  return axios.delete(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      Authorization: localStorage["loginData"],
    },
  });
}

export default Request;
