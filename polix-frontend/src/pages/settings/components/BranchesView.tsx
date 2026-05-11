import { Card, Row, Col, Typography, Spin } from "antd";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

type Branch = {
  id: number;
  name: string;
  type: string;
};

export default function BranchesView() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);

  // MOCK DATA (replace later with API)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setBranches([
        { id: 1, name: "Dhaka Branch", type: "Main Office" },
        { id: 2, name: "Chattogram Branch", type: "Regional Office" },
        { id: 3, name: "Sylhet Branch", type: "Sales Office" },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      <Title level={3}>🏬 Branch Management</Title>

      {loading ? (
        <Spin />
      ) : (
        <Row gutter={[16, 16]}>
          {branches.map((b) => (
            <Col span={8} key={b.id}>
              <Card hoverable>
                <Title level={4}>{b.name}</Title>
                <Text type="secondary">{b.type}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}