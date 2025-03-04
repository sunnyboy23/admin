import { Card, Tabs } from "antd"
import { useState } from "react"
import MamberList from "@/components/memberChild/memberList.jsx"
import ManberAdd from "@/components/memberChild/memberAdd.jsx"
// import { useState } from "react"
export default function Member() {
    const [data,setData] = useState([])
    return (
        <Card title="会员管理">
            <Tabs items={[
                {
                    key: '2',
                    label: `添加会员`,
                    children: <ManberAdd setData={setData}></ManberAdd>,
                },
                {
                    key: '1',
                    label: `会员列表`,
                    children: <MamberList data={data}></MamberList>,
                },
                {
                    key: '3',
                    label: `会员认证`,
                    children: `实名认证管理`,
                },
            ]} />
        </Card>
    )
}