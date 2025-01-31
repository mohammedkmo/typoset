'use client';

import { useEffect, useState } from 'react';
import { FONTS } from '@/lib/fonts';
import type { FontStyle } from '@/lib/fonts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function FontPageClient({ params }: { params: Promise<{ name: string }> }) {
    const [loadedStyles, setLoadedStyles] = useState<Set<string>>(new Set());
    const [selectedWeight, setSelectedWeight] = useState<number>(400);
    const [selectedStyle, setSelectedStyle] = useState<'normal' | 'italic'>('normal');
    const [fontSize, setFontSize] = useState(18);
    const [loadingProgress, setLoadingProgress] = useState(0);

 
    const { name: fontName } = use(params);
    const font = FONTS.find(f => f.name === decodeURIComponent(fontName));

    if (!font) {
        notFound();
    }

    const [customText, setCustomText] = useState(font.previewText);

    const { name, previewText, category, styles, websiteUrl, language } = font;
    const regularStyle = styles.find(s => s.weight === 400) || styles[0];
    const boldStyle = styles.find(s => s.weight >= 700) || regularStyle;
    const isArabic = language === 'Arabic';

    // const availableWeights = Array.from(new Set(styles.map(s => s.weight))).sort((a, b) => a - b);
    const hasItalic = styles.some(s => s.style === 'italic');

    // const selectedStyleExists = styles.some(
    //     s => s.weight === selectedWeight && s.style === selectedStyle
    // );

    useEffect(() => {
        Promise.all(
            styles.map(async (style) => {
                const fontFace = new FontFace(
                    name,
                    `url(${style.url})`,
                    { weight: String(style.weight), style: style.style }
                );

                try {
                    await fontFace.load();
                    document.fonts.add(fontFace);
                    setLoadedStyles(prev => new Set(prev).add(`${style.weight}-${style.style}`));
                    setLoadingProgress(prev => prev + (100 / styles.length));
                } catch (err) {
                    console.error(`Failed to load font ${name}:`, err);
                }
            })
        );
    }, [name, styles]);

    const isStyleLoaded = (style: FontStyle) =>
        loadedStyles.has(`${style.weight}-${style.style}`);

    if (loadingProgress < 100) {
        return (
            <div className="min-h-screen">
                <div className="container px-4 md:px-6">
                    <div className="animate-pulse">
                        <div className="mb-8 md:mb-12 bg-card p-4 md:p-8 rounded-lg">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                                <div>
                                    <div className="h-16 md:h-24 bg-white/10 rounded-lg w-3/4 mb-2"></div>
                                    <div className="h-4 bg-white/10 rounded w-24"></div>
                                </div>
                                <div className="h-4 bg-white/10 rounded w-20"></div>
                            </div>
                            <div className="h-8 bg-white/10 rounded w-full mb-4"></div>
                            <div className="h-24 bg-white/10 rounded w-full"></div>
                        </div>

                        <div className="mb-8 md:mb-16">
                            <div className="h-8 bg-white/10 rounded w-48 mb-4"></div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-6 bg-white/10 rounded w-full"></div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 bg-white/10 rounded w-24"></div>
                                    <div className="h-6 bg-white/10 rounded w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
           <div className='container'>
           <Link
                href="/"
                className="sticky top-8 end-8 text-sm text-muted hover:text-foreground my-4 md:my-8 inline-flex items-center gap-2"
            >
              → العودة الى المجموعة
            </Link>
           </div>

            <div className="container px-4 md:px-6">
                <header className="mb-8 md:mb-12 bg-red-400/40 p-4 md:p-8 rounded-lg bg-[url('/images/image-mesh-gradient.png')] bg-cover bg-center border border-border">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                        <div>
                            <h1 className="text-4xl md:text-8xl font-bold mb-2"
                                style={{
                                    fontFamily: name,
                                    fontWeight: boldStyle.weight,
                                    fontStyle: 'normal'
                                }}
                            >{name}</h1>
                            <p className="text-sm text-white">
                               {styles.length} نمط متوفر
                            </p>
                        </div>

                        {category && (
                            <span className="text-xs text-white tracking-wide uppercase">{category}</span>
                        )}
                    </div>

                    <div
                        dir={isArabic ? 'rtl' : 'ltr'}
                        className="text-2xl md:text-4xl mb-4 md:mb-6"
                        style={{
                            fontFamily: name,
                            fontWeight: boldStyle.weight,
                            fontStyle: 'normal'
                        }}
                    >
                        {font.previewText}
                    </div>

                    <div
                        dir={isArabic ? 'rtl' : 'ltr'}
                        className="text-base md:text-lg text-white"
                        style={{
                            fontFamily: name,
                            fontWeight: regularStyle.weight,
                            fontStyle: 'normal'
                        }}
                    >
                        {font.simpleParagraph}
                    </div>

                    <div className='flex justify-start'>
                        <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-all flex items-center justify-center gap-2 text-sm mt-4 px-4 py-2 rounded-full bg-white/20 hover:bg-white hover:text-black">
                            <span>زيارة الموقع الرسمي</span>
                            <svg
                                className="w-3.5 h-3.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M7 17L17 7M17 7H8M17 7V16"
                                />
                            </svg>
                        </a>
                    </div>
                </header>

                <section className="mb-8 md:mb-16 font-card p-4 md:p-6 rounded-xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <h2 className="text-lg font-medium">جربه بنفسك</h2>
                        
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-2 border-r border-border pr-3">
                                <button
                                    onClick={() => setFontSize(prev => Math.max(16, prev - 4))}
                                    className="p-2 rounded-md hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M6 12h12" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                                <span className="text-sm w-12 text-center text-muted">{fontSize}px</span>
                                <button
                                    onClick={() => setFontSize(prev => Math.min(72, prev + 4))}
                                    className="p-2 rounded-md hover:bg-accent/10 text-muted hover:text-accent transition-colors"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M12 6v12M6 12h12" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center gap-2 border-r border-border pr-3">
                                <button
                                    onClick={() => setSelectedWeight(prev => prev === 400 ? 700 : 400)}
                                    className={`p-2 rounded-md transition-colors ${
                                        selectedWeight === 700 
                                            ? 'bg-accent/10 text-accent' 
                                            : 'text-muted hover:text-accent hover:bg-accent/10'
                                    }`}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M17 3H7v18h10a2 2 0 002-2V5a2 2 0 00-2-2z" strokeWidth={selectedWeight === 700 ? "3" : "1.5"} />
                                    </svg>
                                </button>
                            </div>

                            {hasItalic && (
                                <button
                                    onClick={() => setSelectedStyle(prev => prev === 'normal' ? 'italic' : 'normal')}
                                    className={`p-2 rounded-md transition-colors ${
                                        selectedStyle === 'italic' 
                                            ? 'bg-accent/10 text-accent' 
                                            : 'text-muted hover:text-accent hover:bg-accent/10'
                                    }`}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M17 4h-7M14 20H7M15 4l-4 16" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    <textarea
                        dir={isArabic ? 'rtl' : 'ltr'}
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="اكتب شيئاً..."
                        className="w-full bg-transparent outline-none ring-0 rounded-lg py-4 md:py-6 min-h-[150px] resize-none transition-all"
                        style={{ 
                            fontFamily: name,
                            fontWeight: selectedWeight,
                            fontStyle: selectedStyle,
                            fontSize: `${fontSize}px`,
                        }}
                    />
                </section>

                <section className="space-y-6 md:space-y-8 mb-16">
                    <h2 className="text-lg font-medium">
                       جميع الأنماط
                    </h2>
                    {styles.map((style) => (
                        <div
                            dir={isArabic ? 'rtl' : 'ltr'}
                            key={`${style.weight}-${style.style}`}
                            className={`transition-all duration-500 ${isStyleLoaded(style) ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
                                }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-muted uppercase tracking-wider">
                                    {style.weight} {style.style}
                                </span>
                            </div>
                            <div
                                className="text-xl md:text-2xl leading-relaxed"
                                style={{
                                    fontFamily: name,
                                    fontWeight: style.weight,
                                    fontStyle: style.style
                                }}
                            >
                                {previewText}
                            </div>
                        </div>
                    ))}
                </section>

                <div className="fixed bottom-6 right-6">
                    <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-card hover:bg-accent/10 px-4 py-2 rounded-full
                            border border-border hover:border-accent transition-all backdrop-blur-md
                            flex items-center gap-2 text-sm"
                    >
                        <span className="hidden md:inline">زيارة الموقع الرسمي</span>
                        <span className="md:hidden">زيارة</span>
                        <svg
                            className="w-3.5 h-3.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeWidth={2}
                                d="M7 17L17 7M17 7H8M17 7V16"
                            />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}