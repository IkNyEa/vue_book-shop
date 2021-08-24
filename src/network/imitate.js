import axios from 'axios';

export function request() {
    const instance = axios.create({
        baseURL: 'http://api.shop.eduwork.cn',
        timeout: 5000,

    });

    instanceaxios.interceptors.request.use(config => {
        // Do something before request is sent
        return config;
    }, error => {
        // Do something with request error
        return Promise.reject(error);
    });

    instance.interceptors.response.use(config => {
        return config;

    }, error => {

    })


}