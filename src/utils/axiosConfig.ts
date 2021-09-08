import axios from 'axios'

axios.defaults.timeout = 30000;
const tokenUrl = "http://localhost:8081"

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    if (config.url?.indexOf(tokenUrl) !== -1) {
      config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('access_token')
      };
      return config;
    } else {
      config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json",
      };
      return config;
    }

  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    if (response.data.errCode === 2) {
      console.log("过期");
    }
    return response;
  },
  (error) => {
    console.log("请求出错：", error);
  }
);

export default axios