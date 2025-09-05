// src/pages/ViewAllUsers.js
import React, { useState } from 'react';
import './ViewAllUsers.css';

const sampleUsers = [
  { id: 1, username: 'john_doe', email: 'john@example.com', status: 'Active' },
  { id: 2, username: 'jane_smith', email: 'jane@example.com', status: 'Inactive' },
  { id: 3, username: 'sam_green', email: 'sam@example.com', status: 'Active' },
  { id: 4, username: 'lucy_lee', email: 'lucy@example.com', status: 'Inactive' },
  { id: 5, username: 'mike_brown', email: 'mike@example.com', status: 'Active' },
];

const ViewAllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = sampleUsers.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="view-users-container">
      <h2 className="heading">All Registered Users</h2>

      {/* Search Bar */}
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search by username or email"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button onClick={() => setSearchTerm('')} className="clear-btn">
          Clear
        </button>
      </div>

      {/* Users Card */}
      <div className="users-card">
        <h3 className="users-title">View All Users</h3>
     
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className={user.status === 'Active' ? 'active-status' : 'inactive-status'}>
                {user.status}
              </td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllUsers;
