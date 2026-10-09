import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { BlogPost, BlogCategory } from '../../types';

export const BlogManager: React.FC = () => {
  const { 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost, 
    blogCategories, 
    addBlogCategory, 
    deleteBlogCategory,
    mediaAssets,
    currentUser,
    showToast 
  } = useCms();

  // View state
  const [activeStatusFilter, setActiveStatusFilter] = useState<'all' | 'published' | 'scheduled' | 'draft'>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubTab, setActiveSubTab] = useState<'posts' | 'categories'>('posts');

  // Editor Modal state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview' | 'seo'>('write');
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Reader Preview Modal
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);

  // Category modal
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState(blogCategories[0]?.name || 'Wedding Traditions');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [coverImageAlt, setCoverImageAlt] = useState('');
  const [status, setStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [scheduledPublishDate, setScheduledPublishDate] = useState('2026-10-15');
  const [scheduledPublishTime, setScheduledPublishTime] = useState('09:00 AM');
  const [authorName, setAuthorName] = useState(currentUser.name);
  const [tagsStr, setTagsStr] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  // Helper to calculate reading time
  const calculateReadingTime = (text: string) => {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  const openNewPost = () => {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setCategory(blogCategories[0]?.name || 'Wedding Traditions');
    setSummary('');
    setContent(`<h2>The Grand Symphony of Royal Celebrations</h2>
<p>When curating live orchestral entertainment for grand heritage courtyards, precision acoustic calibration is essential. Our maestri ensure that every melody floats gracefully through historic corridors.</p>

<h3>Bespoke Instrumentation</h3>
<p>From the resonant brass of French horns to emotive live bansuri and violin duets, our ensemble curates melodies tailored for royal entrances.</p>
<blockquote>“Artistry and hospitality must merge seamlessly to create an unforgettable evening.”</blockquote>

<h3>Guest Experience</h3>
<p>Guests are guided through dynamic musical crescendos, building up from serene banquet overtures to an electrifying live fusion dance floor.</p>`);
    setCoverImage('https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ');
    setCoverImageAlt('Royal Band live orchestra performance in palace ballroom');
    setStatus('published');
    setScheduledPublishDate('2026-10-15');
    setScheduledPublishTime('09:00 AM');
    setAuthorName(currentUser.name);
    setTagsStr('Live Symphony, Royal Weddings, Sangeet Curation');
    setFocusKeyword('luxury royal wedding live band');
    setMetaTitle('');
    setMetaDescription('');
    setEditorTab('write');
    setIsEditorOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setCategory(post.category);
    setSummary(post.summary);
    setContent(post.content);
    setCoverImage(post.coverImage);
    setCoverImageAlt(post.coverImageAlt || post.title);
    setStatus(post.status || 'published');
    setScheduledPublishDate(post.scheduledPublishDate || '2026-10-15');
    setScheduledPublishTime(post.scheduledPublishTime || '09:00 AM');
    setAuthorName(post.authorName);
    setTagsStr(post.tags?.join(', ') || '');
    setFocusKeyword(post.focusKeyword || '');
    setMetaTitle(post.seo?.metaTitle || '');
    setMetaDescription(post.seo?.metaDescription || '');
    setEditorTab('write');
    setIsEditorOpen(true);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPostId || !slug) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''));
    }
    if (!metaTitle) {
      setMetaTitle(`${val} | The Royal Band`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          setCoverImage(loadEvent.target.result as string);
          showToast(`Thumbnail loaded: ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Rich Text Insertion Helper
  const insertRichTag = (tagStart: string, tagEnd: string = '') => {
    const textarea = document.getElementById('post-content-editor') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;
    const selected = current.substring(start, end) || 'text';

    const replacement = `${tagStart}${selected}${tagEnd}`;
    const nextVal = current.substring(0, start) + replacement + current.substring(end);
    setContent(nextVal);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagStart.length, start + tagStart.length + selected.length);
    }, 50);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Article title is required.");
      return;
    }

    const currentSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const readingTime = calculateReadingTime(content);
    const resolvedMetaTitle = metaTitle || `${title} | The Royal Band Editorial`;
    const resolvedMetaDesc = metaDescription || summary.slice(0, 155);

    const postData: BlogPost = {
      id: editingPostId || `blog-${Date.now()}`,
      title,
      slug: currentSlug,
      summary: summary || title,
      content,
      coverImage: coverImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ',
      coverImageAlt: coverImageAlt || title,
      category,
      authorName: authorName || currentUser.name,
      publishedAt: status === 'scheduled' ? scheduledPublishDate : new Date().toISOString().split('T')[0],
      status,
      scheduledPublishDate: status === 'scheduled' ? scheduledPublishDate : undefined,
      scheduledPublishTime: status === 'scheduled' ? scheduledPublishTime : undefined,
      readingTimeMinutes: readingTime,
      tags: tagsStr.split(',').map(s => s.trim()).filter(Boolean),
      focusKeyword,
      viewsCount: editingPostId ? (blogPosts.find(b => b.id === editingPostId)?.viewsCount || 0) : 0,
      seo: {
        metaTitle: resolvedMetaTitle,
        metaDescription: resolvedMetaDesc,
        slug: currentSlug,
        canonicalUrl: `https://theroyalband.com/blog/${currentSlug}`,
        ogTitle: title,
        ogDescription: resolvedMetaDesc,
        ogImageUrl: coverImage,
        twitterCard: 'summary_large_image',
        isNoIndex: false,
        isNoFollow: false,
        schemaType: 'Article'
      }
    };

    if (editingPostId) {
      updateBlogPost(editingPostId, postData);
      showToast(`Article "${title}" updated successfully!`);
    } else {
      addBlogPost(postData);
      showToast(status === 'scheduled' 
        ? `Article scheduled for ${scheduledPublishDate} at ${scheduledPublishTime}!` 
        : `Article "${title}" published live!`
      );
    }

    setIsEditorOpen(false);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const newCat: BlogCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName,
      slug: newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc
    };

    addBlogCategory(newCat);
    setIsAddCategoryOpen(false);
    setNewCatName('');
    setNewCatDesc('');
  };

  // Filter posts
  const filteredPosts = blogPosts.filter(p => {
    const matchesStatus = activeStatusFilter === 'all' || p.status === activeStatusFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f2ca50] text-[22px]">article</span>
            <h2 className="font-serif-luxury text-xl font-bold text-[#f2ca50]">
              Blog &amp; Editorial Management
            </h2>
          </div>
          <p className="text-xs text-[#d0c5af] mt-0.5">
            Rich-text publishing suite with featured thumbnail uploading, category taxonomy, scheduled releases, and Article Schema.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveSubTab(activeSubTab === 'posts' ? 'categories' : 'posts')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold border border-[#4d4635] flex items-center gap-1.5 transition-all ${
              activeSubTab === 'categories' ? 'bg-[#4f471b] text-[#f1e3a9]' : 'bg-[#201f22] text-[#d0c5af] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">category</span>
            <span>{activeSubTab === 'categories' ? 'View Articles' : `Categories (${blogCategories.length})`}</span>
          </button>

          <button
            onClick={openNewPost}
            className="px-4 py-2 rounded-lg bg-[#d4af37] text-[#131315] font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Write New Article</span>
          </button>
        </div>
      </div>

      {activeSubTab === 'categories' ? (
        /* CATEGORIES MANAGEMENT SECTION */
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#201f22] border border-[#4d4635]/40">
            <div>
              <h3 className="font-serif-luxury text-base font-bold text-[#e5e1e4]">
                Editorial Categories Taxonomy
              </h3>
              <p className="text-xs text-[#d0c5af]">Organize wedding traditions, sound engineering, and bridal guides.</p>
            </div>
            <button
              onClick={() => setIsAddCategoryOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#f2ca50] text-[#3c2f00] font-bold text-xs flex items-center gap-1 shadow"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>New Category</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {blogCategories.map(cat => {
              const count = blogPosts.filter(p => p.category === cat.name).length;
              return (
                <div key={cat.id} className="p-4 rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 flex flex-col justify-between gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif-luxury text-sm font-bold text-[#f2ca50]">{cat.name}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#2a2a2c] text-[10px] font-bold text-[#d4c78f] border border-[#4d4635]/30">
                        {count} Posts
                      </span>
                    </div>
                    <span className="text-[10px] text-[#99907c] font-mono block">slug: /{cat.slug}</span>
                    <p className="text-xs text-[#d0c5af] mt-1.5 line-clamp-2">{cat.description || 'No description provided.'}</p>
                  </div>

                  <div className="pt-2 border-t border-[#353437] flex justify-end">
                    <button
                      onClick={() => deleteBlogCategory(cat.id)}
                      className="text-[11px] text-red-400 hover:text-red-300 font-semibold cursor-pointer"
                    >
                      Delete Category
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ARTICLES LISTING SECTION */
        <div className="space-y-4 animate-in fade-in">
          {/* Status Filter Ribbon & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar">
              {[
                { id: 'all', label: 'All Articles', count: blogPosts.length },
                { id: 'published', label: 'Published', count: blogPosts.filter(p => p.status === 'published').length },
                { id: 'scheduled', label: 'Scheduled', count: blogPosts.filter(p => p.status === 'scheduled').length },
                { id: 'draft', label: 'Drafts', count: blogPosts.filter(p => p.status === 'draft').length },
              ].map(st => (
                <button
                  key={st.id}
                  onClick={() => setActiveStatusFilter(st.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeStatusFilter === st.id
                      ? 'bg-[#f2ca50] text-[#3c2f00] font-bold shadow-sm'
                      : 'bg-[#201f22] text-[#d0c5af] hover:bg-[#2a2a2c] border border-[#4d4635]/40'
                  }`}
                >
                  <span>{st.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeStatusFilter === st.id ? 'bg-[#3c2f00] text-[#f2ca50]' : 'bg-[#141418] text-[#99907c]'}`}>
                    {st.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="bg-[#1c1b1e] text-xs text-[#d0c5af] px-3 py-1.5 rounded-lg border border-[#4d4635] focus:outline-none"
              >
                <option value="all">All Categories</option>
                {blogCategories.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-48 bg-[#0e0e10] text-xs text-[#e5e1e4] px-3 py-1.5 rounded-lg border border-[#4d4635] focus:outline-none"
              />
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map(post => {
              const isScheduled = post.status === 'scheduled';
              const isPublished = post.status === 'published';

              return (
                <div 
                  key={post.id}
                  className="rounded-xl bg-[#1c1b1e] border border-[#4d4635]/40 overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#f2ca50]/50 transition-colors"
                >
                  <div>
                    {/* Featured Thumbnail */}
                    <div className="relative aspect-video w-full bg-[#0e0e10] overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.coverImageAlt || post.title} 
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1e] via-transparent to-transparent"></div>

                      {/* Status Badge */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-[#0e0e10]/85 backdrop-blur-md text-[10px] font-bold text-[#f2ca50] border border-[#4d4635]/40 uppercase tracking-wider">
                          {post.category}
                        </span>

                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 backdrop-blur-md ${
                          isPublished ? 'bg-emerald-950/90 text-emerald-300 border border-emerald-700' :
                          isScheduled ? 'bg-amber-950/90 text-amber-300 border border-amber-700' :
                          'bg-zinc-900/90 text-zinc-300 border border-zinc-700'
                        }`}>
                          <span className="material-symbols-outlined text-[12px]">
                            {isPublished ? 'check_circle' : isScheduled ? 'schedule' : 'edit_note'}
                          </span>
                          <span>{post.status}</span>
                        </span>
                      </div>

                      {/* Reading Time */}
                      <span className="absolute bottom-2 right-2 text-[10px] font-mono text-[#f1e3a9] bg-[#0e0e10]/80 px-2 py-0.5 rounded">
                        ⏱️ {post.readingTimeMinutes || calculateReadingTime(post.content)} min read
                      </span>
                    </div>

                    <div className="p-4 space-y-2">
                      {isScheduled && post.scheduledPublishDate && (
                        <div className="p-2 rounded bg-[#4f471b]/60 border border-[#f2ca50]/40 text-[#f1e3a9] text-[11px] flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[15px] text-[#f2ca50]">alarm</span>
                          <span>Release: <strong>{post.scheduledPublishDate}</strong> at {post.scheduledPublishTime || '09:00 AM'}</span>
                        </div>
                      )}

                      <h3 className="font-serif-luxury text-base font-bold text-[#e5e1e4] leading-snug group-hover:text-[#f2ca50] transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#d0c5af] line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-[#99907c] pt-1">
                        <span>By {post.authorName}</span>
                        <span>&bull;</span>
                        <span>Published: {post.publishedAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="p-3 bg-[#141418] border-t border-[#353437] flex items-center justify-between text-xs">
                    <button
                      onClick={() => setPreviewPost(post)}
                      className="text-[#f2ca50] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[14px]">visibility</span>
                      <span>Reader View</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditPost(post)}
                        className="px-2.5 py-1 rounded bg-[#2a2a2c] hover:bg-[#353437] text-white font-medium text-xs border border-[#4d4635]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteBlogPost(post.id)}
                        className="p-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-800"
                        title="Delete Article"
                      >
                        <span className="material-symbols-outlined text-[14px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FULL RICH-TEXT ARTICLE EDITOR MODAL */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="w-full max-w-4xl max-h-[95vh] bg-[#1c1b1e] border border-[#4d4635] rounded-xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Top Bar */}
            <div className="h-14 px-5 bg-[#141418] border-b border-[#353437] flex items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">edit_document</span>
                <span className="font-serif-luxury text-base font-bold text-white">
                  {editingPostId ? 'Edit Article & Thumbnail' : 'Compose New Article'}
                </span>
              </div>

              {/* Editor Tabs: Write, Reader Preview, SEO */}
              <div className="flex items-center bg-[#201f22] rounded-lg p-0.5 border border-[#4d4635]/50">
                <button
                  type="button"
                  onClick={() => setEditorTab('write')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${editorTab === 'write' ? 'bg-[#d4af37] text-[#131315] font-bold' : 'text-[#d0c5af]'}`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('preview')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${editorTab === 'preview' ? 'bg-[#d4af37] text-[#131315] font-bold' : 'text-[#d0c5af]'}`}
                >
                  Live Preview
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('seo')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${editorTab === 'seo' ? 'bg-[#d4af37] text-[#131315] font-bold' : 'text-[#d0c5af]'}`}
                >
                  SEO &amp; GEO
                </button>
              </div>

              <button 
                onClick={() => setIsEditorOpen(false)}
                className="w-8 h-8 rounded-full bg-[#2a2a2c] flex items-center justify-center text-white hover:text-[#f2ca50]"
              >
                &times;
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePost} className="flex-1 flex flex-col overflow-y-auto p-5 gap-4">
              {editorTab === 'write' && (
                <div className="space-y-4 text-xs">
                  {/* Title & Slug */}
                  <div className="space-y-2">
                    <label className="block text-[#d4c78f] font-bold uppercase tracking-wider">
                      Article Headline
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Sovereign Art of Royal Baraats: 16-Piece Brass Symphony"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full bg-[#141418] text-sm sm:text-base font-serif-luxury font-bold p-3 rounded-lg border border-[#4d4635] text-white focus:outline-none focus:border-[#f2ca50]"
                    />

                    <div className="flex items-center gap-2 text-[11px] text-[#99907c]">
                      <span>Permalink Slug:</span>
                      <span className="text-[#f2ca50] font-mono">https://theroyalband.com/blog/</span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="bg-[#141418] text-[#f2ca50] font-mono px-2 py-0.5 rounded border border-[#4d4635] focus:outline-none text-[11px]"
                      />
                    </div>
                  </div>

                  {/* Taxonomy & Status Ribbon */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-[#141418] border border-[#4d4635]/40">
                    <div>
                      <label className="block text-[#d4c78f] font-bold uppercase mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#201f22] text-white p-2 rounded border border-[#4d4635] focus:outline-none"
                      >
                        {blogCategories.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#d4c78f] font-bold uppercase mb-1">Publishing Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as any)}
                        className={`w-full p-2 rounded border font-bold uppercase focus:outline-none ${
                          status === 'published' ? 'bg-emerald-950 text-emerald-300 border-emerald-700' :
                          status === 'scheduled' ? 'bg-amber-950 text-amber-300 border-amber-700' :
                          'bg-[#201f22] text-zinc-300 border-[#4d4635]'
                        }`}
                      >
                        <option value="published">Published (Instant Live)</option>
                        <option value="scheduled">Scheduled (Future Release)</option>
                        <option value="draft">Draft (Save Unlisted)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[#d4c78f] font-bold uppercase mb-1">Author Attribution</label>
                      <input
                        type="text"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        className="w-full bg-[#201f22] text-white p-2 rounded border border-[#4d4635] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Scheduled Date/Time picker (Shown when status === 'scheduled') */}
                  {status === 'scheduled' && (
                    <div className="p-3.5 rounded-lg bg-[#4f471b]/40 border border-[#f2ca50] flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">calendar_clock</span>
                        <div>
                          <span className="text-xs font-bold text-[#f1e3a9] block">Scheduled Automated Release</span>
                          <span className="text-[10px] text-[#d0c5af]">Article will transition to Published at the target date &amp; time.</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          type="date"
                          value={scheduledPublishDate}
                          onChange={(e) => setScheduledPublishDate(e.target.value)}
                          className="bg-[#141418] text-white p-2 rounded border border-[#4d4635] text-xs"
                        />
                        <input
                          type="text"
                          value={scheduledPublishTime}
                          onChange={(e) => setScheduledPublishTime(e.target.value)}
                          placeholder="09:00 AM"
                          className="w-24 bg-[#141418] text-white p-2 rounded border border-[#4d4635] text-xs text-center font-mono"
                        />
                      </div>
                    </div>
                  )}

                  {/* FEATURED POST THUMBNAIL UPLOAD & MANAGEMENT */}
                  <div className="p-4 rounded-xl bg-[#141418] border border-[#4d4635]/40 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">add_photo_alternate</span>
                        <span className="text-xs font-bold text-[#f2ca50] uppercase tracking-wider">
                          Featured Post Thumbnail
                        </span>
                      </div>
                      <span className="text-[10px] text-[#99907c]">Recommended: 1200x675 (16:9 Aspect Ratio)</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
                      {/* Image Preview Box */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-[#0e0e10] border border-[#4d4635]">
                        {coverImage ? (
                          <img src={coverImage} alt="Thumbnail preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#99907c] text-xs">
                            No thumbnail selected
                          </div>
                        )}
                      </div>

                      {/* Upload Controls */}
                      <div className="sm:col-span-2 space-y-2">
                        <div className="flex items-center gap-2">
                          {/* Real Local File Upload */}
                          <label className="flex-1 px-3 py-2 rounded bg-[#2a2a2c] hover:bg-[#353437] text-white text-xs font-semibold border border-[#4d4635] flex items-center justify-center gap-1.5 cursor-pointer">
                            <span className="material-symbols-outlined text-[16px]">upload</span>
                            <span>Upload Local Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                            />
                          </label>

                          {/* Pick from Media Library */}
                          <button
                            type="button"
                            onClick={() => setShowMediaPicker(true)}
                            className="flex-1 px-3 py-2 rounded bg-[#2a2a2c] hover:bg-[#353437] text-[#f2ca50] text-xs font-semibold border border-[#4d4635] flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">perm_media</span>
                            <span>Media Library</span>
                          </button>
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Or paste external high-res image URL..."
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full bg-[#201f22] text-[#d4c78f] p-2 rounded border border-[#4d4635] text-[11px] font-mono focus:outline-none"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="Thumbnail SEO ALT Text (Screen readers & Google Images)"
                            value={coverImageAlt}
                            onChange={(e) => setCoverImageAlt(e.target.value)}
                            className="w-full bg-[#201f22] text-white p-2 rounded border border-[#4d4635] text-xs focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Summary / Lead paragraph */}
                  <div>
                    <label className="block text-[#d4c78f] font-bold uppercase mb-1">
                      Lead Excerpt / Summary (Appears in index cards &amp; social embeds)
                    </label>
                    <textarea
                      rows={2}
                      value={summary}
                      onChange={(e) => setSummary(e.target.value)}
                      placeholder="Brief 2-line summary of the royal musical article..."
                      className="w-full bg-[#141418] text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none"
                    />
                  </div>

                  {/* WYSIWYG / RICH-TEXT TOOLBAR & EDITOR */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-[#d4c78f] font-bold uppercase">
                        Article Body Content (Rich-Text Editor)
                      </label>
                      <span className="text-[11px] text-[#99907c]">
                        Word count: {content.trim().split(/\s+/).filter(Boolean).length} &bull; Approx. {calculateReadingTime(content)} min read
                      </span>
                    </div>

                    {/* Rich Text Toolbar */}
                    <div className="p-2 rounded-t-lg bg-[#201f22] border border-[#4d4635] flex flex-wrap items-center gap-1 text-[#e5e1e4]">
                      <button
                        type="button"
                        onClick={() => insertRichTag('<h2>', '</h2>')}
                        title="Heading 2"
                        className="px-2 py-1 rounded hover:bg-[#2a2a2c] text-xs font-bold text-[#f2ca50]"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<h3>', '</h3>')}
                        title="Heading 3"
                        className="px-2 py-1 rounded hover:bg-[#2a2a2c] text-xs font-bold text-[#f2ca50]"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<h4>', '</h4>')}
                        title="Heading 4"
                        className="px-2 py-1 rounded hover:bg-[#2a2a2c] text-xs font-bold text-[#f2ca50]"
                      >
                        H4
                      </button>
                      <div className="h-4 w-px bg-[#4d4635] mx-1"></div>

                      <button
                        type="button"
                        onClick={() => insertRichTag('<strong>', '</strong>')}
                        title="Bold"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_bold</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<em>', '</em>')}
                        title="Italic"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_italic</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<u>', '</u>')}
                        title="Underline"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_underlined</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<s>', '</s>')}
                        title="Strikethrough"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">strikethrough_s</span>
                      </button>

                      <div className="h-4 w-px bg-[#4d4635] mx-1"></div>

                      <button
                        type="button"
                        onClick={() => insertRichTag('<blockquote>“', '”</blockquote>')}
                        title="Blockquote"
                        className="p-1 rounded hover:bg-[#2a2a2c] text-[#f2ca50]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_quote</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<ul>\n  <li>', '</li>\n</ul>')}
                        title="Bulleted List"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_list_bulleted</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<ol>\n  <li>', '</li>\n</ol>')}
                        title="Numbered List"
                        className="p-1 rounded hover:bg-[#2a2a2c]"
                      >
                        <span className="material-symbols-outlined text-[16px]">format_list_numbered</span>
                      </button>

                      <div className="h-4 w-px bg-[#4d4635] mx-1"></div>

                      <button
                        type="button"
                        onClick={() => insertRichTag('<a href="https://theroyalband.com/book-date">', '</a>')}
                        title="Insert Link"
                        className="p-1 rounded hover:bg-[#2a2a2c] text-[#f2ca50]"
                      >
                        <span className="material-symbols-outlined text-[16px]">link</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => insertRichTag('<p class="my-4"><img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCddgIHrqFDssqCfud3_WvkQVIJut7OHepo7JZKpx03tYogGK5lmKIWdpchElaMr2SttOOOia2n4NFjNxhuVTR_ir0WscCh8xxjIzvdhpdXFwpDdwb77svmIhiSgwaxhmGgJC24IW4WUBuMAIn2VdmYCuk346YTCO529mSPAUHOgVGV265u4wV0Up4zkmVhWLzveBbEHFUF3Ae5TQxu_nSa7vaNwaYfv6OHamncjaV7hgiL134ssxAitQ" alt="Royal Stage" class="rounded-xl w-full" /></p>')}
                        title="Insert In-Article Image"
                        className="p-1 rounded hover:bg-[#2a2a2c] text-[#f2ca50]"
                      >
                        <span className="material-symbols-outlined text-[16px]">image</span>
                      </button>
                    </div>

                    <textarea
                      id="post-content-editor"
                      rows={12}
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your article using rich HTML markup or toolbar buttons above..."
                      className="w-full bg-[#141418] text-white p-3 rounded-b-lg border-x border-b border-[#4d4635] focus:outline-none font-mono text-xs leading-relaxed"
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-[#d4c78f] font-bold uppercase mb-1">
                      Tags (Comma-Separated)
                    </label>
                    <input
                      type="text"
                      value={tagsStr}
                      onChange={(e) => setTagsStr(e.target.value)}
                      placeholder="e.g. Baraat, Sangeet, Line Array, Jaipur"
                      className="w-full bg-[#141418] text-white p-2.5 rounded-lg border border-[#4d4635] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: LIVE READER PREVIEW */}
              {editorTab === 'preview' && (
                <div className="space-y-4 max-w-2xl mx-auto py-2">
                  <div className="p-2 bg-[#141418] rounded text-center text-[10px] text-[#99907c] uppercase">
                    Live Client Viewport Simulation
                  </div>

                  <article className="space-y-4 text-[#e5e1e4]">
                    <div className="space-y-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#4f471b] text-[#f1e3a9] text-[10px] font-bold uppercase">
                        {category}
                      </span>
                      <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {title || "Untitled Article Headline"}
                      </h1>
                      <div className="flex items-center gap-2 text-xs text-[#99907c]">
                        <span>By {authorName}</span>
                        <span>&bull;</span>
                        <span>{status === 'scheduled' ? `Scheduled: ${scheduledPublishDate}` : new Date().toLocaleDateString()}</span>
                        <span>&bull;</span>
                        <span>⏱️ {calculateReadingTime(content)} min read</span>
                      </div>
                    </div>

                    {coverImage && (
                      <div className="rounded-xl overflow-hidden aspect-video bg-black border border-[#4d4635]">
                        <img src={coverImage} alt={coverImageAlt || title} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div 
                      className="prose prose-invert max-w-none text-xs sm:text-sm text-[#d0c5af] leading-relaxed space-y-3 [&_h2]:text-lg [&_h2]:font-serif-luxury [&_h2]:text-[#f2ca50] [&_h2]:font-bold [&_h3]:text-base [&_h3]:text-white [&_blockquote]:border-l-2 [&_blockquote]:border-[#f2ca50] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-[#f1e3a9]"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </article>
                </div>
              )}

              {/* TAB 3: SEO & GEO PARAMETERS */}
              {editorTab === 'seo' && (
                <div className="space-y-4 text-xs">
                  <div className="p-3.5 rounded-lg bg-[#141418] border border-[#4d4635]/40 space-y-3">
                    <h4 className="font-serif-luxury text-sm font-bold text-[#f2ca50]">
                      Article Schema &amp; SERP Search Snippet
                    </h4>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[#d4c78f] font-bold uppercase">SEO Meta Title</label>
                        <span className={`text-[11px] ${(metaTitle || title).length > 60 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {(metaTitle || title).length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        placeholder={`${title} | The Royal Band`}
                        className="w-full bg-[#201f22] text-white p-2.5 rounded border border-[#4d4635] focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[#d4c78f] font-bold uppercase">Meta Description</label>
                        <span className={`text-[11px] ${(metaDescription || summary).length > 160 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {(metaDescription || summary).length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        placeholder={summary || "Meta description for Google crawlers..."}
                        className="w-full bg-[#201f22] text-white p-2.5 rounded border border-[#4d4635] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[#d4c78f] font-bold uppercase mb-1">Focus Keyword (GEO Target)</label>
                      <input
                        type="text"
                        value={focusKeyword}
                        onChange={(e) => setFocusKeyword(e.target.value)}
                        placeholder="e.g. luxury palace wedding brass symphony"
                        className="w-full bg-[#201f22] text-white p-2 rounded border border-[#4d4635] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Live Google Search Preview */}
                  <div className="p-3.5 rounded-lg bg-[#0e0e10] border border-[#4d4635]/40">
                    <span className="text-[10px] text-[#99907c] uppercase font-bold block mb-1">Google SERP Snippet Preview</span>
                    <div className="text-[11px] text-zinc-400 font-sans">
                      https://theroyalband.com &rsaquo; blog &rsaquo; <span className="text-zinc-300 font-mono">{slug || 'post'}</span>
                    </div>
                    <div className="text-sm text-[#8ab4f8] font-medium leading-snug mt-0.5">
                      {metaTitle || title || "Article Headline"}
                    </div>
                    <p className="text-xs text-zinc-300 line-clamp-2 mt-1">
                      {metaDescription || summary || "Article summary snippet..."}
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Submit Action */}
              <div className="pt-3 border-t border-[#353437] flex items-center justify-between">
                <span className="text-xs text-[#99907c]">
                  Autosaved locally &bull; Ready for publishing
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-4 py-2 rounded bg-[#2a2a2c] text-white text-xs font-semibold"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded bg-[#d4af37] text-[#131315] font-bold text-xs shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {status === 'scheduled' ? 'Schedule Article' : 'Save & Publish'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MEDIA ASSET PICKER MODAL */}
      {showMediaPicker && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3 max-h-[80vh]">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Select Post Thumbnail from Media Library
              </h3>
              <button onClick={() => setShowMediaPicker(false)} className="text-white text-lg">&times;</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 overflow-y-auto p-1">
              {mediaAssets.filter(m => m.type === 'image').map(asset => (
                <div
                  key={asset.id}
                  onClick={() => {
                    setCoverImage(asset.url);
                    setCoverImageAlt(asset.altText);
                    setShowMediaPicker(false);
                    showToast("Featured thumbnail selected!");
                  }}
                  className="group relative rounded-lg overflow-hidden border border-[#4d4635] aspect-video cursor-pointer hover:border-[#f2ca50]"
                >
                  <img src={asset.url} alt={asset.altText} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-xs font-bold text-[#f2ca50]">
                    Select
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* READER VIEW MODAL */}
      {previewPost && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#1c1b1e] border border-[#4d4635] rounded-xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-[#353437] pb-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4f471b] text-[#f1e3a9] text-[10px] font-bold uppercase tracking-wider">
                  {previewPost.category}
                </span>
                <span className="text-[11px] text-[#99907c] ml-2">
                  Status: <strong className="text-[#f2ca50] uppercase">{previewPost.status}</strong>
                </span>
              </div>
              <button onClick={() => setPreviewPost(null)} className="text-white text-xl">&times;</button>
            </div>

            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white leading-tight">
              {previewPost.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-[#99907c]">
              <span>By {previewPost.authorName}</span>
              <span>&bull;</span>
              <span>{previewPost.publishedAt}</span>
              <span>&bull;</span>
              <span>⏱️ {previewPost.readingTimeMinutes || 5} min read</span>
            </div>

            <div className="rounded-xl overflow-hidden aspect-video bg-black border border-[#4d4635]">
              <img src={previewPost.coverImage} alt={previewPost.coverImageAlt || previewPost.title} className="w-full h-full object-cover" />
            </div>

            <div 
              className="prose prose-invert text-xs sm:text-sm text-[#d0c5af] leading-relaxed space-y-3 [&_h2]:text-lg [&_h2]:font-serif-luxury [&_h2]:text-[#f2ca50] [&_h3]:text-base [&_h3]:text-white [&_blockquote]:border-l-2 [&_blockquote]:border-[#f2ca50] [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-[#f1e3a9]"
              dangerouslySetInnerHTML={{ __html: previewPost.content }}
            />

            <div className="pt-4 border-t border-[#353437] flex justify-end">
              <button 
                onClick={() => setPreviewPost(null)}
                className="px-4 py-2 rounded bg-[#2a2a2c] text-white text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD CATEGORY MODAL */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e10]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#201f22] border border-[#4d4635] rounded-xl p-5 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#353437] pb-2">
              <h3 className="font-serif-luxury text-base font-bold text-[#f2ca50]">
                Add Blog Taxonomy Category
              </h3>
              <button onClick={() => setIsAddCategoryOpen(false)} className="text-white text-lg">&times;</button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Palace Sangeet Insights"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-[#141418] text-white p-2 rounded border border-[#4d4635] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#d4c78f] font-bold uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Topic focus and editorial scope..."
                  value={newCatDesc}
                  onChange={(e) => setNewCatDesc(e.target.value)}
                  className="w-full bg-[#141418] text-white p-2 rounded border border-[#4d4635] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="px-4 py-2 rounded bg-[#2a2a2c] text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#d4af37] text-[#131315] font-bold"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
