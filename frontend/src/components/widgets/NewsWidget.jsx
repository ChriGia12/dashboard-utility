import { Newspaper, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const NewsWidget = () => {
  const news = [
    {
      id: 1,
      title: 'Nuove funzionalità React 19',
      source: 'React Blog',
      time: '2 ore fa',
      category: 'Tecnologia'
    },
    {
      id: 2,
      title: 'Italia vince il campionato europeo',
      source: 'Sport News',
      time: '4 ore fa',
      category: 'Sport'
    },
    {
      id: 3,
      title: 'Mercati in crescita del 3%',
      source: 'Financial Times',
      time: '5 ore fa',
      category: 'Finanza'
    },
    {
      id: 4,
      title: 'Scoperta scientifica rivoluzionaria',
      source: 'Science Daily',
      time: '6 ore fa',
      category: 'Scienza'
    },
    {
      id: 5,
      title: 'Nuovo smartphone presentato',
      source: 'Tech Crunch',
      time: '8 ore fa',
      category: 'Tecnologia'
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      'Tecnologia': 'bg-primary/20 text-primary',
      'Sport': 'bg-success/20 text-success',
      'Finanza': 'bg-warning/20 text-warning',
      'Scienza': 'bg-accent/20 text-accent'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-primary" />
          <span className="widget-title">Notizie</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};