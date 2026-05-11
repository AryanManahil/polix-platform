import { Tag, Card, Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchPermissions } from "../../../services/api";

export default function PermissionsView() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    setLoading(true);
    const data = await fetchPermissions();
    setPermissions(data);
    setLoading(false);
  };

  return (
    <>
      <h2>🛡 Permissions</h2>

      {loading ? (
        <Spin />
      ) : (
        <Card>
          {permissions.map((p) => (
            <Tag key={p.id} color="blue" style={{ margin: 5 }}>
              {p.name}
            </Tag>
          ))}
        </Card>
      )}
    </>
  );
}