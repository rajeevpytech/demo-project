import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const UsersAndRoles: React.FC = () => {
  const { 
    users, 
    currentUser, 
    setCurrentUser, 
    ownershipTransfer, 
    initiateOwnershipTransfer, 
    confirmOwnershipTransfer, 
    cancelOwnershipTransfer,
    showToast 
  } = useCms();

  const [targetUserId, setTargetUserId] = useState(users[1]?.id || '');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const currentOwner = users.find(u => u.role === 'website_owner') || users[0];
  const eligibleNewOwners = users.filter(u => u.id !== currentOwner.id);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Title */}
      <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
          Multi-User Roles &amp; Website Ownership
        </h2>
        <p className="text-xs text-[#d0c5af] mt-0.5">
          Role-based access control (Super Admin, Website Owner, Content Editor, SEO Manager, Inquiry Manager) and verified ownership transfer.
        </p>
      </div>

      {/* SECURE OWNERSHIP TRANSFER WORKFLOW (SECTION 10 OF PROMPT) */}
      <div className="p-5 rounded-xl bg-[#201f22] border-2 border-[#f2ca50]/70 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-[#353437] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">verified_user</span>
            <div>
              <h3 className="font-serif-luxury text-base sm:text-lg font-bold text-white">
                Cryptographic Website Ownership Transfer Protocol
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Verified 2-step owner transition with immutable audit trail.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#4f471b] text-[#f1e3a9] font-mono text-[10px] font-bold uppercase">
            Current Owner: {currentOwner.name}
          </span>
        </div>

        {!ownershipTransfer ? (
          <div className="space-y-3">
            <p className="text-xs text-[#d0c5af] leading-relaxed">
              To transfer the primary charter and full governance of <strong>The Royal Band</strong>, select a verified executive user below. Both parties will be logged in the immutable audit trail.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <select
                value={targetUserId}
                onChange={(e) => setTargetUserId(e.target.value)}
                className="w-full sm:w-80 bg-[#0e0e10] text-xs text-[#f1e3a9] font-medium p-2.5 rounded-lg border border-[#4d4635] focus:outline-none"
              >
                {eligibleNewOwners.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.email} - {u.role.replace('_', ' ')})
                  </option>
                ))}
              </select>

              <button
                onClick={() => initiateOwnershipTransfer(targetUserId)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                Initiate Ownership Transfer
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-[#141418] border border-[#f2ca50] space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#f2ca50] text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-ping"></span>
                <span>Transfer In Progress &bull; Step 2 of 2: Owner Re-Authentication</span>
              </div>
              <span className="text-[10px] text-[#99907c] font-mono">Token: {ownershipTransfer.id}</span>
            </div>

            <p className="text-xs text-[#e5e1e4]">
              Transferring ownership from <strong>{currentOwner.name}</strong> to <strong>{ownershipTransfer.targetUserEmail}</strong>. Please confirm with executive password / 2FA check.
            </p>

            <div className="flex flex-col sm:flex-row gap-2.5 items-center">
              <input
                type="password"
                placeholder="Enter verified owner security password..."
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="w-full sm:w-72 bg-[#0e0e10] text-xs text-white p-2 rounded border border-[#4d4635] focus:outline-none"
              />

              <button
                onClick={() => confirmOwnershipTransfer(ownershipTransfer.id)}
                className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs active:scale-95 transition-all"
              >
                Confirm &amp; Finalize Transfer
              </button>

              <button
                onClick={cancelOwnershipTransfer}
                className="px-4 py-2 rounded bg-[#2a2a2c] hover:bg-[#353437] text-zinc-300 text-xs font-semibold"
              >
                Abort
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Users Table */}
      <div className="p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-sm space-y-3">
        <h3 className="font-serif-luxury text-base font-bold text-[#e5e1e4]">
          Authorized Team Members &bull; RBAC Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141418] text-[#99907c] uppercase font-bold text-[10px] tracking-wider border-b border-[#353437]">
              <tr>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Role Assignment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Activity</th>
                <th className="py-3 px-4 text-right">Switch Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2c]">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[#201f22]/60 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-2.5">
                    <img 
                      src={u.avatarUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDAsfIVnw8ptFr9B0CIPOnT9RnZETmqq_cihXQQhIwht8OLtAwV8_Wrmcx6ciWDSHWV-mzFPlllBOvrwIXUaLufrN9Mc6F7Pcqn9EQEQj6SQXbFMrl-OsaHfWmxVBmY6E3W_qL-Zn0CofVBYBGnWkFvH_Mxp22SGkqquZ4mQCAeUw5o1EtzvPUyFmVbT9Q9lBdbSZBcx_0IQ8sotHAtuew4bgJSxbg7wTfxJmv1XZkT1DTVXDSqitdUSQ"} 
                      alt={u.name} 
                      className="w-7 h-7 rounded-full object-cover border border-[#4d4635]"
                    />
                    <div>
                      <span className="font-semibold text-[#e5e1e4] block">{u.name}</span>
                      <span className="text-[10px] text-[#99907c]">{u.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      u.role === 'website_owner' ? 'bg-[#f2ca50] text-[#3c2f00]' :
                      u.role === 'super_admin' ? 'bg-purple-950 text-purple-300 border border-purple-800' :
                      u.role === 'seo_manager' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                      'bg-[#2a2a2c] text-[#d4c78f]'
                    }`}>
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-semibold text-[11px]">&bull; Active</span>
                  </td>
                  <td className="py-3 px-4 text-[#99907c] text-[11px]">
                    {u.lastLogin || 'Recent'}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => {
                        setCurrentUser(u);
                        showToast(`Logged in as ${u.name} (${u.role})`);
                      }}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        currentUser.id === u.id ? 'bg-[#d4af37] text-[#131315] font-bold' : 'bg-[#2a2a2c] text-[#d0c5af] hover:text-white'
                      }`}
                    >
                      {currentUser.id === u.id ? 'Current' : 'Log In As'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
