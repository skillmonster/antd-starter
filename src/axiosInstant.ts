import axios, { AxiosRequestConfig } from 'axios';
import { history } from './config/configureStore';
import LocalStorageService from './LocalStorageService';
export const axiosInstant = axios;
let isRefreshing = false;
const endpoint = process.env.REACT_APP_API_ENDPOINT;
let failedQueue: any = [];
const processQueue = (error: Error, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};
axiosInstant.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = LocalStorageService.getAccessToken();
    // config.url = `${config.url}`;
    if (!isRefreshing) {
      config.url = `${endpoint}${config.url}`;
    }
    if (config.headers) {
      config.headers['cache-control'] = 'no-store';
      config.headers['Pragma'] = 'no-cache';

      const originalRequest = config;
      if (token && originalRequest.url !== `${endpoint}/login`) {
        config.headers['Content-Type'] = 'application/json';
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
axiosInstant.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (error.response !== undefined) {
      switch (error.response.status) {
        case 401:
          if (originalRequest.url === `${endpoint}/refresh-token`) {
            window.location.replace(`${endpoint}/login`);
            return Promise.reject(error);
          }
          if (!originalRequest._retry) {
            if (isRefreshing) {
              return new Promise(function (resolve, reject) {
                failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  originalRequest.headers['Authorization'] = 'Bearer ' + token;
                  return axios(originalRequest);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            return new Promise(function (resolve, reject) {
              axios
                .post(`${endpoint}/refresh-token`, {
                  refresh_token: LocalStorageService.getRefreshToken(),
                })
                .then(({ data }) => {
                  window.localStorage.setItem(
                    'access_token',
                    data.access_token
                  );
                  window.localStorage.setItem(
                    'refresh_token',
                    data.refresh_token
                  );
                  axios.defaults.headers.common['Authorization'] =
                    'Bearer ' + data.access_token;
                  originalRequest.headers['Authorization'] =
                    'Bearer ' + data.access_token;
                  processQueue(error, data.token);
                  resolve(axios(originalRequest));
                })
                .catch((err) => {
                  processQueue(err, null);
                  reject(err);
                  history.push('/login');
                })
                .then(() => {
                  isRefreshing = false;
                });
            });
          }
          break;
        default:
          break;
      }
    } else {
      history.push('/login');
    }
    return Promise.reject(error);
  }
);
