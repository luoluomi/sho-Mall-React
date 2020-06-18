import axios from "axios";
import { toastr } from "react-redux-toastr";
import { notice } from "@/components/Notification/normal";
import { normal, antdNotice } from 'components/Notification';
//import LoginUser from "service/login-service/LoginUser";

// Promise.polyfill();

const Axios = axios.create();
//const _loginUser = new LoginUser();

Axios.defaults.timeout = 5000;
Axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

Axios.interceptors.request.use(
  (config) => {
    if (config.data && config.data.$skipAuthHandler) {
      config.$skipAuthHandler = true;
      delete config.data.$skipAuthHandler;
    }
    if (config.params && config.params.$skipAuthHandler) {
      config.$skipAuthHandler = true;
      delete config.params.$skipAuthHandler;
    }
    //config.headers.Authorization = _loginUser.getAuthorization();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    if(response.data.code==200){
      return response.data;
    }else{
      // toastr.err(response.data.msg)
      // notice.error(response.data.msg);
      normal.error(response.data.msg)
    }
    
  },
  (error) => {
    const err = error.response;
    if (err.status === 401 && !!err.config && !err.config.$skipAuthHandler) {
      //_loginUser.clear();
      // window.location = "/unauthorization";
      normal.error(response)
    }
    normal.error(err.data.message)
    // notice.error(err.data.message)
    return Promise.reject(error);
  }
);

export default Axios;
