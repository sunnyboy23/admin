//引入图标组件
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { setLogin } from '../../required/getMsg';
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import "../../assets/css/login.scss"



export default function Login () {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //登录并跳转
    const onFinish = async (values) => {
        // console.log(values);
        let data = await setLogin(values)
        console.log(data);
        if(data.code === 3){
            // console.log(data);
            localStorage.setItem("EXKGLQ_QWEQDF",data.token)
            //提交登陆数据到仓库
            dispatch({type:"userInfoStore/changeInit",val: data.data})
            console.log(data.data.loginRote.treeNodeArr);
            navigate("/home",{state:{data:data.data.loginRote.treeNodeArr}})
        }
       };
       
    return (
        <div className='login'>
            <h2 className='title'>嘎嘎嘎后台管理</h2>
            <Form name="normal-login" 
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                    remember: true,
                  }}
            >
                <Form.Item label="账号" name="username" rules={[{requird:true,message:"请填写账号"
                }]}>
                    <Input prefix={<UserOutlined/>} placeholder="请输入账号"/>
                </Form.Item>

                <Form.Item label="密码" name="password" rules={[{requird:true,message:"请填写账号"
                }]} >
                    <Input.Password prefix={<LockOutlined/>} placeholder="请输入密码"/>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        提交
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
            }