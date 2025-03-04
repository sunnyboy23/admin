import { Button, Form, Input, Upload, Card, } from 'antd';
import { useLocation,useNavigate } from 'react-router-dom';
import { changeUser } from "@/required/getMsg.js"
import { useDispatch } from "react-redux"
import { rule } from "@/hook/data.js"
import { useState } from 'react';





//个人信息设置
export default function Person() {
    
    const navigate = useNavigate()
    const {state} = useLocation()
    console.log(state);
    const [avatarImg,setAvatarImg] = useState(state.loginImg)
    const dispatch = useDispatch()
    //获取表单实例
    const [form] = Form.useForm();
    //获取表单数据并提交
    const finish = async (val)=>{
        // console.log(val);
        let data = await changeUser(val)
        localStorage.setItem("EXKGLQ_QWEQDF",data.token);
        dispatch({type:"useInfoStore/changeInit",val:data.data})
        console.log(data);
        navigate("/home/child")
    }
    //上传触发函数
    const handleChange = (info)=>{
        // console.log(info);
        if (info.file.status === "done") {
            console.log(info.file.response);
            setAvatarImg(info.file.response.data.loginImg);
            localStorage.setItem("EXKGLQ_QWEQDF",info.file.response.token);
            dispatch({type:"useInfoStore/changeInit",val:info.file.response.data})
        }
    }
    return (
        <Card title="个人信息设置" className='title' bordered={false}>
            <Form
                form={form}
                initialValues={state}
                layout="vertical"
                style={{ maxWidth: 600 ,height:"75vh"}}
                onFinish={finish}
                autoComplete="off"
            >
                <Form.Item label="用户名" name="loginName" extra={<p style={{ fontSize: "12px" }}>不可修改</p>}>
                    <p>{state.loginName}</p>
                </Form.Item>
                <Form.Item label="昵称" name="loginNick" rules={rule.userNick}>
                    <Input placeholder="请输入昵称" />
                </Form.Item>
                <Form.Item label="邮箱" name="loginEmail" rules={rule.userEmail}>
                    <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item label="密码" name="loginPass" rules={rule.userPass}>
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item label="手机号码" name="loginPhone" rules={rule.userPhone}>
                    <Input placeholder="请输入手机号码" />
                </Form.Item>
                <Form.Item label="头像" >
                    <Upload name="file" action="/api/root/avatar"
                        data={{ id: state._id }}
                        onChange={handleChange}
                        showUploadList={false}
                        className="avatar-uploader"
                        maxCount={1}
                    >
                        <img src={"/api" + avatarImg} alt="avatar" style={{ width: '90px', height: 90 }} />
                    </Upload>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit">确定修改</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}