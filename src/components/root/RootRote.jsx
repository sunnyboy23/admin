import React, { useState ,useEffect} from 'react'
import { Button, Drawer, Form, Input, Select, Tree,Table ,Tag} from 'antd';
import { navArrData,ruleDate,ruleDate2 } from "@/hook/data.js"
import { setRoteInfo,getRoteInfo ,removeRote,changeRote} from '../../required/getMsg';


//表头
const columns = [
    { title: '角色名称', dataIndex: 'roteName' },
    { title: '角色描述', dataIndex: 'roteInfo' },
    { title: '权限等级', dataIndex: 'roteLevel' },
    { title: '创建时间', dataIndex: 'loginData' },
  ];

const { Option } = Select;
const reg = [{ required: true, message: "必须填写" }]
//角色管理
export default function RootRote({setRoteArr}) {
    //列表数据
    const [tableArr,setTableArr] = useState([]);
    //修改的数据
    const [chanInfo,setChanInfo] = useState({id:"",index:""})
    const [bol,setBol] = useState(true);
    const [treeArr, setTreeArr] = useState({ treeKeyArr: [], treeNodeArr: [] });
    const [form] = Form.useForm();
    const [title,setTitle] = useState("")
    //显示抽屉
    const [open, setOpen] = useState(false);
    //初始数据
    const init = { roteName: "", roteInfo: "", roteLevel: 1 };

    
    //点击提交
    const onFinish = async (value) => {
        if(!bol){
            let data = await changeRote({id:chanInfo.id,...value,...treeArr});
            console.log(data.data);
            ruleDate2(data.data)
            tableArr.splice(chanInfo.index,1,data.data)
            setTableArr([...tableArr])
        }else{
            console.log(value);
            console.log(treeArr.treeKeyArr,treeArr.treeNodeArr);
            let data = await setRoteInfo({...value,...treeArr})  
            // console.log(data);
            if(data.code === 3){
                ruleDate(data)
                setTableArr([...tableArr,data.data])
            }
        }
       onClose()
       
        
    };
    //打开弹窗
    const showDrawer = () => {
        setOpen(true);
        setBol(true);
        setTitle('创建权限')
    };
    
    //选择权限
    const onCheck = (checkedKeys, info) => {
        
        setTreeArr({ treeKeyArr: checkedKeys, treeNodeArr: info.checkedNodes })
        
        
    };
    //关闭弹窗
    const onClose = () => {
        setOpen(false);
        form.resetFields();
        setTreeArr({treeKeyArr:[],treeNodeArr:[]});
    };
    //初始获取角色权限数据
    useEffect(()=>{
        initData();
        // eslint-disable-next-line
    },[]);
    //初始化数据
    const initData = ()=>{
        getRoteInfo().then(({data})=>{
            ruleDate(data)
            setTableArr(data);
            setRoteArr(data)

        })
    }
    //删除角色权限
    const  handleRemove = (index,_id)=>{
        tableArr.splice(index,1);
        setTableArr([...tableArr]);
        removeRote({_id})
    };
    //修改角色权限
    const handleChange = (val,index)=>{
        form.setFieldsValue(val);
        setTreeArr({treeKeyArr: val.treeKeyArr})
        setBol(false)
        setOpen(true)
        setTitle("修改权限")
        setChanInfo({id:val._id,index})
    }

    return (
        <>
            <Button type="primary" onClick={showDrawer}>新建角色</Button>
            <Drawer title={title} placement="right" onClose={onClose} open={open}>
                <Form className="login-form" form={form} initialValues={init} onFinish={onFinish} autoComplete="off">
                    <Form.Item name="roteName" label="角色名称" rules={reg}>
                        <Input placeholder="请输入角色名称" />
                    </Form.Item>
                    <Form.Item name="roteInfo" label="权限描述" rules={reg}>
                        <Input placeholder="请书写权限描述" />
                    </Form.Item>
                    <Form.Item name="roteLevel" label="权限等级" rules={reg}>
                        <Select>
                            <Option value={1}>一级权限</Option>
                            <Option value={2}>二级权限</Option>
                            <Option value={3}>用户代理</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="选中权限">
                        <Tree
                            checkable
                            onCheck={onCheck}
                            treeData={navArrData}
                            checkedKeys={treeArr.treeKeyArr}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
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
                                    <Tag className='cur' onClick ={handleRemove.bind(null,index,record._id)} >删除</Tag>
                                    <Tag className='cur' onClick={handleChange.bind(null,record,index)}>修改</Tag>
                                </>
                            )
                        },
                    }
                ]}
                dataSource={tableArr}
                rowKey={(va) => va._id}
                pagination={{ position: ['bottomCenter'], hideOnSinglePage: true }}
            />
        </>
    )
}