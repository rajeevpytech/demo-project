import React from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost } from '../../types';

interface BlogPostModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogPostModal: React.FC<BlogPostModalProps> = ({ post, onClose }) => {
  const { setActivePublicTab, showToast } = useCms();

  if (!post) return null;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.origin + `/blog/${post.slug}`);
    showToast("Article permalink copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e10]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#1c1b1e] border border-[#4d4635] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Sticky Header Bar */}
        <div className="h-14 px-5 bg-[#141418] border-b border-[#353437] flex items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#d4c78f]">
            <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">menu_book</span>
            <span className="uppercase tracking-wider">The Sovereign Editorial</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-2.5 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-white text-xs flex items-center gap-1 border border-[#4d4635]"
              title="Copy Article Link"
            >
              <span className="material-symbols-outlined text-[14px]">share</span>
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center text-white hover:text-[#f2ca50] text-lg font-bold"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Cover Hero Banner */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0e0e10] border border-[#4d4635]/40 shadow-lg">
            <img
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-transparent"></div>
            
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full bg-[#f2ca50] text-[#3c2f00] text-xs font-bold uppercase tracking-wider shadow">
                {post.category}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-[#0e0e10]/80 text-[11px] font-mono text-[#f1e3a9] border border-[#4d4635]/40 backdrop-blur-sm">
                ⏱️ {post.readingTimeMinutes || 5} min read
              </span>
            </div>
          </div>

          {/* Title & Metadata */}
          <div className="space-y-3 border-b border-[#353437] pb-5">
            <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-white font-bold leading-tight">
              {post.title}
            </h1>

            <p className="font-sans-luxury text-sm sm:text-base text-[#d4c78f] leading-relaxed italic">
              {post.summary}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-3 pt-2 text-xs text-[#99907c]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#4f471b] text-[#f2ca50] flex items-center justify-center font-bold text-xs">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <span className="text-white font-semibold">{post.authorName}</span>
                  <span className="text-[10px] text-[#99907c] block">Principal Curator</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-[11px]">
                <span>Published: {post.publishedAt}</span>
                {post.viewsCount ? (
                  <>
                    <span>&bull;</span>
                    <span>{post.viewsCount.toLocaleString()} views</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          {/* Render Rich HTML Content */}
          <div 
            className="prose prose-invert max-w-none text-[#e5e1e4] space-y-4 text-sm sm:text-base leading-relaxed [&>h2]:font-serif-luxury [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:text-[#f2ca50] [&>h2]:font-bold [&>h2]:mt-6 [&>h3]:font-serif-luxury [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:text-[#d4c78f] [&>h3]:font-semibold [&>h3]:mt-4 [&>blockquote]:border-l-4 [&>blockquote]:border-[#f2ca50] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-[#f1e3a9] [&>blockquote]:bg-[#201f22]/60 [&>blockquote]:py-2 [&>blockquote]:rounded-r-lg [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>a]:text-[#f2ca50] [&>a]:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Ribbon */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-4 border-t border-[#353437] flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#99907c] font-semibold">Topics:</span>
              {post.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded bg-[#201f22] border border-[#4d4635]/40 text-[#d4c78f] text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Article Schema Microdata Verification */}
          <div className="p-3 rounded-lg bg-[#141418] border border-[#4d4635]/30 text-[11px] text-[#99907c] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
              <span>Valid Schema.org/Article &bull; Canonical: {post.seo.canonicalUrl}</span>
            </div>
            <span className="font-mono text-[#d4c78f]">{post.category}</span>
          </div>

          {/* Bottom Call to Action Card */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#201f22] via-[#2a2a2c] to-[#201f22] border border-[#f2ca50]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#f2ca50]">
                Experience This Artistry Live
              </h3>
              <p className="text-xs text-[#d0c5af] mt-1 max-w-md">
                Consult with Principal Director Vikramaditya Rathore to reserve our grand symphony for your date.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                setActivePublicTab('book');
              }}
              className="px-5 py-2.5 rounded-lg bg-[#f2ca50] text-[#3c2f00] font-bold text-xs sm:text-sm uppercase tracking-wider hover:brightness-105 active:scale-95 transition-all shadow-md flex-shrink-0 cursor-pointer"
            >
              Reserve Performance Date
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
