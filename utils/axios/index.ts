import axios, { type InternalAxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios'

const axiosRes = axios.create({
  baseURL: 'https://26890.wu.elitepro.ltd/api',
  headers: {'Content-Type': 'application/json' }
})

axiosRes.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
}, (error: AxiosError) => {
  return Promise.reject(error)
})

axiosRes.interceptors.response.use((response: AxiosResponse) => {
  return response
}, (error: AxiosError) => {
  return Promise.reject(error)
});

export { axiosRes }