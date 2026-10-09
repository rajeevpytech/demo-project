import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Page } from '../../types';

export const PagesManager: React.FC = () => {
  const { pages, setAdminCurrentView, setCurrentPageId, publishPage, showToast } = useCms();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = pages.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Pages &amp; Structure Management
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            WordPress-like page hierarchy, revision checkpoints, and visual builder launchpad.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0e0e10] text-xs text-[#e5e1e4] px-3 py-2 rounded-lg border border-[#4d4635] focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-[#1c1b1e] border border-[#4d4635]/40 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141418] text-[#99907c] uppercase font-bold text-[10px] tracking-wider border-b border-[#353437]">
              <tr>
                <th className="py-3.5 px-4">Page Title &amp; Route</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Sections</th>
                <th className="py-3.5 px-4">Revisions</th>
                <th className="py-3.5 px-4">Last Modified</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2c]">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-[#201f22]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-[#e5e1e4] text-sm">{page.title}</div>
                    <span className="text-[11px] text-[#f2ca50] font-mono">/{page.slug}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      page.status === 'published' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#d0c5af]">
                    {page.sections.length} Sections
                  </td>
                  <td className="py-3.5 px-4 text-[#d0c5af]">
                    <span className="font-mono text-xs">{page.revisions?.length || 1} versions</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#99907c] text-[11px]">
                    {page.updatedAt}
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                    <button
                      onClick={() => {
                        setCurrentPageId(page.id);
                        setAdminCurrentView('builder');
                      }}
                      className="px-2.5 py-1 rounded bg-[#d4af37] text-[#131315] font-bold text-xs hover:brightness-105"
                    >
                      Visual Editor
                    </button>
                    <button
                      onClick={() => {
                        publishPage(page.id);
                      }}
                      className="px-2 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] border border-[#4d4635] text-xs font-semibold"
                    >
                      Publish
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
