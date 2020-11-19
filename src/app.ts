import { RequestConfig } from 'umi';
if(process.env.NODE_ENV==='development'){
  window.baseUrl='http://127.0.0.1:7001/api';
}else{
  window.baseUrl='https://zhouyanli.lxzyl.cn/api';
}
export const request: RequestConfig = {
  timeout: 1000,
  errorConfig: {},
  middlewares: [],
  requestInterceptors: [],
  responseInterceptors: [],
  
};