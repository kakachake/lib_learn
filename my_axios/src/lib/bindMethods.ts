import { Axios } from "./axios";

const methodArr = ["get", "post", "put", "delete", "patch", "head", "options"];

export function bindMethods(AxiosClass: typeof Axios) {
  methodArr.forEach((method) => {
    AxiosClass.prototype[method] = function (
      url: string,
      options:
        | {
            params?: Record<string, any>;
          }
        | any = {}
    ) {
      if (["get", "delete", "head", "options"].includes(method)) {
        const { params } = options;
        let data = "";
        if (params) {
          data =
            "?" +
            Object.entries(params)
              .reduce((str, [key, value]) => {
                return str + `${key}=${value}&`;
              }, "")
              .slice(0, -1);
        }
        return this.request({
          method,
          url: url + data,
        });
      } else {
        return this.request({
          method,
          url,
          data: options,
        });
      }
    };
  });
}
