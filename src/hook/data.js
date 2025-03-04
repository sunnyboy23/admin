// import React from 'react';
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

//顶部导航
export const navArr = [
    { key: "/home/child", label: `首页`, title: "首页" },
    { key: "/home/root", label: `后台管理员`, title: "后台管理员" },
    { key: "/home/member", label: `会员`, title: "会员" },
    { key: "/home/proxy/child", label: `用户代理`, title: "用户代理" },
  ]

  // proxy代理侧边
export const proxySilder = [
  { key: "/home/proxy/child", label: `代理列表`,    title:"代理列表" },
  { key: "/home/proxy/cash", label: `提现管理`,    title:"提现记录" },
]

export const navArrData = [
  { key: "/home/child", label: `首页`,    title:"首页" },
  { key: "/home/root", label: `后台管理员`,    title:"后台管理员" },
  { key: "/home/member", label: `会员`, title:"会员"},
  { key: "/home/proxy", label: `用户代理`,title:"用户代理",
  children:proxySilder
  },
]

  //侧边导航
// export const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//     const key = String(index + 1);
//     return {
//         key: `sub${key}`,
//         icon: React.createElement(icon),
//         label: `subnav ${key}`,
//         children: new Array(4).fill(null).map((_, j) => {
//             const subKey = index * 4 + j + 1;
//             return {
//                 key: subKey,
//                 label: `option${subKey}`,
//             };
//         }),
//     };
// });



// 验证规则
export const rule = {
    userName: [{ required: true, message: "任意字母数字3-12", pattern: /^[a-zA-Z0-9]{3,12}/ }],
    userNick: [{ required: true, message: "任意字母数字中文3-10", pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,10}/ }],
    userEmail: [{ required: true, message: "未填写正确", pattern: /^[a-zA-Z0-9]{1,11}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}$/ }],
    userPass: [{ required: true, message: "6-18位数字", pattern: /^[0-9]{6,18}$/ }],
    userPhone: [{
      required: true, message: "手机号码不正确",
      pattern: /^1((34[0-8])|(8\d{2})|(5([0-3]|[5-9])) |(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/
    }]
  };

  //格式化时间
 
export const ruleDate = (data)=>{
  data.forEach(item => {
    let val = item.loginData.split("T")
        item.loginData = val[0]
  });
  
}

export const ruleDate2 = (data)=>{
   let val = data.loginData.split("T")
   data.loginData = val[0]
  
}

  