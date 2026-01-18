import { Newspaper, ExternalLink } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

// News API - Ottieni la tua chiave su https://newsapi.org/
// ISTRUZIONI: Sostituisci 'TUA_API_KEY_QUI' con la tua chiave gratuita
const NEWS_API_KEY = 'bff3afe58e5e4571a21ba15e3537b7a0';

const mockSportNews = [
  {
    id: 1,
    title: 'Sinner batte Alcaraz e vola in semifinale agli Australian Open 2025',
    source: 'Gazzetta dello Sport',
    time: '2 ore fa',
    category: 'Tennis',
    url: 'https://www.gazzetta.it/Tennis/'
  },
  {
    id: 2,
    title: 'Inter in testa alla Serie A, napoli insegue a -3 punti',
    source: 'Sky Sport',
    time: '5 ore fa',
    category: 'Calcio',
    url: 'https://sport.sky.it/calcio/serie-a'
  },
  {
    id: 3,
    title: 'Ferrari presenta aggiornamenti per la stagione F1 2025',
    source: 'La Repubblica',
    time: '1 giorno fa',
    category: 'Formula 1',
    url: 'https://www.repubblica.it/sport/formula-1/'
  }
];

export const NewsWidget = () => {
  const [news, setNews] = useState(mockSportNews);
  const [isReal, setIsReal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRealSportNews = async () => {
    if (NEWS_API_KEY === 'TUA_API_KEY_QUI') {
      console.log('NewsWidget: API key non configurata, uso mock');
      return;
    }

    setLoading(true);
    console.log('NewsWidget: Chiamata API in corso...');
    
    try {
      // Cerca notizie sportive italiane
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=it&category=sports&pageSize=15&apiKey=${NEWS_API_KEY}`
      );
      
      console.log('NewsWidget: Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('NewsWidget: Articoli ricevuti:', data.articles?.length || 0);
        
        if (data.articles && data.articles.length > 0) {
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
          console.log('NewsWidget: Notizie reali caricate con successo!');
        } else {
          console.log('NewsWidget: Nessun articolo ricevuto, uso mock');
        }
      } else {
        const errorData = await response.json();
        console.error('NewsWidget: Errore API:', errorData);
      }
    } catch (error) {
      console.error('NewsWidget: Errore fetch:', error);
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