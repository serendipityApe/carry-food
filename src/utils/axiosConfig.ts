import axios from 'axios'

axios.defaults.timeout = 30000;

/**
 * http request 拦截器
 */
 axios.interceptors.request.use(
    (config) => {
      config.data = JSON.stringify(config.data);
      config.headers = {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('access_token')
      };
      return config;
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