import { Link, Bookmark, Mail, FileText, Settings, Github, Chrome } from 'lucide-react';

export const ShortcutsWidget = () => {
  const shortcuts = [
    { id: 1, name: 'Gmail', icon: Mail, url: 'https://mail.google.com', color: 'text-destructive' },
    { id: 2, name: 'GitHub', icon: Github, url: 'https://github.com', color: 'text-foreground' },
    { id: 3, name: 'Drive', icon: FileText, url: 'https://drive.google.com', color: 'text-primary' },
    { id: 4, name: 'Google', icon: Chrome, url: 'https://google.com', color: 'text-success' },
    { id: 5, name: 'YouTube', icon: Bookmark, url: 'https://youtube.com', color: 'text-warning' },
    { id: 6, name: 'Maps', icon: Settings, url: 'https://maps.google.com', color: 'text-accent' },
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
        <div className="grid grid-cols-2 gap-3">
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