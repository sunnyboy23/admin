//该文件存放项目的所有请求
import getMsg from "./index.js"

let pathUrl = "/api"


//login组件登录请求
export const setLogin = (values)=> getMsg("post",pathUrl + "/root/login",values)

//Home组件设置免登录
export const session = ()=>getMsg("get",pathUrl + "/root/session")


//person设置账号修改
export const changeUser = (values)=>getMsg("post",pathUrl + "/root/change",values)


//提交角色管理信息
export const setRoteInfo = (values)=>getMsg("post",pathUrl + "/root/rote",values)

//获取角色权限数据
export const getRoteInfo = ()=>getMsg("get",pathUrl + "/root/info")

//删除角色权限
export const removeRote = (values)=>getMsg("post",pathUrl + "/root/remove",values)

//修改角色权限
export const changeRote = (values)=>getMsg("post",pathUrl + "/root/roteChange",values)

//创建用户
export const setManage = (values)=>getMsg("post",pathUrl + "/root/manage",values)

//获取用户数据
export const getManageInfo = ()=>getMsg("post",pathUrl + "/root/manageInfo")

//删除用户数据
export const removeManageInfo = (values)=>getMsg("post",pathUrl + "/root/removeInfo",values)

//修改用户数据
export const changeManageInfo = (values)=>getMsg("post",pathUrl + "/root/changeInfo",values)

//搜索用户数据
export const searchInfo = (values)=>getMsg("post",pathUrl + "/root/searchInfo",values)

//获取分页数据
export const getPage = (values)=>getMsg("get",pathUrl + "/root/page",values)

//添加会员
export const addMember = (values)=>getMsg("post",pathUrl + "/root/member",values)

//获取会员信息
export const getMemberData = ()=>getMsg("get",pathUrl + "/root/data")

//修改账号状态
export const changeStatus = (values)=>getMsg("post",pathUrl + "/root/status",values)

//修改代理状态
export const changeProxy = (values)=>getMsg("post",pathUrl + "/root/proxy",values)

//会员分页
export const vipPage = (values)=>getMsg("get",pathUrl + "/root/vipPage",values)

//搜索会员
export const searchVip = (values)=>getMsg("post",pathUrl + "/root/searchVip",values)

//删除会员
export const removeVip = (values)=>getMsg("post",pathUrl + "/root/removeVip",values)

//编辑会员信息
export const setVip = (values)=>getMsg("post",pathUrl + "/root/setVip",values)

// Mamberlist组件下载所有会员信息
export const installMamber = ()=> getMsg("get",pathUrl + "/root/int")