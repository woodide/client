import axios from "axios";
import { SERVER_URL } from "../config";


const getAuth = (isProfessor) => JSON.parse(localStorage[isProfessor ? "professor" : "student"]).token;

export function FetchPostWithoutAuth(url, data, config) {
  return axios.post(`${SERVER_URL}${url}`, data, {
    ...config,
  });
}
export function FetchPost({ isProfessor, url, data, config }) {
  return axios.post(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: getAuth(isProfessor),
    },
  });
}

export function FetchGet({ isProfessor, url, config }) {
  return axios.get(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: getAuth(isProfessor),
    },
  });
}

export function FetchPut({ isProfessor, url, data, config }) {
  return axios.put(`${SERVER_URL}${url}`, data, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: getAuth(isProfessor),
    },
  });
}

export function FetchDelete({ isProfessor, url, config }) {
  return axios.delete(`${SERVER_URL}${url}`, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: getAuth(isProfessor),
    },
  });
}

export default Request;
