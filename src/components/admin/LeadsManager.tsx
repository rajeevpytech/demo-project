import React, { useState, useMemo } from 'react';
import { useCms } from '../../context/CmsContext';
import { LeadInquiry } from '../../types';

export const LeadsManager: React.FC = () => {
  const { leads, submitLead, updateLead, updateLeadStatus, deleteLead, showToast } = useCms();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Lead Details Modal state
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(null);
  const [modalStatus, setModalStatus] = useState<LeadInquiry['status']>('new');
  const [modalQuoteAmount, setModalQuoteAmount] = useState('');
  const [modalNotes, setModalNotes] = useState('');

  // Manual New Lead Modal state
  const [isNewLeadModalOpen, setIsNewLeadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('Mr.');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newOccasion, setNewOccasion] = useState('Royal Wedding / Sangeet');
  const [newEventDate, setNewEventDate] = useState('2025-11-28');
  const [newTimingSlot, setNewTimingSlot] = useState('Evening Gala (7 PM - 11 PM)');
  const [newCity, setNewCity] = useState('Jaipur — Royal Rajputana Heritage');
  const [newPackage, setNewPackage] = useState('The Royal Grandeur (16-Piece)');
  const [newGuestCount, setNewGuestCount] = useState(450);
  const [newSpecialRequests, setNewSpecialRequests] = useState('');
  const [newAddons, setNewAddons] = useState<string[]>([
    'Concert Acoustic & Ambient Lighting Package',
    'Professional Royal MC / Bilingual Host'
  ]);

  // Sync modal form when a lead is selected
  const handleOpenLeadDetails = (lead: LeadInquiry) => {
    setSelectedLead(lead);
    setModalStatus(lead.status);
    setModalQuoteAmount(lead.quoteAmount || '');
    setModalNotes(lead.notes || '');
  };

  const handleSaveModalUpdates = () => {
    if (!selectedLead) return;
    updateLead(selectedLead.id, {
      status: modalStatus,
      quoteAmount: modalQuoteAmount.trim(),
      notes: modalNotes.trim()
    });
    // Update local selectedLead state
    setSelectedLead(prev => prev ? {
      ...prev,
      status: modalStatus,
      quoteAmount: modalQuoteAmount.trim(),
      notes: modalNotes.trim()
    } : null);
    showToast(`Inquiry for ${selectedLead.fullName} updated!`);
  };

  const handleCreateManualLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) {
      showToast("Please provide at least a name and phone number.");
      return;
    }

    await submitLead({
      title: newTitle,
      fullName: newName.trim(),
      phone: newPhone.trim(),
      email: newEmail.trim() || 'concierge@clientestate.com',
      occasionType: newOccasion,
      eventDate: newEventDate,
      timingSlot: newTimingSlot,
      city: newCity,
      ensemblePackage: newPackage,
      curatedAddons: newAddons,
      guestCount: newGuestCount,
      specialRequests: newSpecialRequests.trim()
    });

    setIsNewLeadModalOpen(false);
    // Reset form
    setNewName('');
    setNewPhone('');
    setNewEmail('');
    setNewSpecialRequests('');
    showToast("New booking inquiry recorded in leads docket!");
  };

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchesStatus = statusFilter === 'all' || l.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        l.fullName.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.occasionType.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  // Pipeline Metrics
  const metrics = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter(l => l.status === 'new').length;
    const inPipeline = leads.filter(l => l.status === 'under_review' || l.status === 'quoted').length;
    const confirmed = leads.filter(l => l.status === 'deposit_paid' || l.status === 'confirmed').length;
    
    // Estimate total quoted value
    let totalQuotedNum = 0;
    leads.forEach(l => {
      if (l.quoteAmount) {
        const cleaned = l.quoteAmount.replace(/[^0-9]/g, '');
        if (cleaned) totalQuotedNum += parseInt(cleaned, 10);
      }
    });

    return { total, newCount, inPipeline, confirmed, totalQuotedNum };
  }, [leads]);

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `royal_band_leads_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Leads docket exported as JSON!");
  };

  const exportToCsv = () => {
    const headers = ["ID", "Name", "Phone", "Email", "Occasion", "Date", "Slot", "City", "Package", "Guests", "Quote Amount", "Status", "Notes", "Created At"];
    const rows = leads.map(l => [
      l.id,
      `"${l.fullName}"`,
      l.phone,
      l.email,
      `"${l.occasionType}"`,
      l.eventDate,
      `"${l.timingSlot}"`,
      `"${l.city}"`,
      `"${l.ensemblePackage}"`,
      l.guestCount,
      `"${l.quoteAmount || ''}"`,
      l.status,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.createdAt}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `royal_band_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast("Leads docket exported as CSV!");
  };

  return (
    <div className="space-y-6 max-w-6xl selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[24px]">contact_phone</span>
            <h1 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
              Booking Inquiries &amp; VIP Lead Docket
            </h1>
          </div>
          <p className="text-xs text-[#d0c5af] mt-1 max-w-xl">
            Store, view, and update status of inquiries received via the website contact forms or private concierge line.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsNewLeadModalOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Record Inquiry</span>
          </button>
          <button
            onClick={exportToCsv}
            className="px-3 py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-semibold text-[#f1e3a9] border border-[#4d4635] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">table_view</span>
            <span>Export CSV</span>
          </button>
          <button
            onClick={exportToJson}
            className="px-3 py-2 rounded-lg bg-[#2a2a2c] hover:bg-[#353437] text-xs font-semibold text-[#f1e3a9] border border-[#4d4635] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">code</span>
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* KPI Pipeline Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div 
          onClick={() => setStatusFilter('all')}
          className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between cursor-pointer hover:border-[#f2ca50]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#99907c] uppercase">Total Inquiries</span>
            <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">inbox</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">{metrics.total}</span>
            <span className="text-[10px] text-[#d4c78f]">Dockets Stored</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('new')}
          className={`p-3.5 rounded-xl border flex flex-col justify-between cursor-pointer transition-colors ${
            metrics.newCount > 0 
              ? 'bg-amber-950/40 border-amber-500/60 text-amber-200' 
              : 'bg-[#1c1b1e] border-[#4d4635]/40 text-[#d0c5af]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase">New / Unread</span>
            <span className="material-symbols-outlined text-amber-400 text-[18px]">mark_email_unread</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-300">{metrics.newCount}</span>
            <span className="text-[10px]">{metrics.newCount > 0 ? 'Requires First Contact' : 'Up to Date'}</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('quoted')}
          className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between cursor-pointer hover:border-[#f2ca50]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#99907c] uppercase">Active Pipeline</span>
            <span className="material-symbols-outlined text-blue-400 text-[18px]">pending_actions</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-blue-300">{metrics.inPipeline}</span>
            <span className="text-[10px] text-zinc-400">Under Review &amp; Quoted</span>
          </div>
        </div>

        <div 
          onClick={() => setStatusFilter('confirmed')}
          className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between cursor-pointer hover:border-[#f2ca50]/50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#99907c] uppercase">Confirmed Palace Galas</span>
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-emerald-300">{metrics.confirmed}</span>
            <span className="text-[10px] text-zinc-400">Deposit / Contract Done</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All Dockets' },
            { id: 'new', label: 'New' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'quoted', label: 'Quoted' },
            { id: 'deposit_paid', label: 'Deposit Paid' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'archived', label: 'Archived' }
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === st.id 
                  ? 'bg-[#f2ca50] text-[#3c2f00] shadow' 
                  : 'bg-[#201f22] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#99907c] text-[16px]">search</span>
          <input
            type="text"
            placeholder="Search client, phone, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 bg-[#0e0e10] text-xs text-[#e5e1e4] pl-9 pr-3 py-2 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-[#1c1b1e] border border-[#4d4635]/50 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#141418] text-[#99907c] uppercase font-bold text-[10px] tracking-wider border-b border-[#353437]">
              <tr>
                <th className="py-3 px-4">Client Contact</th>
                <th className="py-3 px-4">Occasion &amp; City Hub</th>
                <th className="py-3 px-4">Event Date &amp; Slot</th>
                <th className="py-3 px-4">Package &amp; Scale</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2c]">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#99907c]">
                    No booking inquiries match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[#201f22]/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-white text-xs">
                        {lead.title} {lead.fullName}
                      </div>
                      <div className="text-[11px] text-[#f2ca50] font-mono mt-0.5">{lead.phone}</div>
                      <div className="text-[10px] text-[#99907c] truncate max-w-[170px]">{lead.email}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#d4c78f]">{lead.occasionType}</div>
                      <div className="text-[11px] text-[#d0c5af] mt-0.5">{lead.city.split('—')[0]}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-white">{lead.eventDate}</div>
                      <div className="text-[10px] text-[#99907c] mt-0.5">{lead.timingSlot.split('(')[0]}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-[#f1e3a9] font-medium">{lead.ensemblePackage.split('(')[0]}</div>
                      <div className="text-[10px] text-[#99907c] mt-0.5">
                        {lead.guestCount} Guests &bull; {lead.curatedAddons.length} Add-ons
                      </div>
                      {lead.quoteAmount && (
                        <div className="text-[10px] font-mono text-emerald-400 font-bold mt-1">
                          Quote: {lead.quoteAmount}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as any)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border appearance-none cursor-pointer uppercase ${
                          lead.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border-emerald-700' :
                          lead.status === 'quoted' ? 'bg-amber-950 text-amber-400 border-amber-700' :
                          lead.status === 'deposit_paid' ? 'bg-blue-950 text-blue-400 border-blue-700' :
                          lead.status === 'under_review' ? 'bg-purple-950 text-purple-400 border-purple-700' :
                          lead.status === 'archived' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' :
                          'bg-[#2a2a2c] text-[#f2ca50] border-[#4d4635]'
                        }`}
                      >
                        <option value="new">NEW INQUIRY</option>
                        <option value="under_review">UNDER REVIEW</option>
                        <option value="quoted">QUOTED</option>
                        <option value="deposit_paid">DEPOSIT PAID</option>
                        <option value="confirmed">CONFIRMED</option>
                        <option value="archived">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <a
                        href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(lead.fullName)},%20greetings%20from%20The%20Royal%20Band%20Concierge%20Desk.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-[#201f22] hover:bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] inline-block align-middle"
                        title="Open WhatsApp with Lead"
                      >
                        <span className="material-symbols-outlined text-[15px]">chat</span>
                      </a>
                      <button
                        onClick={() => handleOpenLeadDetails(lead)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs hover:brightness-105 cursor-pointer align-middle"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800 cursor-pointer align-middle"
                        title="Delete record"
                      >
                        <span className="material-symbols-outlined text-[15px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAILS & UPDATE MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#201f22] border border-[#4d4635] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#353437] pb-3">
              <div>
                <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
                  Inquiry Docket: {selectedLead.title} {selectedLead.fullName}
                </h3>
                <span className="text-[11px] text-[#99907c] font-mono">
                  Token: {selectedLead.id} &bull; Received {selectedLead.createdAt}
                </span>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-[#2a2a2c] hover:bg-[#353437] flex items-center justify-center text-white cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
                <span className="text-[10px] text-[#99907c] uppercase font-bold block">Phone / WhatsApp</span>
                <span className="font-mono text-white font-semibold text-sm">{selectedLead.phone}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
                <span className="text-[10px] text-[#99907c] uppercase font-bold block">Private Email</span>
                <span className="text-white truncate block text-sm font-semibold">{selectedLead.email}</span>
              </div>
            </div>

            {/* Event Itinerary */}
            <div className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 text-xs">
              <span className="text-[10px] text-[#99907c] uppercase font-bold block">Event Particulars</span>
              <p className="text-white font-bold text-sm mt-0.5">{selectedLead.occasionType} in {selectedLead.city}</p>
              <div className="flex items-center gap-3 mt-1 text-[#d4c78f]">
                <span>Date: <strong>{selectedLead.eventDate}</strong></span>
                <span>&bull;</span>
                <span>Slot: <strong>{selectedLead.timingSlot}</strong></span>
                <span>&bull;</span>
                <span>Scale: <strong>{selectedLead.guestCount} Guests</strong></span>
              </div>
            </div>

            {/* Package & Addons */}
            <div className="p-3.5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 text-xs">
              <span className="text-[10px] text-[#99907c] uppercase font-bold block">Curated Ensemble &amp; Add-ons</span>
              <p className="text-[#f1e3a9] font-semibold mt-0.5">{selectedLead.ensemblePackage}</p>
              <ul className="list-disc pl-4 mt-1.5 space-y-0.5 text-[#e5e1e4]">
                {selectedLead.curatedAddons.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
              {selectedLead.specialRequests && (
                <div className="mt-2 text-xs italic text-[#f1e3a9] bg-[#0e0e10] p-2.5 rounded-lg border border-[#353437]">
                  “{selectedLead.specialRequests}”
                </div>
              )}
            </div>

            {/* Status & Quote Management Section */}
            <div className="p-4 rounded-xl bg-[#161518] border border-[#f2ca50]/40 space-y-3">
              <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider block">
                Update Pipeline Status &amp; Financials
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-[#99907c] block mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value as any)}
                    className="w-full bg-[#1c1b1e] text-xs font-bold text-white p-2 rounded-lg border border-[#4d4635] focus:outline-none"
                  >
                    <option value="new">New Inquiry</option>
                    <option value="under_review">Under Review</option>
                    <option value="quoted">Quoted</option>
                    <option value="deposit_paid">Deposit Paid</option>
                    <option value="confirmed">Confirmed Gala</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#99907c] block mb-1">
                    Issued Quote Amount (₹)
                  </label>
                  <input
                    type="text"
                    value={modalQuoteAmount}
                    onChange={(e) => setModalQuoteAmount(e.target.value)}
                    placeholder="e.g. ₹4,50,000 + GST"
                    className="w-full bg-[#1c1b1e] text-xs font-bold text-[#f2ca50] p-2 rounded-lg border border-[#4d4635] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#99907c] block mb-1">
                  Internal Concierge &amp; Repertoire Notes
                </label>
                <textarea
                  rows={2}
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Record client preferences, custom violin pieces, private jet riders, or contract details..."
                  className="w-full bg-[#1c1b1e] text-xs text-white p-2 rounded-lg border border-[#4d4635] focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSaveModalUpdates}
                  className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  <span>Save Status &amp; Notes</span>
                </button>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-2 flex items-center justify-between border-t border-[#353437]">
              <a
                href={`https://wa.me/91${selectedLead.phone.replace(/\D/g, '')}?text=Dear%20${encodeURIComponent(selectedLead.fullName)},%20greetings%20from%20The%20Royal%20Band%20Concierge%20Desk.%20Regarding%20your%20inquiry%20for%20${encodeURIComponent(selectedLead.occasionType)}%20on%20${encodeURIComponent(selectedLead.eventDate)}:`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#25d366]/20 hover:bg-[#25d366]/30 text-[#25d366] text-xs font-bold border border-[#25d366]/40 flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Message on WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-lg bg-[#2a2a2c] text-xs font-semibold text-[#e5e1e4] hover:bg-[#353437] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECORD NEW MANUAL INQUIRY MODAL */}
      {isNewLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <form 
            onSubmit={handleCreateManualLead}
            className="w-full max-w-xl bg-[#201f22] border border-[#4d4635] rounded-2xl p-6 shadow-2xl flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-[#353437] pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">add_circle</span>
                <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
                  Record New Booking Inquiry
                </h3>
              </div>
              <button 
                type="button"
                onClick={() => setIsNewLeadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center text-white cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Title</label>
                <select
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                  <option value="Royal Family">Royal Family</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] text-[#99907c] block mb-1">Full Client Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharaja Vikram Rathore"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Private Email</label>
                <input
                  type="email"
                  placeholder="client@palaceestate.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Occasion Type</label>
                <select
                  value={newOccasion}
                  onChange={(e) => setNewOccasion(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                >
                  <option value="Royal Wedding / Sangeet">Royal Wedding / Sangeet</option>
                  <option value="Baraat Symphony Fanfare">Baraat Symphony Fanfare</option>
                  <option value="Corporate Sovereign Gala">Corporate Sovereign Gala</option>
                  <option value="Palace Soirée & Cocktail">Palace Soirée &amp; Cocktail</option>
                  <option value="Private Estate Reception">Private Estate Reception</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Destination City</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Event Date</label>
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Timing Slot</label>
                <input
                  type="text"
                  value={newTimingSlot}
                  onChange={(e) => setNewTimingSlot(e.target.value)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#99907c] block mb-1">Guest Scale</label>
                <input
                  type="number"
                  value={newGuestCount}
                  onChange={(e) => setNewGuestCount(parseInt(e.target.value, 10) || 100)}
                  className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#99907c] block mb-1">Ensemble Tier</label>
              <select
                value={newPackage}
                onChange={(e) => setNewPackage(e.target.value)}
                className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
              >
                <option value="The Royal Grandeur (16-Piece)">The Royal Grandeur (16-Piece)</option>
                <option value="Imperial Heritage Fanfare (12-Piece)">Imperial Heritage Fanfare (12-Piece)</option>
                <option value="Sovereign Chamber Strings (8-Piece)">Sovereign Chamber Strings (8-Piece)</option>
                <option value="Bespoke Palace Mega-Orchestra (24-Piece)">Bespoke Palace Mega-Orchestra (24-Piece)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] text-[#99907c] block mb-1">Special Client Requests / Repertoire</label>
              <textarea
                rows={2}
                value={newSpecialRequests}
                onChange={(e) => setNewSpecialRequests(e.target.value)}
                placeholder="Specific musical entrance requests, VIP protocol notes..."
                className="w-full bg-[#141418] text-xs text-white p-2 rounded-lg border border-[#4d4635]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#353437]">
              <button
                type="button"
                onClick={() => setIsNewLeadModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#2a2a2c] text-xs font-semibold text-[#e5e1e4]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider hover:brightness-105 active:scale-95"
              >
                Store Inquiry
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
