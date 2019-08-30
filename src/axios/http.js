/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
// vant的toast提示框组件，大家可根据自己的ui组件更改。
import { Message } from 'element-ui';
import httpInit from './httpInit';
import { showLoading, hideLoading } from '../assets/loading';
import store from '../store/index'
import { log } from 'util';



/*aes加密接口 返回url*/
// var httpUrl = httpInit.initHttp();
var baseURL = '';
// httpUrl.then((res) => {
//   // baseURL = res;
//   // console.log(res);
  
// }, (err) => {
//   console.log(err)
// })
// console.log(window.location.host);

// 环境的切换
if (process.env.NODE_ENV == 'development') {    
    axios.defaults.baseURL = process.env.API_ROOT + '/Api/';
    baseURL = axios.defaults.baseURL;
} else if (process.env.NODE_ENV == 'production') {    
    axios.defaults.baseURL = '' + 'Api/';
    baseURL = axios.defaults.baseURL;
}


// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    if (!config.data.includes('versionName')) {
      config.headers.Accept = 'application/x.LegendAgent.MemberAppV001+json';
    }
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = localStorage.getItem("token");
    token && (config.headers.Authorization = 'Bearer ' + token);

    showLoading();
    return config;
  },
  error => {
    return Promise.error(error);
  })

// 响应拦截器
axios.interceptors.response.use(data => {
  const code = data.data.code;
  if (code == 1001) { //未登录
    // this.$store.commit("lmodelShow", true);
    Message.error('未登录')
  } else if (code == 1003) {
    Message.error(Object.values(data.data.message)[0]);
  } else if (code == 1) {
    Message.error(data.data.message);
  }
  hideLoading();
  return Promise.resolve(data);
}, error => {
  
  hideLoading();
  Message.error({
    message: '网络不给力,请稍后再试'
  })
  return Promise.reject(error)
})

/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

export { baseURL }
