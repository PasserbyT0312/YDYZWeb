/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import CryptoJS from 'crypto-js'
import store from '../store/index';
let Base64 = require('js-base64').Base64;
var getHttp = [
    'http://config.w20.vip/api/getList',
    'http://config100.w20.vip/api/getList',
    'http://config1016.w20.vip/api/getList'
]
var apiUrl = '';
var agentInfos = "eyJpdiI6IlJTYlQrWkhZemlLMGpCVGdWanNoU2c9PSIsInZhbHVlIjoiS1dYWlE5T2x0eWNwRXVmdDJcL05WQ1wvU2Q2a1JHYVZDYnFsVXV1WXd4Z1FjPSIsIm1hYyI6IjU1YTkyMmUzZTRkZTRhN2QxNjcyYjE2ZjYyMTAxNGIyODJhYjMzMGUyYzZiYjNkNzg2MzJjZThkZWE2YzBkZjUifQ==";
// 加密
var encrypt = function (word, keyStr) {
    keyStr = keyStr ? keyStr : 'fF7Z9hMXOyBokRUw';
    var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.toString();
}
//解密
var decrypt = function (word, keyStr) {
    keyStr = keyStr ? keyStr : 'fF7Z9hMXOyBokRUw';
    var key = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
    var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
}
var initHttp =function() {
    var timestamps = Math.round(new Date().getTime() / 1000);
    var params = {
        timeStamp: timestamps,
        agentInfo: agentInfos,
        versionName: 'MemberV001'
    }
    var i = 0;
    if(i<getHttp.length){
        var paramsAgent = encrypt(JSON.stringify(params));
        return new Promise((resolve) =>{
            axios.post(getHttp[i], {
                data: Base64.encode(paramsAgent)
            }).then(function (response) {
                var paramsDecrypt = decrypt(response.data.data);
                paramsDecrypt = JSON.parse(paramsDecrypt);
                var api = paramsDecrypt.data.api[0];//域名     
                // console.log(api);
                apiUrl = paramsDecrypt.data.api[0];//域名    
                store.commit("httpUrl", apiUrl);
                // console.log(apiUrl);
                resolve(apiUrl);
            }).catch(function (error) {
                i++;
                initHttp();
                console.log(error);
            });
        })
        
    }
    
}
export default {
    initHttp
}