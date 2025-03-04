import {Tabs} from "antd"
import { useState } from "react";
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import RootRote from "@/components/root/RootRote.jsx";
import RootManage from "@/components/root/RootManage.jsx";



export default function Root() {
  let [roteArr,setRoteArr] = useState([])
    return (
        <Tabs defaultActiveKey="1" items={[{
            key: '1',
            label: <span><AndroidOutlined/>角色管理</span>,
            children: <RootRote setRoteArr={setRoteArr}></RootRote>,
          },
          {
            key: '2',
            label: <span><AppleOutlined />用户管理</span>,
            children: <RootManage roteArr={roteArr}></RootManage>,
          },
        ]}/>
    )
}