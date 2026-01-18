import { useState } from 'react';
import { Music, Play, Search, Heart, TrendingUp, ListMusic, Headphones } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const SpotifyWidget = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Playlist e collegamenti rapidi personalizzabili
  const quickLinks = [
    {
      id: 1,
      name: 'Discover Weekly',
      icon: TrendingUp,
      url: 'spotify:user:spotify:playlist:37i9dQZEVXcPZmTPJj8VNz',
      color: 'text-success'
    },
    {
      id: 2,
      name: 'Liked Songs',
      icon: Heart,
      url: 'spotify:collection:tracks',
      color: 'text-primary'
    },
    {
      id: 3,
      name: 'Top Hits Italia',
      icon: ListMusic,
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX0XUfTFmNBRM',
      color: 'text-warning'
    },
    {
      id: 4,
      name: 'Chill Vibes',
      icon: Headphones,
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX4WYpdgoIcn6',
      color: 'text-accent'
    }
  ];

  const handleOpenSpotify = () => {
    // Prova ad aprire l'app desktop
    window.location.href = 'spotify:';
    
    // Fallback a Spotify Web Player dopo 1 secondo se l'app non si apre
    setTimeout(() => {
      window.open('https://open.spotify.com', '_blank');
    }, 1000);
  };

  const handleQuickLink = (url) => {
    if (url.startsWith('spotify:')) {
      // Deep link all'app Spotify
      window.location.href = url;
      // Fallback a web player
      setTimeout(() => {
        const webUrl = url.replace('spotify:', 'https://open.spotify.com/');
        window.open(webUrl, '_blank');
      }, 500);
    } else {
      // Link diretto web
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(searchQuery)}`;
      window.open(searchUrl, '_blank', 'noopener,noreferrer');
      setSearchQuery('');
    }
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Music className="h-4 w-4 text-success" />
          <span className="widget-title">Spotify</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col p-4">
        {/* Pulsante Apri Spotify */}
        <Button
          onClick={handleOpenSpotify}
          className="w-full mb-4 bg-success hover:bg-success/90 text-white gap-2"
        >
          <Play className="h-4 w-4" />
          Apri Spotify
        </Button>

        {/* Ricerca Rapida */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Cerca musica..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" variant="outline">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Collegamenti Rapidi */}
        <ScrollArea className="flex-1">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground mb-2">Collegamenti Rapidi</h3>
            {quickLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleQuickLink(link.url)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
                >
                  <div className={`p-2 rounded-lg bg-background ${link.color}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {link.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Informazioni */}
          <div className="mt-4 p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Suggerimento:</strong> I collegamenti aprono Spotify sul tuo Mac. 
              Puoi personalizzare le playlist modificando il codice.
            </p>
          </div>

          {/* Come personalizzare */}
          <div className="mt-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-xs text-primary font-medium mb-2">
              🎵 Personalizza le tue playlist:
            </p>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Apri Spotify</li>
              <li>2. Vai sulla playlist preferita</li>
              <li>3. Click destro → "Condividi" → "Copia link"</li>
              <li>4. Modifica SpotifyWidget.jsx</li>
            </ol>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
