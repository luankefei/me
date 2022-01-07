export interface IClientParams {
  params?: any
  data?: any
  form?: any
}

export interface IClient {
  get: (url: string, params?: IClientParams) => Promise<any>
  post: (url: string, data: IClientParams) => Promise<any>
  del: (url: string, params: IClientParams) => Promise<any>
  put: (url: string, params: IClientParams) => Promise<any>
  patch: (url: string, params: IClientParams) => Promise<any>
}
