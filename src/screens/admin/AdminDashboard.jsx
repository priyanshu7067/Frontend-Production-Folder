import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen text-white space-y-6">

      {/* 🔥 Header */}
      <div>
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">
          Manage users, analytics and system performance
        </p>
      </div>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400">Total Users</p>
          <h2 className="text-lg font-semibold">12,430</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400">Active Users</p>
          <h2 className="text-lg font-semibold text-green-400">8,210</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400">Revenue</p>
          <h2 className="text-lg font-semibold text-blue-400">$92,340</h2>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <p className="text-xs text-gray-400">Pending Requests</p>
          <h2 className="text-lg font-semibold text-yellow-400">120</h2>
        </div>

      </div>

      {/* 🔥 Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔥 Recent Users */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-300">
              Recent Users
            </h2>
            <button className="text-xs text-blue-400 hover:underline">
              View All
            </button>
          </div>

          <table className="w-full text-sm">
            <thead className="text-gray-500 border-b border-white/10 text-xs uppercase">
              <tr>
                <th className="text-left py-2">Name</th>
                <th>Status</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {["Amit", "Rahul", "Neha", "Suresh"].map((name, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="py-3">{name}</td>
                  <td>
                    <span className="px-2 py-1 text-xs rounded bg-green-500/10 text-green-400">
                      Active
                    </span>
                  </td>
                  <td className="text-gray-400">2 days ago</td>
                  <td className="text-right">
                    <button className="text-xs text-gray-400 hover:text-white">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🔥 System Status */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-4">
          <h2 className="text-sm font-semibold text-gray-300">
            System Status
          </h2>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Server</span>
            <span className="text-green-400">Online</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Database</span>
            <span className="text-green-400">Healthy</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">API</span>
            <span className="text-yellow-400">Slow</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Errors</span>
            <span className="text-red-400">3 Issues</span>
          </div>
        </div>

      </div>

      {/* 🔥 Activity Logs */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-gray-300 mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-2 text-sm text-gray-400">
          <li>✔ New user registered</li>
          <li>✔ Payment received</li>
          <li>⚠ API latency increased</li>
          <li>❌ Failed login attempt</li>
        </ul>
      </div>

    </div>
  );
};

export default AdminDashboard;