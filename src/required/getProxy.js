// 该文件存放项目的所有请求
import getMsg from "./index.js"
// 默认地址
let pathUrl = "/api"


// Proxy组件获取代理用户数据
export const getProxy = ()=> getMsg("get",pathUrl + "/web/proxy",)
// Proxy组件设置代理用户比例分成
export const setDivide = (value)=> getMsg("post",pathUrl + "/web/divide",value)

//获取分页数据
export const getProxyPage = (value)=>getMsg("get",pathUrl + "/web/page",value)

//proxy组件搜索
export const searchProxy = (value)=>getMsg("post",pathUrl + "/web/search",value)