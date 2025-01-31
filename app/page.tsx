'use client';

import FontPreviewCard from '@/components/FontPreviewCard';
import { FONTS, FONT_CATEGORIES } from '@/lib/fonts';
import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  

  const filteredFonts = FONTS.filter(font => {
    const matchesCategory = !selectedCategory || font.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      font.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  

  return (
    <div className="min-h-screen">
      <header className="text-center container mb-16">

        {/* Search Bar */}
        <div className="mb-8 relative max-w-md mx-auto text-sm">
          <input
            type="text"
            placeholder="ابحث عن الخطوط..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-full bg-card border border-border 
              focus:border-accent focus:outline-none transition-colors placeholder:text-muted"
          />
          <svg
            className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${!selectedCategory
                ? 'bg-accent text-black'
                : 'bg-card hover:bg-accent/10 text-muted'
              }`}
          >
            جميع الخطوط
          </button>
          {FONT_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(
                selectedCategory === category ? null : category
              )}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === category
                  ? 'bg-accent text-black'
                  : 'bg-card hover:bg-accent/10 text-muted'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <main className='container'>
        {filteredFonts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted mb-4">No fonts found</p>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery('');
              }}
              className="text-accent hover:text-accent/80"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFonts.map((font) => (
              <FontPreviewCard key={font.name} {...font} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
