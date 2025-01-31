'use client';

import { useEffect, useState } from 'react';
import type { Font } from '@/lib/fonts';
import Link from 'next/link';

export default function FontPreviewCard({ name, previewText, category, styles }: Font) {
  const [isLoaded, setIsLoaded] = useState(false);
  const regularStyle = styles.find(s => s.weight === 400) || styles[0];

  useEffect(() => {
    const fontFace = new FontFace(
      name,
      `url(${regularStyle.url})`,
      { weight: String(regularStyle.weight), style: regularStyle.style }
    );

    fontFace.load().then(() => {
      document.fonts.add(fontFace);
      setIsLoaded(true);
    });
  }, [name, regularStyle]);

  return (
    <Link href={`/fonts/${encodeURIComponent(name)}`}>
      <div className="font-card rounded-lg p-6 cursor-pointer">
        {!isLoaded ? (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-white/10 rounded w-3/4"></div>
            <div className="h-4 bg-white/10 rounded w-full"></div>
            <div className="h-4 bg-white/10 rounded w-5/6"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-medium"
                style={{
                  fontFamily: name,
                  fontWeight: regularStyle.weight,
                  fontStyle: regularStyle.style
                }}
              >{name}</h3>
              <span className="text-xs text-muted">{styles.length} نمط</span>
            </div>
            
            <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <p 
                className="text-2xl leading-relaxed mb-4"
                style={{ 
                  fontFamily: name,
                  fontWeight: regularStyle.weight,
                  fontStyle: regularStyle.style
                }}
              >
                {previewText}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-muted">{category}</span>
              <span className="text-accent">عرض العائلة ←</span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
}