import { Table, Tag, Spin } from "antd";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../../services/api";

export default function UsersTable() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setLoading(false);
  };

  return (
    <>
      <h2>👤 Users</h2>

      {loading ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          dataSource={users}
          columns={[
            { title: "Name", dataIndex: "name" },
            { title: "Email", dataIndex: "email" },
            {
              title: "Role",
              dataIndex: "role",
              render: (r) => <Tag color="blue">{r}</Tag>,
            },
          ]}
        />
      )}
    </>
  );
}