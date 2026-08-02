import React from 'react';

const AdminUsers = () => {
  const users = [
    { _id: 'u1', name: 'Admin Manager', email: 'admin@example.com', role: 'admin', points: 500 },
    { _id: 'u2', name: 'Alex Johnson', email: 'customer@example.com', role: 'customer', points: 120 },
    { _id: 'u3', name: 'Sarah Miller', email: 'sarah.m@example.com', role: 'customer', points: 240 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-white">User Accounts</h1>
        <p className="text-xs text-slate-400">View registered customers and administrator roles</p>
      </div>

      <div className="glass-panel rounded-2xl overflow-x-auto text-xs text-slate-200">
        <table className="w-full text-left">
          <thead className="bg-slate-900/80 uppercase text-[10px] text-slate-400 font-bold border-b border-slate-800">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Loyalty Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-900/40 transition">
                <td className="p-4 font-bold text-white">{u.name}</td>
                <td className="p-4 text-slate-300">{u.email}</td>
                <td className="p-4">
                  <span className={`badge ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-semibold text-emerald-400">{u.points} pts</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
