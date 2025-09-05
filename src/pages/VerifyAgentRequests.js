// src/pages/VerifyAgentRequests.js
import React, { useState } from 'react';
import './VerifyAgentRequests.css';

// Sample agent data
const sampleAgents = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: 'ABC Ltd.', status: 'Pending' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: 'XYZ Corp.', status: 'Pending' },
  { id: 3, name: 'Sam Green', email: 'sam@example.com', company: 'Green Co.', status: 'Pending' },
];

const VerifyAgentRequests = () => {
  const [agents, setAgents] = useState(sampleAgents);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter agents based on the search term
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle approve action
  const approveAgent = (id) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === id ? { ...agent, status: 'Approved' } : agent
      )
    );
  };

  // Handle reject action
  const rejectAgent = (id) => {
    setAgents((prevAgents) =>
      prevAgents.map((agent) =>
        agent.id === id ? { ...agent, status: 'Rejected' } : agent
      )
    );
  };

  return (
    <div className="verify-agent-requests-container">
      <h2 className="heading">Verify New Agent Requests</h2>

      {/* Search Bar */}
      <div className="filter-search">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Agent Requests Table */}
      <table className="agents-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredAgents.map((agent) => (
            <tr key={agent.id}>
              <td>{agent.name}</td>
              <td>{agent.email}</td>
              <td>{agent.company}</td>
              <td className={agent.status === 'Approved' ? 'approved-status' : agent.status === 'Rejected' ? 'rejected-status' : 'pending-status'}>
                {agent.status}
              </td>
              <td>
                {agent.status === 'Pending' && (
                  <>
                    <button onClick={() => approveAgent(agent.id)} className="approve-btn">
                      Approve
                    </button>
                    <button onClick={() => rejectAgent(agent.id)} className="reject-btn">
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyAgentRequests;
