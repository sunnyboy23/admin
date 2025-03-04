import { useLocation, useNavigate } from "react-router-dom";
import { Button, Radio, Form, Input, Card } from 'antd';
import { setVip } from "../../../required/getMsg";
import {rule} from "@/hook/data.js"



export default function MemberChange() {
    //表单
    const [form] = Form.useForm();
    const { state:val } = useLocation()
    const navigate = useNavigate()

    //表单提交
    const onFinish =async (value)=>{
        
        console.log(val.val._id);
        value.id = val.val._id
        await setVip(value)
        
    }
    return (
        <Card title={<><span>编辑会员信息</span>  <Button style={{left:20}} onClick={()=>navigate((-1))}>返回上一级</Button></>} bordered={false} >
            
            <Form form={form} labelCol={{ span: 2 }} autoComplete="off" initialValues={{}} onFinish={onFinish} >
                <Form.Item label="手机号码" name="webPhone" rules={rule.userPhone}>
                    <Input placeholder='请输入手机号码' />
                </Form.Item>
                <Form.Item label="姓名" name="webName" rules={rule.userNick} >
                    <Input placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item label="身份证" name="webID" >
                    <Input placeholder='请输入身份证' />
                </Form.Item>

                <Form.Item label="会员状态" name="webStatus" >
                    <Radio.Group >
                        <Radio value={true}>正常</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="是否代理" name="webProxy" >
                    <Radio.Group >
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="登录密码" name="userPass" help="不写,默认不修改" rules={rule.userNPass}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="支付密码" name="payS" help="不写,默认不修改" rules={rule.userNPass}>
                    <Input.Password />
                </Form.Item>
                <Form.Item label="备注" name="webInfo" >
                    <Input placeholder='请输入备注信息' />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}