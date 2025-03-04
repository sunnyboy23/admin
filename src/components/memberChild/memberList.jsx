import { Table, Tag, Input, Space, Button, Switch } from 'antd';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { getMemberData ,changeStatus ,changeProxy,vipPage,searchVip,removeVip,installMamber} from '../../required/getMsg';
import {ruleDate} from "@/hook/data.js"



const { Search } = Input;
const columns = [
    { title: '手机号码', dataIndex: 'webPhone', width: 100, fixed: 'left' },
    { title: '姓名', dataIndex: 'webName', width: 100, },
    { title: '身份证', dataIndex: 'webID', width: 100, },
    { title: '注册时间', dataIndex: 'loginData', width: 100, },
    { title: '登录时间', dataIndex: 'address', width: 100, },
    { title: '来源', dataIndex: ["webOrigin", "loginName"], width: 100, },
    { title: '备注', dataIndex: 'webInfo', width: 100, },
];
export default function MemberList() {
    const [total,setTotal] = useState(0);
    const [current,setCurrent] = useState(1)
    const [bol,setBol] = useState(true)
    const [dataArr,setDataArr] = useState([])
    //搜索
    const onSearch =async (value)=>{
        if(!value){
            setBol(true)
            init()
            setCurrent(1)
            return
        }
        let data =await searchVip({value})
        ruleDate(data.data)
        setDataArr(data.data);
        setTotal(data.len)
        setBol(false)
    }
    //修改状态
    const handlerChange = (val,bol)=>{
        changeStatus({bol,id:val._id})
    }
    //修改代理状态
    const handlerProxy = (val,bol)=>{
        changeProxy({bol,id:val._id})
    }
    //获取分页数据
    const getPageData =async (val)=>{
        if(bol){
        //为true 表示分页搜索
         let data = await vipPage({key:val})
         ruleDate(data.data)
         setDataArr(data.data)
        }
    setCurrent(val)
    }
    //删除
    const handlRemove = (index,_id)=>{
        console.log(index);
        dataArr.splice(index,1);
        setDataArr([...dataArr]);
        removeVip({_id});
    }
    //获取初始数据
    useEffect(()=>{
        init()
    },[])
    const init = ()=>{
        getMemberData().then((data)=>{
            if(data.code === 3){
                ruleDate(data.data)
                setTotal(data.len)
                setDataArr(data.data)
            }
        })
    }
    //导出表格
    const handleInstall =async ()=>{
        let data = await installMamber()

        //通过a标签下载
        let Dom = document.createElement("a");
        Dom.href = "/api" + data.data;
        //设置文件名
        Dom.download = "02.xlsx"
        //点击时间自动触发
        Dom.click()
    }
    return (
        <div>
            <Space style={{ marginBottom: 10 }}>
                <Button onClick={init}>重置</Button>
                <Search placeholder="手机号码/姓名/身份证搜索" onSearch={onSearch} style={{ width: 400 }} />
                <Button onClick={handleInstall}>导出表格</Button>
            </Space>
            <Table
                rowKey={(val) => val._id}
                scroll={{ x: 1800, y: 600 }}
                columns={[
                    ...columns,
                    {
                        title: '账号状态', dataIndex: 'webStatus', width: 100,
                        render(_, value) {
                            return (<Switch onChange={handlerChange.bind(null, value)} defaultChecked={value.webStatus} checkedChildren="正常" unCheckedChildren="禁用" />)
                        }
                    },
                    {
                        title: '代理状态', dataIndex: 'webProxy', width: 100,
                        render(_, value) {
                            return (<Switch onChange={handlerProxy.bind(null, value)} defaultChecked={value.webProxy} checkedChildren="允许" unCheckedChildren="禁用" />)
                        }
                    },
                    {
                        title: '操作',
                        dataIndex: 'address123',
                        fixed: 'right',
                        width: 100,
                        render(_,val,index ) {
                            return (
                                <>
                                    <Tag  className='cur' onClick={handlRemove.bind(null,index,val._id)}>删除</Tag>
                                    <Tag>
                                        <Link to="/home/memberchange" state={{ val }}>编辑</Link>
                                    </Tag>
                                </>
                            )
                        }
                    }
                ]}
                dataSource={dataArr}
                size="middle"
                pagination={{ position: ['bottomCenter'], 
                hideOnSinglePage:true,
                total:total,
                current:current,
                onChange:getPageData
                
            }}
            />
        </div>
    )
}