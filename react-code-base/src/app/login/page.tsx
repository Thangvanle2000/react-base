"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, login } from "../redux/features/auth/authSlice";
import { Button, Checkbox, Form, Input } from "antd";
import { authApi } from "../../api/authApi.ts/page";
import { usePathname } from "next/navigation";

export default function User() {
  const location = usePathname();

  const onFinish = async (values: any) => {
    const user = {
      email: values.email,
      password: values.password,
    };
    const res: any = await authApi.login({
      user: user,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h1 className="hello">Login form</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
