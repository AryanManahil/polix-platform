import { Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { loginApi } from "../api/auth";
import { setToken, setEmail } from "../utils/token";

const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const data = await loginApi(values.email, values.password);

      // ✅ store auth properly
      setToken(data.access_token);
      setEmail(values.email);

      message.success("Login successful");

      navigate("/home");
    } catch (err: any) {
      message.error(
        err?.response?.data?.detail || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fb",
      }}
    >
      <Card style={{ width: 380, borderRadius: 12 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          🏦 PoliX Insurance
        </Title>

        <Text type="secondary" style={{ display: "block", textAlign: "center", marginBottom: 20 }}>
          Sign in to your account
        </Text>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email required" }]}
          >
            <Input placeholder="admin@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password required" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form>

        <div style={{ textAlign: "center", marginTop: 15 }}>
          <Text>
            Don't have an account?{" "}
            <a onClick={() => navigate("/register")}>Register</a>
          </Text>
        </div>
      </Card>
    </div>
  );
}