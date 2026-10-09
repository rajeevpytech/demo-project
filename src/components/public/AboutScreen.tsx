import React from 'react';
import { useCms } from '../../context/CmsContext';

export const AboutScreen: React.FC = () => {
  const { settings, audioTracks, activeTrack, isPlaying, playTrack, togglePlayPause, navigateTo } = useCms();

  const achievements = [
    { label: 'Palace Galas Delivered', value: '850+', icon: 'castle' },
    { label: 'Years of Heritage Mastery', value: '14+ Yrs', icon: 'history_edu' },
    { label: 'Client Acclaim Rating', value: '4.98 / 5', icon: 'star' },
    { label: 'Stationed City Hubs', value: '4 Hubs', icon: 'location_city' }
  ];

  const ensembleSections = [
    {
      title: 'The Sovereign Brass Fanfare',
      description: 'French horns, trumpets, and trombones creating heart-thumping, regal procession anthems and palace entrance fanfares.',
      icon: 'music_note'
    },
    {
      title: 'Sacred Strings & Classical Soloists',
      description: 'Bespoke violinists, cellists, and acoustic bansuri players weaving serene, emotive melodies for royal pheras and sunset cocktail walks.',
      icon: 'piano'
    },
    {
      title: 'Royal Rhythm Section & Dhols',
      description: 'Master folk dhol players, Latin percussionists, and contemporary drummers calibrated to ignite high-energy palace dance floors.',
      icon: 'equalizer'
    },
    {
      title: 'Dual Lead Vocalists & Sufi Maestros',
      description: 'Versatile vocalists transitioning seamlessly from timeless Awadhi ghazals and spiritual Sufi kalams to Bollywood anthems.',
      icon: 'mic'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-28 max-w-6xl mx-auto px-4 sm:px-6 selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Top Breadcrumb & Status Ribbon */}
      <div className="mb-4 mt-2 flex items-center justify-between text-xs text-[#d0c5af]">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateTo('home')}
            className="hover:text-[#f2ca50] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#f2ca50] font-bold">About The Royal Band</span>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#201f22] border border-[#4d4635]/60 text-[10px] text-[#f2ca50] font-mono font-bold uppercase tracking-wider">
          Est. 2012 &bull; 850+ Galas
        </span>
      </div>

      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-[#1c1b1e] border border-[#4d4635]/50 shadow-2xl p-6 sm:p-10 mb-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#f2ca50]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a2a2c] border border-[#4d4635]/60 text-[#f2ca50] text-[11px] font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Symphonies of Grandeur</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl text-[#f2ca50] font-bold leading-tight">
              India’s Sovereign Live Symphony Orchestra
            </h1>

            <p className="text-sm sm:text-base text-[#d0c5af] leading-relaxed">
              Founded in 2012 by Principal Director Vikramaditya Rathore, <strong>The Royal Band</strong> was born from a desire to resurrect the authentic grandeur of royal palace orchestras and fuse it with modern acoustic brilliance.
            </p>

            <p className="text-xs sm:text-sm text-[#99907c] leading-relaxed">
              From majestic Baraat brass fanfares reverberating through historic courtyards to intimate chamber strings under candlelit arches, we deliver unparalleled live music experiences across Agra, Mathura, Lucknow, Jodhpur, and global destination compounds.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('service1')}
                className="px-5 py-2.5 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Events &amp; Services</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="px-5 py-2.5 rounded-xl bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] font-bold text-xs uppercase tracking-wider hover:bg-[#353437] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Check Date Availability</span>
                <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#4d4635]/60 shadow-2xl">
              <img
                src={settings.directorPhotoUrl}
                alt="Principal Director Vikramaditya Rathore"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#141418]/90 backdrop-blur-md border border-[#4d4635]/40 text-left">
                <p className="text-xs font-bold text-[#f2ca50] font-serif-luxury">{settings.directorName}</p>
                <p className="text-[10px] text-[#d0c5af]">{settings.directorTitle}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-10">
        {achievements.map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">{item.icon}</span>
              <span className="text-[10px] font-mono text-[#99907c] uppercase">Verified</span>
            </div>
            <div className="mt-3">
              <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white block">{item.value}</span>
              <span className="text-[11px] text-[#d4c78f] font-semibold block mt-0.5">{item.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* The Musical Ensemble Sections */}
      <section className="space-y-4 mb-10">
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Master Instrumentation</span>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white mt-1">
            Our Virtuoso Ensembles
          </h2>
          <p className="text-xs text-[#d0c5af] mt-1.5">
            Every performance features handpicked conservatory musicians and hereditary royal maestros.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ensembleSections.map((sec, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/40 hover:border-[#f2ca50]/50 transition-all space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#2a2a2c] text-[#f2ca50] flex items-center justify-center border border-[#4d4635]">
                <span className="material-symbols-outlined text-[20px]">{sec.icon}</span>
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50] pt-1">{sec.title}</h3>
              <p className="text-xs text-[#d0c5af] leading-relaxed">{sec.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Acoustic Signature & Live Audio Audition Bar */}
      {audioTracks && audioTracks.length > 0 && (
        <section className="p-6 rounded-2xl bg-gradient-to-r from-[#1c1b1e] via-[#242226] to-[#1c1b1e] border border-[#f2ca50]/40 shadow-xl mb-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">graphic_eq</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f2ca50]">Live Performance Audio Vault</span>
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-white">
                {activeTrack ? activeTrack.title : 'Live Sovereign Auditions'}
              </h3>
              <p className="text-xs text-[#d0c5af]">
                Recorded directly during live palace celebrations at {activeTrack?.venueSnippet || 'Jaipur & Jodhpur'}.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-[#f2ca50] text-[#131315] flex items-center justify-center font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Track' : 'Play Track'}
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <div className="flex gap-1.5 overflow-x-auto max-w-xs sm:max-w-md no-scrollbar">
                {audioTracks.slice(0, 3).map((tr) => (
                  <button
                    key={tr.id}
                    onClick={() => playTrack(tr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeTrack?.id === tr.id
                        ? 'bg-[#f2ca50] text-[#131315] font-bold'
                        : 'bg-[#2a2a2c] text-[#d0c5af] hover:text-white'
                    }`}
                  >
                    {tr.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Direct Booking Call to Action */}
      <section className="text-center p-8 rounded-3xl bg-[#141418] border border-[#4d4635] shadow-2xl space-y-4">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#f2ca50]">Direct Concierge</span>
        <h2 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-white">
          Secure Your Performance Date
        </h2>
        <p className="text-xs sm:text-sm text-[#d0c5af] max-w-lg mx-auto leading-relaxed">
          Our resident troupes and maestri maintain strict exclusivity, accepting only one sovereign celebration per date per city.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('contact')}
            className="px-6 py-3 rounded-xl bg-[#d4af37] text-[#131315] font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[17px]">event_available</span>
            <span>Reserve Date &amp; Enquire</span>
          </button>
          <a
            href={`tel:${settings.phone.replace(/\s+/g, '')}`}
            className="px-6 py-3 rounded-xl bg-[#2a2a2c] text-[#f2ca50] border border-[#4d4635] font-bold text-xs uppercase tracking-wider hover:bg-[#353437] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[17px]">call</span>
            <span>Direct Call: {settings.phone}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
