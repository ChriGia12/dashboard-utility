import { Link, Mail, HardDrive, Youtube, MapPin, Bot, ShoppingCart, Clapperboard, Play } from 'lucide-react';

export const ShortcutsWidget = () => {
  const shortcuts = [
    { id: 1, name: 'Gmail', icon: Mail, url: 'https://mail.google.com', color: 'text-red-500' },
    { id: 2, name: 'Drive', icon: HardDrive, url: 'https://drive.google.com', color: 'text-yellow-500' },
    { id: 3, name: 'YouTube', icon: Youtube, url: 'https://youtube.com', color: 'text-red-600' },
    { id: 4, name: 'Maps', icon: MapPin, url: 'https://maps.google.com', color: 'text-green-500' },
    { id: 5, name: 'ChatGPT', icon: Bot, url: 'https://chat.openai.com', color: 'text-emerald-500' },
    { id: 6, name: 'Amazon', icon: ShoppingCart, url: 'https://amazon.it', color: 'text-orange-500' },
    { id: 7, name: 'Netflix', icon: Clapperboard, url: 'https://netflix.com', color: 'text-red-600' },
    { id: 8, name: 'Prime', icon: Play, url: 'https://primevideo.com', color: 'text-blue-400' },
  ];

  const handleClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Link className="h-4 w-4 text-primary" />
          <span className="widget-title">Collegamenti Rapidi</span>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-4 gap-3">
          {shortcuts.map((shortcut) => {
            const IconComponent = shortcut.icon;
            return (
              <button
                key={shortcut.id}
                onClick={() => handleClick(shortcut.url)}
                className="flex flex-col items-center justify-center p-4 rounded-lg bg-muted/50 hover:bg-muted hover:scale-105 transition-all group cursor-pointer border-0"
              >
                <IconComponent className={`h-8 w-8 mb-2 ${shortcut.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-medium text-foreground text-center">
                  {shortcut.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};