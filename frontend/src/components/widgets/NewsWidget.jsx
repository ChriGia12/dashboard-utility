import { Newspaper, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

// News API - Ottieni la tua chiave su https://newsapi.org/
const NEWS_API_KEY = 'demo'; // L'utente dovrà inserire la propria chiave

const mockNews = [
  {
    id: 1,
    title: 'Nuove funzionalità React 19',
    source: 'React Blog',
    time: '2 ore fa',
    category: 'Tecnologia',
    url: 'https://react.dev'
  },
  {
    id: 2,
    title: 'Italia vince il campionato europeo',
    source: 'Sport News',
    time: '4 ore fa',
    category: 'Sport',
    url: '#'
  },
  {
    id: 3,
    title: 'Mercati in crescita del 3%',
    source: 'Financial Times',
    time: '5 ore fa',
    category: 'Finanza',
    url: '#'
  },
  {
    id: 4,
    title: 'Scoperta scientifica rivoluzionaria',
    source: 'Science Daily',
    time: '6 ore fa',
    category: 'Scienza',
    url: '#'
  },
  {
    id: 5,
    title: 'Nuovo smartphone presentato',
    source: 'Tech Crunch',
    time: '8 ore fa',
    category: 'Tecnologia',
    url: '#'
  }
];

export const NewsWidget = () => {
  const [news, setNews] = useState(mockNews);
  const [isReal, setIsReal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRealNews = async () => {
    if (NEWS_API_KEY === 'demo') {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=it&pageSize=10&apiKey=${NEWS_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedNews = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          source: article.source.name,
          time: new Date(article.publishedAt).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          category: 'Notizie',
          url: article.url
        }));
        setNews(formattedNews);
        setIsReal(true);
      }
    } catch (error) {
      console.log('Notizie non disponibili, uso dati simulati');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealNews();
    // Aggiorna ogni 15 minuti
    const interval = setInterval(fetchRealNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Tecnologia': 'bg-primary/20 text-primary',
      'Sport': 'bg-success/20 text-success',
      'Finanza': 'bg-warning/20 text-warning',
      'Scienza': 'bg-accent/20 text-accent',
      'Notizie': 'bg-primary/20 text-primary'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  const handleNewsClick = (url) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Newspaper className="h-4 w-4 text-primary" />
          <span className="widget-title">Notizie</span>
          {!isReal && (
            <span className="text-xs text-muted-foreground">(simulato)</span>
          )}
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="text-muted-foreground">Caricamento...</div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {news.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNewsClick(item.url)}
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
            {!isReal && (
              <div className="mt-4 text-xs text-muted-foreground p-2 bg-muted rounded">
                💡 Per notizie reali, aggiungi la tua API key NewsAPI nel codice
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};