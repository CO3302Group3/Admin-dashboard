import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewAllUsers.css';

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch users & agents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (!token) {
          console.error('No access token found in localStorage');
          return;
        }

        const response = await axios.post(
          'http://192.168.1.75/admin-management/get_all_non_staff_users',
          { token }
        );

        setUsers(response.data.data?.users || []);
        setAgents(response.data.data?.agents || []);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  // Search handler
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Filter function
  const filterData = (list) =>
    list.filter(
      (item) =>
        item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredUsers = filterData(users);
  const filteredAgents = filterData(agents);

  return (
    <div className="view-users-container">
      <h2 className="heading">All Registered Users & Agents</h2>

      {/* Search Bar */}
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search username, email or status"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={() => setSearchTerm('')} className="clear-btn">
          Clear
        </button>
      </div>

      {/* USERS TABLE */}
      <h3 className="sub-heading">Users</h3>
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
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td
                  style={{
                    color:
                      user.status === 'active'
                        ? 'green'
                        : user.status === 'inactive'
                        ? 'orange'
                        : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {user.status || 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* AGENTS TABLE */}
      <h3 className="sub-heading">Agents</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Agent Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredAgents.length > 0 ? (
            filteredAgents.map((agent, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{agent.username}</td>
                <td>{agent.email}</td>
                <td
                  style={{
                    color:
                      agent.status === 'active'
                        ? 'green'
                        : agent.status === 'inactive'
                        ? 'orange'
                        : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {agent.status || 'N/A'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No agents found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllUsers;
