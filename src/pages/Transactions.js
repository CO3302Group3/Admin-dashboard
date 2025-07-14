// src/pages/Transactions.js
import React from 'react';
import './Transactions.css';

const Transactions = () => {
  return (
    <div className="transactions-container">
      <h2>💰 Transaction Management</h2>

      <div className="transactions-card-container">
        <div className="transactions-card">
          <h3>💳 Monitor Transactions</h3>
          <p>Track all system payments, receipts, and transaction logs.</p>
          <button>Open</button>
        </div>

        <div className="transactions-card">
          <h3>🏧 Process Agent Withdrawals</h3>
          <p>Approve or reject agent withdrawal requests securely.</p>
          <button>Withdrawals</button>
        </div>

        <div className="transactions-card">
          <h3>💸 Generate Financial Reports</h3>
          <p>View detailed monthly or yearly income & expense reports.</p>
          <button>Generate</button>
        </div>

        <div className="transactions-card">
          <h3>📁 Audit Logs</h3>
          <p>Review system activity and access logs for financial tracking.</p>
          <button>View Logs</button>
        </div>

        <div className="transactions-card">
          <h3>📊 Set/Adjust Commission Rates</h3>
          <p>Modify commission settings for agents and transactions.</p>
          <button>Set Rates</button>
        </div>

        <div className="transactions-card">
          <h3>💼 Update Pricing Rules</h3>
          <p>Control how pricing is calculated for slots and penalties.</p>
          <button>Update Rules</button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
