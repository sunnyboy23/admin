import { message } from "antd";
import axios from "axios";



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let token = localStorage.getItem("EXKGLQ_QWEQDF")
    //如果token存在则赋值，否则不执行
    token && (config.headers["authorization"] = token)
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

async function byAxiosData(type,url,value){
    let {data}= await axios({
                    method:type,
                    url:url,
                    params:type === "get" ? value : null,
                    data: type === "get" ? null : value,
                })
                // eslint-disable-next-line
                switch(data.code){
                    case 0:
                        message.error(data.value,1)
                        break;
                    case 1:
                        message.success(data.value,1)
                }

    return data
}



export default byAxiosData