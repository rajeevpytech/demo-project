import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = auditLogs.filter(log => 
    log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-5xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Immutable System Audit Trail
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Cryptographic ledger tracking all content publications, ownership transfers, status transitions, and setting modifications.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search audit trail..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 bg-[#0e0e10] text-xs text-[#e5e1e4] px-3 py-1.5 rounded-lg border border-[#4d4635] focus:outline-none"
        />
      </div>

      <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141418] text-[#99907c] uppercase font-bold text-[10px] tracking-wider border-b border-[#353437]">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Entity</th>
                <th className="py-3 px-4">Change Log Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2c]">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-[#201f22]/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-[#99907c] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                    {log.userName}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635]/50">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#d4c78f] font-mono text-[11px] whitespace-nowrap">
                    {log.entityType}
                  </td>
                  <td className="py-3 px-4 text-[#d0c5af] text-xs">
                    {log.details}
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
