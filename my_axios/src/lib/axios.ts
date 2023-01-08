import { bindMethods } from "./bindMethods";
import defaults from "./defaults";
import { InterceptorsManage } from "./InterceptorsManage";
import sattle from "./sattle";
import { IAxiosReqConfig, IAxiosIns, IAxiosConfig } from "./type";
import { extend } from "./utils";

export class Axios {
  interceptors: {
    request: InterceptorsManage;
    response: InterceptorsManage;
  };

  defaultConfig: IAxiosConfig;

  constructor(instanceConfig: IAxiosConfig) {
    this.defaultConfig = instanceConfig;
    this.interceptors = {
      request: new InterceptorsManage(),
      response: new InterceptorsManage(),
    };
  }

  request(config: IAxiosReqConfig) {
    config = { ...this.defaultConfig, ...config };
    const chain = [this.sendAjax.bind(this), undefined];

    this.interceptors.request.hanlders.forEach((interceptor) => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.hanlders.forEach((interceptor) => {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  sendAjax(config: IAxiosReqConfig) {
    return new Promise((resolve, reject) => {
      const { url, method = "GET", data = null } = config;
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        const response = {
          data: xhr.response,
          status: xhr.status,
          statusText: xhr.statusText,
          config,
        };
        sattle(resolve, reject, response);
      };

      xhr.onerror = function () {
        reject(xhr);
      };

      xhr.send(data);
    });
  }
}

// 将get、post等方法绑定到Axios.prototype上
bindMethods(Axios);

function createAxios(defaults: IAxiosConfig) {
  const context = new Axios(defaults);
  console.log(context);

  const instance: IAxiosIns = Axios.prototype.request.bind(context);

  // 混入Axios.prototype上的方法
  extend(instance, Axios.prototype, context);

  extend(instance, context);

  return instance;
}

export default createAxios(defaults);
