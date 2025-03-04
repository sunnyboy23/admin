import { createBrowserRouter } from "react-router-dom";
import React,{ Suspense } from 'react';
const Login = React.lazy(()=> import("../views/login/Login.jsx"))
const Home = React.lazy(()=> import("../views/home/Home.jsx"))
const Person = React.lazy(()=> import("../views/home/person/person.jsx"))
const Child = React.lazy(()=> import("../views/home/child/child.jsx"))
const Root = React.lazy(()=> import("../views/home/root/root.jsx"))
const Member = React.lazy(()=> import("../views/home/member/member.jsx"))
const MemberChange = React.lazy(()=> import("../views/home/member/memberChange.jsx"))
const Proxy = React.lazy(()=> import("../views/home/proxy/proxy.jsx"))
const ProxyChild = React.lazy(() => import('../views/home/proxy/proxyChild/ProxyChild.jsx'))
const ProxyCash = React.lazy(() => import('../views/home/proxy/proxyChild/ProxyCash.jsx'))
///创建路由表
export default createBrowserRouter([
    {
        path:"/",
        element:<Suspense><Login></Login></Suspense>  
    },
    {
        path:"/home",
        element:<Suspense><Home></Home></Suspense> ,
        children:[
            {
                path:"child",
                element:<Suspense><Child></Child></Suspense>
            },
            {
                path:"person",
                element:<Suspense><Person></Person></Suspense>
            },
            {
                path:"root",
                element:<Suspense><Root></Root></Suspense>
            },
            {
                path:"member",
                element:<Suspense><Member></Member></Suspense>
            },
            {
                path:"memberchange",
                element: <Suspense><MemberChange/></Suspense>,
            },
            {
                path:"proxy",
                element: <Suspense><Proxy/></Suspense>,
                children: [
                    {
                        path: "child",
                        element: <Suspense><ProxyChild /></Suspense>,
                    },
                    {
                        path: "cash",
                        element: <Suspense><ProxyCash /></Suspense>,
                    }
                ]
            }
        ]
    }
])