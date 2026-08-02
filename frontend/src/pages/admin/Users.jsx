import React from 'react';

const AdminUsers = () => {
  const users = [
    { _id: 'u1', name: 'Barath Suriya (Admin)', email: 'barathsuriya.s2025ece@sece.ac.in', role: 'admin', points: 1000 },
    { _id: 'u2', name: 'Customer User', email: 'customer@example.com', role: 'customer', points: 120 },
    { _id: 'u3', name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'customer', points: 240 },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">User Accounts</h1>
        <p className="text-xs text-slate-500">View registered customers and administrator roles</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-x-auto text-xs text-slate-800 bg-white border border-slate-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 uppercase text-[10px] text-slate-600 font-extrabold border-b border-slate-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email Address</th>
              <th className="p-4">Role</th>
              <th className="p-4">Loyalty Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-bold text-slate-900">{u.name}</td>
                <td className="p-4 font-medium text-slate-700">{u.email}</td>
                <td className="p-4">
                  <span className={`badge ${u.role === 'admin' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-extrabold text-emerald-700">{u.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
