import { IAxiosReqConfig } from "./type";

export interface IInterceptorsManageHanlder<T> {
  fulfilled: (config: T) => any;
  rejected: (error: any) => any;
}

export class InterceptorsManage<T = any> {
  hanlders: IInterceptorsManageHanlder<T>[] = [];

  use(
    fulfilled: IInterceptorsManageHanlder<T>["fulfilled"],
    rejected: IInterceptorsManageHanlder<T>["rejected"]
  ) {
    this.hanlders.push({
      fulfilled,
      rejected,
    });
  }
}
