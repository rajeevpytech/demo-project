import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';
import { BlogPostModal } from './BlogPostModal';

export const BlogScreen: React.FC = () => {
  const { blogPosts, blogCategories, setActivePublicTab } = useCms();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostForReading, setActivePostForReading] = useState<BlogPost | null>(null);

  // Filter only published articles for public view, plus show scheduled ones with distinct badge if desired
  const visiblePosts = blogPosts.filter(post => {
    const isPubliclyVisible = post.status === 'published' || post.status === 'scheduled';
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return isPubliclyVisible && matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full px-4 sm:px-6 pb-28 gap-y-6 max-w-5xl mx-auto selection:bg-[#d4af37] selection:text-[#131315]">
      {/* Subheader Banner */}
      <div className="relative overflow-hidden rounded-xl bg-[#1c1b1e] border border-[#4d4635]/50 p-5 sm:p-7 shadow-xl mt-2">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#f2ca50]/5 blur-3xl pointer-events-none"></div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#2a2a2c] text-[#f2ca50] shadow-sm border border-[#4d4635]/40">
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
          </span>
          <span className="font-sans-luxury text-[11px] font-bold text-[#d4c78f] tracking-widest uppercase">
            The Sovereign Chronicle
          </span>
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-4xl text-[#e5e1e4] font-medium leading-tight">
          Editorial Notes &amp; Acoustic Architecture
        </h1>
        <p className="font-sans-luxury text-xs sm:text-sm text-[#d0c5af] mt-2 leading-relaxed max-w-2xl">
          Authoritative guides on luxury palace acoustics, 16-piece baraat brass arrangements, sacred wedding overtures, and sound engineering in heritage sandstone courtyards.
        </p>

        {/* Quick Highlights Ribbon */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pt-1">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2a2c]/90 border border-[#4d4635]/40 text-[#e5e1e4] text-xs flex-shrink-0">
            <span className="material-symbols-outlined text-[#f2ca50] text-[15px]">verified</span>
            <span className="text-[#f1e3a9]">Curated by Vikramaditya Rathore</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2a2c]/90 border border-[#4d4635]/40 text-[#e5e1e4] text-xs flex-shrink-0">
            <span className="material-symbols-outlined text-[#f2ca50] text-[15px]">article</span>
            <span className="text-[#f1e3a9]">{blogPosts.length} Editorial Articles</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2a2c]/90 border border-[#4d4635]/40 text-[#e5e1e4] text-xs flex-shrink-0">
            <span className="material-symbols-outlined text-[#f2ca50] text-[15px]">code</span>
            <span className="text-[#f1e3a9]">Schema.org/Article Compliant</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                : 'bg-[#1c1b1e] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
            }`}
          >
            All Insights ({blogPosts.length})
          </button>
          {blogCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                  : 'bg-[#1c1b1e] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#99907c] text-[18px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search topics or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#141418] text-xs text-[#e5e1e4] pl-9 pr-3 py-2 rounded-lg border border-[#4d4635] focus:outline-none focus:border-[#f2ca50]"
          />
        </div>
      </div>

      {/* Featured Leading Article (If first is published) */}
      {visiblePosts.length > 0 && !searchQuery && selectedCategory === 'all' && (
        <div 
          onClick={() => setActivePostForReading(visiblePosts[0])}
          className="relative rounded-2xl bg-[#1c1b1e] border border-[#4d4635]/60 overflow-hidden shadow-2xl cursor-pointer group hover:border-[#f2ca50]/70 transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative aspect-video md:aspect-auto h-full min-h-[260px] bg-[#0e0e10] overflow-hidden">
              <img
                src={visiblePosts[0].coverImage}
                alt={visiblePosts[0].coverImageAlt || visiblePosts[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1c1b1e]/90 via-transparent to-transparent"></div>
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] text-[10px] font-extrabold uppercase tracking-widest shadow">
                Featured Editorial
              </span>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#d4c78f]">
                  <span className="uppercase font-bold tracking-wider">{visiblePosts[0].category}</span>
                  <span>&bull;</span>
                  <span>⏱️ {visiblePosts[0].readingTimeMinutes || 5} min read</span>
                </div>

                <h2 className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-[#f2ca50] transition-colors leading-snug">
                  {visiblePosts[0].title}
                </h2>

                <p className="text-xs sm:text-sm text-[#d0c5af] leading-relaxed line-clamp-3">
                  {visiblePosts[0].summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#353437]">
                <div className="flex items-center gap-2 text-xs text-[#99907c]">
                  <span>By {visiblePosts[0].authorName}</span>
                  <span>&bull;</span>
                  <span>{visiblePosts[0].publishedAt}</span>
                </div>

                <span className="text-xs font-bold text-[#f2ca50] group-hover:underline flex items-center gap-1">
                  Read Article
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Remaining Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {(searchQuery || selectedCategory !== 'all' ? visiblePosts : visiblePosts.slice(1)).map(post => {
          const isScheduled = post.status === 'scheduled';

          return (
            <div
              key={post.id}
              onClick={() => setActivePostForReading(post)}
              className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden shadow-lg flex flex-col justify-between cursor-pointer group hover:border-[#f2ca50]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                <div className="relative aspect-video w-full bg-[#0e0e10] overflow-hidden">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent"></div>

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded bg-[#0e0e10]/85 text-[10px] font-bold text-[#f2ca50] border border-[#4d4635]/40 uppercase tracking-wider backdrop-blur-md">
                      {post.category}
                    </span>

                    {isScheduled && (
                      <span className="px-2 py-0.5 rounded bg-amber-950/90 text-amber-300 text-[10px] font-bold border border-amber-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[11px]">schedule</span>
                        <span>Scheduled</span>
                      </span>
                    )}
                  </div>

                  <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#f1e3a9] bg-[#0e0e10]/80 px-2 py-0.5 rounded backdrop-blur-sm">
                    ⏱️ {post.readingTimeMinutes || 4} min read
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-serif-luxury text-base font-bold text-[#e5e1e4] leading-snug group-hover:text-[#f2ca50] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-[#99907c] pt-2">
                    <span>By {post.authorName}</span>
                    <span>&bull;</span>
                    <span>{post.publishedAt}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#141418] border-t border-[#353437] flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#d4c78f] font-mono">
                  #{post.tags?.[0] || 'RoyalMusic'}
                </span>
                <span className="text-xs font-semibold text-[#f2ca50] group-hover:underline flex items-center gap-0.5">
                  Read Notes
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {visiblePosts.length === 0 && (
        <div className="p-12 text-center rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 space-y-3">
          <span className="material-symbols-outlined text-[#f2ca50] text-[40px]">search_off</span>
          <h3 className="font-serif-luxury text-lg text-white font-bold">No Articles Found</h3>
          <p className="text-xs text-[#d0c5af]">
            No editorial pieces match "{searchQuery}". Try selecting "All Insights".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="px-4 py-2 rounded-lg bg-[#2a2a2c] text-[#f2ca50] text-xs font-bold border border-[#4d4635]"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Reader Modal */}
      <BlogPostModal
        post={activePostForReading}
        onClose={() => setActivePostForReading(null)}
      />
    </div>
  );
};
