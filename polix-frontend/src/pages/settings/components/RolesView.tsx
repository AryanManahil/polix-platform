import { Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchRoles } from "../../../services/api";

export default function RolesView() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    const data = await fetchRoles();
    setRoles(data);
    setLoading(false);
  };

  return (
    <>
      <h2>🔐 Roles</h2>

      {loading ? (
        <Spin />
      ) : (
        roles.map((r) => (
          <Card key={r.id} style={{ marginBottom: 10 }}>
            <h3>{r.name}</h3>
          </Card>
        ))
      )}
    </>
  );
}