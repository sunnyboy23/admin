import { Layout, Menu } from 'antd';
import { proxySilder } from "@/hook/data.js"
import { Outlet, useLocation, useNavigate } from "react-router-dom"


const { Sider } = Layout;

export default function Proxy() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location);
    // 顶部菜单跳转路由
    const select = (item) => {
        navigate(item.key)
    }
    return (
        <div style={{ display: "flex" ,width:"100%",height:"100vh" ,position:'relative',left:-24,top:-24}}>
            <Sider width={200} style={{ backgroundColor: "#fff" }}>
                <Menu theme="dark" style={{height:"100%"}} mode="inline" items={proxySilder} selectedKeys={location.pathname} onSelect={select}  />
            </Sider>
            <div style={{width:"100%",padding:24}}>
                <Outlet ></Outlet>
            </div>
        </div>
    )
}