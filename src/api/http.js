import request from "../utils/request";
import qs from "qs";
const http = {
  get(url, params) {
    const config = {
      method: "get",
      url: url
    };
    if (params) config.params = params;
    return request(config);
  },
  post(url, params) {
    const config = {
      method: "post",
      url: url
    };
    if (params) config.data = params;
    return request(config);
  },
  put(url, params) {
    const config = {
      method: "put",
      url: url
    };
    if (params) config.data = params;
    console.log(config.data);
    return request(config);
  },
  delete(url, params) {
    const config = {
      method: "DELETE",
      url: url
    };
    if (params) config.params = params;
    console.log(params);
    return request(config);
  }
};

export default http;
