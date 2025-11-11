import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SuspendUser.css";

const SuspendUser = () => {
  const [bannedUsers, setBannedUsers] = useState([]);

  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await axios.post(
          "http://192.168.1.75/admin-management/get_all_non_staff_users",
          { token },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        console.log("Banned Users Response:", response.data);

        const data = response.data.data;
        const usersArray = Array.isArray(data.users) ? data.users : [];

        const banned = usersArray.filter(
          (user) =>
            user.status &&
            user.status.toLowerCase().trim() === "banned"
        );

        setBannedUsers(banned);
      } catch (error) {
        console.error("Error fetching banned users:", error);
      }
    };

    fetchBannedUsers();
  }, []);

  return (
    <div className="view-users-container">
      <h2 className="heading">🛑 Banned Users</h2>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bannedUsers.length > 0 ? (
            bannedUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {user.status}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No banned users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SuspendUser;
