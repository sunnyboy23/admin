import React from "react"
import { Button, Drawer, Input, Space, Form,Select,Table,Tag } from 'antd';
import { useState,useEffect } from "react";
import { rule ,ruleDate,ruleDate2} from "@/hook/data.js"
import { setManage,getManageInfo ,removeManageInfo,changeManageInfo,searchInfo,getPage} from "@/required/getMsg.js"





// 设置每一列的信息及操作
const columns = [
    { title: '用户名称', dataIndex: 'loginName' },
    { title: '用户昵称', dataIndex: 'loginNick' },
    { title: '手机号码', dataIndex: 'loginPhone' },
    { title: '角色描述', dataIndex: ['loginRote','roteName'] },
    { title: '创建时间', dataIndex: 'loginData' },
    { title: '邮箱', dataIndex: 'loginEmail' },
  ];


const { Search } = Input;
const { Option } = Select;
export default function RootManage({ roteArr }) {
    // console.log(roteArr);
    const [title,setTitle] = useState("");
    const [form] = Form.useForm();
    const [bol,setBol] = useState(true);
    const [tableArr,setTableArr] = useState();
    const [open, setOpen] = useState(false);
    const [chanInfo,setChanInfo]  = useState({id:"",index:""})
    const [current,setCurrent] = useState(1)
    const [total,setTotal] = useState(0)
    const [bl,setBl] = useState(true)
    const onFinish = async (val) => {
        // console.log(val);
        if(!bol){
            let data = await changeManageInfo({id:chanInfo.id,...val})
            console.log(data);
            ruleDate2(data.data)
            tableArr.splice(chanInfo.index,1,data.data);
            setTableArr([...tableArr])
        }else{
            let data = await setManage(val)
            if(data.code === 3){
                ruleDate(data.data)
                setTableArr([data.data,...tableArr]) 
            }
            
        }
        onClose()  
    };
    //打开抽屉
    const showDrawer = () => {
        setOpen(true)
        setBol(true)
        setTitle("添加用户")
    };
    //关闭抽屉
    const onClose = () => {
        setOpen(false);
        form.resetFields()
    };
    //初始化数据
    const initData = ()=>{
        getManageInfo().then((data)=>{
            // console.log(data.data);
            ruleDate(data.data)
            setTableArr(data.data);
            setTotal(data.len)
        })
    }
    //初始化数据
    useEffect(()=>{
        initData()
    },[])
    //删除数据
    const handlRemove = (index,_id)=>{
        tableArr.splice(index,1);
        setTableArr([...tableArr]);
        removeManageInfo({_id});

    }
    //修改数据
    const handleChange = (val,index)=>{
        form.setFieldsValue(val);
        // form.initialValues(val)
        setTitle("修改用户")
        setBol(false);
        setChanInfo({id:val._id,index});
        setOpen(true)
    }
    //搜索
    const onSearch =async (value)=>{
        if(!value){
            setBl(true)
            initData()
            setCurrent(1)
            return
        }
        let data =await searchInfo({value})
        ruleDate(data.data)
        setTableArr(data.data);
        setTotal(data.len)
        setBl(false)
    }
    //分页
    const getPageData =async (val)=>{
        
        if(bl){
            //为true表示分页搜索
            console.log(val);
            let data = await getPage({key:val})
            ruleDate(data.data)
            setTableArr(data.data)
        }
        setCurrent(val)
        
    }
    return (
        <>
            <Space>
                <Button type="primary" onClick={showDrawer}>新建用户</Button>
                <Search placeholder="请输入用户或昵称" onSearch={onSearch} style={{ width: 400 }} />
                <Button onClick={initData}>重置</Button>
            </Space>
            <Drawer title={title} placement="right" onClose={onClose} open={open}>
                <Form layout="vertical" initialValues={{ remember: true, }} onFinish={onFinish} form={form} autoComplete="off">
                    <Form.Item label="用户名" name="username" rules={rule.userName}>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item label="昵称" name="userNick" rules={rule.userNick}>
                        <Input placeholder='请输入昵称' />
                    </Form.Item>
                    <Form.Item label="密码" name="userPass" rules={rule.userNPass}>
                        <Input.Password placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item label="手机号码" name="userPhone" rules={rule.userPhone}>
                        <Input addonBefore="+86" placeholder='请输入手机号码' />
                    </Form.Item>
                    <Form.Item label="邮箱" name="userEmail" rules={rule.userEmail}>
                        <Input placeholder='请输入手机邮箱' />
                    </Form.Item>
                    <Form.Item label="角色" name="userRole" rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Select placeholder="选择角色权限">
                            {
                                roteArr.map((item) => {
                                    return (
                                        <Option key={item._id} value={item._id}>{item.roteName}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Table
                columns={[
                    ...columns,
                    {
                        title: '操作',
                        render: (_, record, index) => {
                            return (
                                <>
                                    <Tag className='cur' onClick={handlRemove.bind(null,index,record._id)} >删除</Tag>
                                    <Tag className='cur' onClick={handleChange.bind(null,record,index)}>修改</Tag>
                                </>
                            )
                        },
                    }
                ]}
                dataSource={tableArr}
                rowKey={(va) => va._id}
                pagination={{ position: ['bottomCenter'], 
                hideOnSinglePage:true,
                total:total,
                current:current,
                onChange:getPageData
            }}

            />
        </>
    )
}