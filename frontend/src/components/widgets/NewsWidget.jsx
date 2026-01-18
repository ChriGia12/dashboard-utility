import { Newspaper, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

// News API - Ottieni la tua chiave su https://newsapi.org/
// ISTRUZIONI: Sostituisci 'TUA_API_KEY_QUI' con la tua chiave gratuita
const NEWS_API_KEY = 'bff3afe58e5e4571a21ba15e3537b7a0';

const mockSportNews = [
  {
    id: 1,
    title: 'Milan batte Inter 2-1 nel derby',
    source: 'Gazzetta dello Sport',
    time: '1 ora fa',
    category: 'Calcio',
    url: '#'
  },
  {
    id: 2,
    title: 'Sinner vince agli Australian Open',
    source: 'Eurosport',
    time: '3 ore fa',
    category: 'Tennis',
    url: '#'
  },
  {
    id: 3,
    title: 'Ferrari presenta la nuova monoposto',
    source: 'AutoSprint',
    time: '5 ore fa',
    category: 'Formula 1',
    url: '#'
  },
  {
    id: 4,
    title: 'Italia convocazioni per amichevole',
    source: 'FIGC',
    time: '6 ore fa',
    category: 'Calcio',
    url: '#'
  },
  {
    id: 5,
    title: 'Olimpia Milano in finale di Eurolega',
    source: 'Sky Sport',
    time: '8 ore fa',
    category: 'Basket',
    url: '#'
  }
];

export const NewsWidget = () => {
  const [news, setNews] = useState(mockSportNews);
  const [isReal, setIsReal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRealSportNews = async () => {
    if (NEWS_API_KEY === 'TUA_API_KEY_QUI') {
      return;
    }

    setLoading(true);
    try {
      // Cerca notizie sportive italiane
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=it&category=sports&pageSize=15&apiKey=${NEWS_API_KEY}`
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedNews = data.articles.map((article, index) => ({
          id: index,
          title: article.title,
          source: article.source.name,
          time: getTimeAgo(new Date(article.publishedAt)),
          category: 'Sport',
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

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) {
      return `${diffMins} minuti fa`;
    } else if (diffHours < 24) {
      return `${diffHours} ore fa`;
    } else {
      return date.toLocaleDateString('it-IT');
    }
  };

  useEffect(() => {
    fetchRealSportNews();
    // Aggiorna ogni 15 minuti
    const interval = setInterval(fetchRealSportNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      'Calcio': 'bg-success/20 text-success',
      'Tennis': 'bg-primary/20 text-primary',
      'Formula 1': 'bg-destructive/20 text-destructive',
      'Basket': 'bg-warning/20 text-warning',
      'Sport': 'bg-accent/20 text-accent'
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
          <span className="widget-title">Notizie Sport</span>
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
              <div className="mt-4 text-xs text-muted-foreground p-3 bg-muted rounded">
                <strong>💡 Per notizie sportive reali:</strong><br/>
                1. Registrati su <a href="https://newsapi.org/" target="_blank" rel="noopener noreferrer" className="text-primary underline">NewsAPI.org</a><br/>
                2. Ottieni la tua API key gratuita<br/>
                3. Sostituisci 'TUA_API_KEY_QUI' nel file NewsWidget.jsx<br/>
                4. Riavvia l'app
              </div>
            )}
          </>
        )}
      </ScrollArea>
    </div>
  );
};