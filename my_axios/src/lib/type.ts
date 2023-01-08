import {
  IInterceptorsManageHanlder,
  InterceptorsManage,
} from "./InterceptorsManage";

export type IAxiosConfig = Omit<IAxiosReqConfig, "url" | "method" | "data">;

export interface IAxiosReqConfig {
  url: string;
  method:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "HEAD"
    | "OPTIONS"
    | "get"
    | "post"
    | "put"
    | "delete"
    | "patch"
    | "head"
    | "options";
  data?: any;
  validateStatus?: (status: number) => boolean;
}

export interface IAxiosIns {
  (config: IAxiosReqConfig): Promise<any>;
  get(url: string, data?: any): Promise<any>;
  post(url: string, data?: any): Promise<any>;
  put(url: string, data?: any): Promise<any>;
  delete(url: string, data?: any): Promise<any>;
  patch(url: string, data?: any): Promise<any>;
  head(url: string, data?: any): Promise<any>;
  options(url: string, data?: any): Promise<any>;
  interceptors: {
    request: InterceptorsManage;
    response: InterceptorsManage;
  };
}
