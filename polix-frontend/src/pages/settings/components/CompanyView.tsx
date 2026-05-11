import { Card, Typography, Form, Input, Button, message } from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function CompanyView() {
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  // MOCK LOAD DATA
  const initialValues = {
    name: "PoliX Insurance Ltd",
    country: "Bangladesh",
    currency: "BDT",
    address: "Dhaka, Bangladesh",
  };

  const onFinish = (values: any) => {
    setLoading(true);

    // later replace with API call
    setTimeout(() => {
      console.log("Saved:", values);
      message.success("Company updated successfully");
      setLoading(false);
    }, 500);
  };

  return (
    <div>
      <Title level={3}>🏢 Company Settings</Title>

      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={initialValues}
          onFinish={onFinish}
        >
          <Form.Item label="Company Name" name="name">
            <Input />
          </Form.Item>

          <Form.Item label="Country" name="country">
            <Input />
          </Form.Item>

          <Form.Item label="Currency" name="currency">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form>
      </Card>
    </div>
  );
}