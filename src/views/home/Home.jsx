import { Layout, Menu, Avatar, Popover } from 'antd';
import { session } from "@/required/getMsg.js"
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, } from "react-redux"
import { navArr, } from "@/hook/data.js"
import { Link, Outlet, useNavigate, useLocation } from
    "react-router-dom"
import { useEffect, useMemo, useState } from 'react';
import "../../assets/css/home.scss"
const { Header, Content, } = Layout;






export default function Home() {
    const [initInfo, setInitInfo] = useState({})
    const [data, setData] = useState([])
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(location);
        session().then((data) => {
            if (data.code === 3) {
                console.log(data.data);
                // console.log(data.data.loginRote.treeNodeArr);
                setData(data.data.loginRote.treeNodeArr)
                setInitInfo(data.data)
                dispatch({ type: "useInfoStore/changeInit", val: data.data })

            }
            //token不存在返回登录页
            if (data.code === 4) {
                navigate("/")
            }
        })
        // eslint-disable-next-line
    }, [])
    console.log(location);
    // 获取数据
    // const navData = useMemo(() => {
    //     return data.length ? data : location.state?.data
    // }, [data])
    //顶部菜单路由跳转
    const select = (items) => {
        navigate(items.key)
    }
    //点击退出登录
    const exit = () => {
        localStorage.removeItem("EXKGLQ_QWEQDF")
        navigate("/")
    }
    return (
        <Layout>
            <Header className="header">
                <div className="logo" />
                <div className="avatar">
                    <Popover trigger="click" className='tip'
                        content={<>
                            <p className='person' >
                                <Link to="/home/person" state={initInfo
                                }>个人设置</Link>
                            </p>
                            <p className='exit' onClick={exit}>退出登录</p>
                        </>
                        }>
                        <span style={{ color: "#fff", paddingRight: '12px' }}>{initInfo?.loginName}</span>
                        <Avatar size={50} icon={<UserOutlined />} src={`/api${initInfo?.loginImg}`} />
                    </Popover>
                </div>
                <Menu theme="dark" mode="horizontal"  onSelect={select} selectedKeys={location.pathname} items={navArr} />
            </Header>
            <Layout style={{ height: "100vh" }}>
                <Layout >
                    <Content style={{ padding: 24, margin: 0, minHeight: 280, }}>
                        <Outlet style={{ height: "100vh" }}></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}