// plugins/axios.js
import axios from 'axios';
import store from '@/store'; // 如果你用 Vuex 管理 token
import { Message } from 'element-ui';

// 创建 axios 实例
const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888', // ✅ 后端统一前缀，如 http://localhost:8080/api
    timeout: 10000,  // ⏱️ 请求超时时间，单位 ms
    headers: {
        'Content-Type': 'application/json'
    },
    xsrfCookieName: '',
    xsrfHeaderName: '',
});


// 请求拦截器
instance.interceptors.request.use(
    config => {
        const userInfo = store.state.currentUser; // 假设 token 保存在 Vuex 中
        if (userInfo) {
            config.headers['x-user-name'] = encodeURIComponent(userInfo.name); // ✅ 避免中文直接作为 header
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if(response.data.code === 1){
            // 可以在此统一处理后端返回的数据结构 直接返回 data 字段
            // Message.success('请求成功');
            return response.data.data;
        }else{
            console.log("响应拦截器: 接口报错:", response.data)
            Message.error(response.data.msg || '接口响应失败');
            return Promise.reject(response.data); // 返回失败原因
        }
    },
    error => {
        console.error("请求出错了: ", error.response);
        if (error.response) {
            Message.error(error.response.data.message || '请求失败');
        } else {
            Message.error('网络异常或服务器无响应');
        }
        return Promise.reject(error);
    }
);


export default {
    install(Vue) {
        Vue.prototype.$http = instance; // 🔄 挂载配置好的 axios 实例
    }
};