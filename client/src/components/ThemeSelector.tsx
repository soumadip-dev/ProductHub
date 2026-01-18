import { ChevronDownIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const THEMES = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset',
] as const;

type Theme = (typeof THEMES)[number];

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return (THEMES as readonly string[]).includes(savedTheme || '')
        ? (savedTheme as Theme)
        : 'forest';
    }
    return 'forest';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
        <div className="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
          <div className="bg-red-500 size-1 rounded-full"></div>
          <div className="bg-green-500 size-1 rounded-full"></div>
          <div className="bg-blue-500 size-1 rounded-full"></div>
          <div className="bg-yellow-500 size-1 rounded-full"></div>
        </div>
        <ChevronDownIcon className="size-4" />
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-50 w-56 p-2 shadow-xl max-h-96 overflow-y-auto flex-nowrap"
      >
        {THEMES.map(t => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`flex justify-between ${
                theme === t ? 'bg-primary text-primary-content' : ''
              }`}
            >
              <span className="capitalize">{t}</span>
              <div className="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
                <div className="bg-red-500 size-1 rounded-full"></div>
                <div className="bg-green-500 size-1 rounded-full"></div>
                <div className="bg-blue-500 size-1 rounded-full"></div>
                <div className="bg-yellow-500 size-1 rounded-full"></div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
