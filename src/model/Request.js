import axios from "axios";
import { SERVER_URL } from "../config";

export function FetchPostWithoutAuth(url, data, config) {
  return axios.post(`${SERVER_URL}${url}`, data, {
    ...config,
  });
}
export function FetchPost({ isProfessor, url, data, config }) {
  return axios.post(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      Authorization: localStorage[isProfessor ? "professor" : "student"],
    },
  });
}

export function FetchGet({ isProfessor, url, config }) {
  return axios.get(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      Authorization: localStorage[isProfessor ? "professor" : "student"],
    },
  });
}

export function FetchPut({ isProfessor, url, data, config }) {
  return axios.put(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      Authorization: localStorage[isProfessor ? "professor" : "student"],
    },
  });
}

export function FetchDelete({ isProfessor, url, config }) {
  return axios.delete(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      Authorization: localStorage[isProfessor ? "professor" : "student"],
    },
  });
}

export default Request;
