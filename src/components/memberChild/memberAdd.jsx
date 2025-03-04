import { Button, Radio, Form, Input } from 'antd';
import { rule } from "@/hook/data.js"
import {addMember} from "@/required/getMsg.js"


export default function MemberAdd({setData}) {
    const [form]  = Form.useForm();
    const onFinish =async (value)=>{
        let data = await addMember(value)
        if(data.code === 3){
            setData(data.data)
            form.resetFields()
        }
    }
    return (
        <div>
             <Form  form={form} labelCol={{ span: 2 }} autoComplete="off" initialValues={{ userProxy: false, userPass:"123123" }} onFinish={onFinish} >
                <Form.Item label="手机号码" name="userPhone" rules={rule.userPhone}>
                    <Input placeholder='请输入手机号码'/>
                </Form.Item>
                <Form.Item label="密码" name="userPass" >
                    <Input.Password />
                </Form.Item>
                <Form.Item label="是否代理" name="userProxy">
                    <Radio.Group >
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 2 }}>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )

}