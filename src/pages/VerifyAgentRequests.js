// src/pages/VerifyAgentRequests.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VerifyAgentRequests.css";

const VerifyAgentRequests = () => {
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch agents from backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const response = await axios.post(
          "http://192.168.1.75/admin-management/get_all_non_staff_users",
          { token }
        );

        const data = response.data.data;
        const fetchedAgents = Array.isArray(data.agents) ? data.agents : [];

        setAgents(fetchedAgents); // keep backend status
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, []);

  // Filter search
  const filteredAgents = agents.filter(
    (agent) =>
      agent.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Approve → active
  const approveAgent = (email) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.email === email ? { ...agent, status: "active" } : agent
      )
    );
  };

  // Reject → inactive
  const rejectAgent = (email) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.email === email ? { ...agent, status: "inactive" } : agent
      )
    );
  };

  // Action Status logic
  const getActionStatus = (status) => {
    if (status === "banned") return "Deleted";
    if (status === "active") return "Approved";
    if (status === "inactive") return "Approved";
    return status;
  };

  return (
    <div className="verify-agent-requests-container">
      <h2 className="heading">Verify New Agent Requests</h2>

      <div className="filter-search">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <table className="agents-table">
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action Status</th> {/* KEEP THIS */}
            {/* ❌ Removed Actions column */}
          </tr>
        </thead>

        <tbody>
          {filteredAgents.map((agent, i) => (
            <tr key={i}>
              <td>{agent.username}</td>
              <td>{agent.email}</td>

              {/* Status */}
              <td
                className={
                  agent.status === "active"
                    ? "approved-status"
                    : agent.status === "inactive"
                    ? "pending-status"
                    : "rejected-status"
                }
              >
                {agent.status}
              </td>

              {/* Action Status logic */}
              <td>{getActionStatus(agent.status)}</td>

              {/* ❌ Removed buttons column */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VerifyAgentRequests;
