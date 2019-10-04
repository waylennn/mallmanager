import axios from 'axios'

const HttpServer  = {}

HttpServer.install = (Vue) => {
    axios.defaults.baseURL = 'http://39.108.193.251:8888/api/private/v1/'
    const AUTH_TOKEN = localStorage.getItem('token')
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    Vue.prototype.$http = axios
}
export default HttpServer