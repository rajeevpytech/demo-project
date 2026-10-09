import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Testimonial } from '../../types';

export const TestimonialsManager: React.FC = () => {
  const { testimonials, toggleTestimonialApproval, addTestimonial, showToast } = useCms();
  const [isAdding, setIsAdding] = useState(false);

  // Form state
  const [clientName, setClientName] = useState('');
  const [designation, setDesignation] = useState('Royal Host');
  const [venue, setVenue] = useState('Umaid Bhawan Palace');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !quote) return;

    const newTestimonial: Testimonial = {
      id: `tst-${Date.now()}`,
      clientName,
      designation,
      venue,
      eventDate: "Winter 2025",
      quote,
      rating,
      avatarLetter: clientName.charAt(0).toUpperCase(),
      isApproved: true,
      isFeatured: true
    };

    addTestimonial(newTestimonial);
    setIsAdding(false);
    setClientName('');
    setQuote('');
  };

  return (
    <div className="space-y-5 max-w-6xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40">
        <div>
          <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
            Verified Royal Reviews &amp; Social Proof
          </h2>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Manage verified palace wedding client praise and formal high-society references.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-3.5 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">add_circle</span>
          <span>Add New Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 p-5 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#f2ca50]">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[16px]">star</span>
                  ))}
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  t.isApproved ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {t.isApproved ? 'Approved Live' : 'Pending Review'}
                </span>
              </div>

              <blockquote className="font-serif-luxury text-sm text-[#e5e1e4] italic mt-2 leading-relaxed">
                “{t.quote}”
              </blockquote>
            </div>

            <div className="pt-2 border-t border-[#353437] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">{t.clientName}</span>
                <span className="text-[10px] text-[#99907c]">{t.venue} &bull; {t.eventDate}</span>
              </div>

              <button
                onClick={() => toggleTestimonialApproval(t.id)}
                className="px-2.5 py-1 rounded bg-[#201f22] hover:bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] text-xs font-semibold"
              >
                {t.isApproved ? 'Unpublish' : 'Approve'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Add Verified Client Review
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maharaja Vikramaditya Singhania"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Palace Venue &amp; Event</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Review Quote</label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full bg-[#141418] p-2 rounded border border-[#4d4635] text-white focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded bg-[#2a2a2c] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#d4af37] text-[#131315] font-bold"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
