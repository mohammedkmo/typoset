export interface FontStyle {
  url: string;
  weight: number;
  style: 'normal' | 'italic';
}

export interface Font {
  name: string;
  previewText: string;
  category: string;
  styles: FontStyle[];
  language: string;
  websiteUrl: string;
  simpleParagraph: string;
}

export const FONTS: Font[] = [
  {
    name: 'Recoleta',
    previewText: 'The quick brown fox jumps over the lazy dog',
    simpleParagraph: `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.`,
    category: 'Sans Serif',
    language: 'English',
    websiteUrl: 'https://www.fontshare.com/fonts/recoleta',
    styles: [
      {
        url: '/fonts/Recoleta/Recoleta-Thin.otf',
        weight: 100,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-Light.otf',
        weight: 300,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-Regular.otf',
        weight: 400,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-Medium.otf',
        weight: 500,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-SemiBold.otf',
        weight: 600,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-Bold.otf',
        weight: 700,
        style: 'normal'
      },
      {
        url: '/fonts/Recoleta/Recoleta-Black.otf',
        weight: 900,
        style: 'normal'
      }
    ]
  },
  {
    name: 'Canicule Display',
    previewText: 'The quick brown fox jumps over the lazy dog',
    simpleParagraph: `Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing, and letter-spacing, and adjusting the space between pairs of letters.`,
    category: 'Display',
    language: 'English',
    websiteUrl: 'https://www.fontshare.com/fonts/canicule-display',
    styles: [
      {
        url: '/fonts/CaniculeDisplay/CaniculeDisplayv0.3-Regular.Trial.ttf',
        weight: 400,
        style: 'normal'
      },
      {
        url: '/fonts/CaniculeDisplay/CaniculeDisplayv0.3-Bold.Trial.ttf',
        weight: 700,
        style: 'normal'
      },
      {
        url: '/fonts/CaniculeDisplay/CaniculeDisplayv0.3-Italic.Trial.ttf',
        weight: 400,
        style: 'italic'
      },
      {
        url: '/fonts/CaniculeDisplay/CaniculeDisplayv0.3-BoldItalic.Trial.ttf',
        weight: 700,
        style: 'italic'
      },
      {
        url: '/fonts/CaniculeDisplay/CaniculeDisplayv0.3-BlackItalic.Trial.ttf',
        weight: 900,
        style: 'italic'
      }
    ]
  },
  {
    name: 'دوران',
    previewText: 'الخط العربي هو فن وأسلوب كتابة الحروف العربية',
    simpleParagraph: 'الخط العربي هو فن وتقنية تنظيم الحروف لجعل اللغة المكتوبة مقروءة وجذابة',
    category: 'خط كوفي',
    language: 'Arabic',
    websiteUrl: 'https://www.fontshare.com/fonts/doran',
    styles: [
      {
        url: '/fonts/Doran/Doran-Regular.ttf',
        weight: 400,
        style: 'normal'
      },
      {
        url: '/fonts/Doran/Doran-Medium.ttf',
        weight: 500,
        style: 'normal'
      },
      {
        url: '/fonts/Doran/Doran-Bold.ttf',
        weight: 700,
        style: 'normal'
      }
    ]
  }
]
  // Add entries for each font file in your fonts folder
  // Format:
  // {
  //   name: 'FontName', // Name to display
  //   previewText: 'Your preview text', // You can use any pangram or text
  //   fontUrl: '/fonts/FontFileName.ttf', // Path to font file
  //   category: 'Category' // Font category (Sans Serif, Serif, Display, etc.)
  // }

// Optional: Export font categories for filtering
export const FONT_CATEGORIES = [
  'خط كوفي',
  'خط نسخ',
  'خط ثلث',
  'خط رقعة',
  'خط ديواني',
  'خط حر'
];

export const FONT_WEIGHTS = {
  100: 'رفيع جداً',
  200: 'رفيع إضافي',
  300: 'رفيع',
  400: 'عادي',
  500: 'متوسط',
  600: 'شبه ثقيل',
  700: 'ثقيل',
  800: 'ثقيل إضافي',
  900: 'أسود'
};