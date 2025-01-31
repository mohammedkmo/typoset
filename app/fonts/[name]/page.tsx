import { FONTS } from '@/lib/fonts';
import { Metadata } from 'next';
import FontPageClient from './client';

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }): Promise<Metadata> {

    const resolvedParams = await params;

  const font = FONTS.find(f => f.name === decodeURIComponent(resolvedParams.name));


  if (!font) {
    return {
      title: 'Font Not Found',
    };
  }

  return {
    title: `${font.name} - Typoset`,
    description: `Explore ${font.name} font with ${font.styles.length} styles. ${font.previewText}`,
  };
}

export default async function FontPage({ params }: { params: Promise<{ name: string }> }) {
  return <FontPageClient params={params} />;
}
