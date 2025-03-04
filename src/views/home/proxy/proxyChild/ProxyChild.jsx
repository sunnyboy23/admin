import { Card, Table, Button, Switch, Tag, Modal, Form, Input, Space } from 'antd';
import { Link } from "react-router-dom"
import { getProxy,setDivide,getProxyPage,searchProxy } from '@/required/getProxy';
import {changeProxy} from "@/required/getMsg.js"
import { useEffect, useState } from 'react';


const { Search } = Input;
const columns = [
    { title: '手机号码', dataIndex: 'webPhone', width: 100, fixed: 'left' },
    { title: '姓名', dataIndex: 'webName', width: 100, },
    { title: '分成比例', dataIndex: 'webDivide', width: 100, },
    { title: '旗下会员数', dataIndex: '13213', width: 100, },  // 旗下会员数 邀请了多少人
    { title: '代理创建人', dataIndex: ["webOrigin", "loginName"], width: 100, },
    { title: '注册时间', dataIndex: 'webnData', width: 100, },
];



export default function ProxyChild() {
    const [total,setTotal] = useState(0);
    const [current,setCurrent] = useState(1)
    const [bol,setBol] = useState(true)
    const [dataArr, setDataArr] = useState([])
    const [form] = Form.useForm();
    const [id,setID] = useState("");
    const [index,setIndex] = useState("")

    // 分成设置
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = async()=>{
        let value = form.getFieldValue("divide");
        let data = await setDivide({divide:value,id:id})
        dataArr.splice(index,1,data.data)
        setDataArr([...dataArr])
        //关闭弹窗
        form.resetFields()
        setIsModalOpen(false)
    }

    const handleCancel = ()=>{
        form.resetFields()
        setIsModalOpen(false)
    }

    //修改代理状态
    const handlerProxy = (val,bol)=>{
        console.log(bol);
        changeProxy({bol,id:val._id})
        init()

    }
    //搜索
    const getSearch =async (value)=>{
        if(!value){
            setBol(true)
            init()
            setCurrent(1)
            return
        }
        let data =await searchProxy({value})
        setDataArr(data.data);
        setTotal(data.len)
        setBol(false)
    }
    //获取分页数据
    const getPageData =async (val)=>{
        if(bol){
            //为true 表示分页搜索
             let data = await getProxyPage({key:val})
             setDataArr(data.data)
            }
        setCurrent(val)
    }
    useEffect(()=>{
        init()
    },[])
    const init = ()=>{
        getProxy().then((data)=>{
            setDataArr(data.data)
            setTotal(data.len)
        })
    }
    return (
        <Card title="代理用户">
            <Space >
                <Button><div style={{color:'black'}}> <Link to="/home/member">添加代理</Link> </div></Button>
                <Search onSearch={getSearch} placeholder="手机号码/姓名" />
            </Space >

            <Table
                rowKey={(val) => val._id}
                columns={[
                    ...columns,
                    {
                        title: '代理状态', dataIndex: 'webProxy', width: 100,
                        render(_, value) {
                            return (<Switch onChange={handlerProxy.bind(null, value)} defaultChecked={value.webProxy} checkedChildren="允许" unCheckedChildren="禁用" />)
                        }
                    },
                    {
                        title: '分成', dataIndex: 'webProxy', width: 100,
                        render(_, value, index) {
                            return (
                                <>
                                    <Tag className='cur' onClick={() => { setID(value._id); setIndex(index); setIsModalOpen(true) }}>设置比例</Tag>
                                </>
                            )
                        }
                    },
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
            <Modal title="设置分成比例" okText="确定" cancelText="取消" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form}>
                    <Form.Item name="divide">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    )
}   