import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsers } from "../../../api/user";
import ListUsers from "../../../components/Admin/Users/ListUsers";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccessTokenApi();

  useEffect(() => {
    getUsers(token).then((response) => {
      setUsers(response);
      console.log(response);
    });

    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div>
      <ListUsers users={users} />
    </div>
  );
}
