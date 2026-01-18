import { useState } from 'react';
import { Music, List, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const SpotifyWidget = () => {
  // Le tue playlist preferite - PERSONALIZZALE!
  // Per ottenere l'ID: apri playlist su Spotify → Condividi → Copia link → prendi l'ID dall'URL
  const playlists = [
    {
      id: '37i9dQZF1DXcBWIGoYBM5M', // Today's Top Hits
      name: 'Top Hits',
      description: 'Le hit del momento'
    },
    {
      id: '37i9dQZF1DX0XUsuxWHRQd', // RapCaviar
      name: 'Rap/Hip-Hop',
      description: 'Rap e Hip-Hop'
    },
    {
      id: '37i9dQZF1DX4WYpdgoIcn6', // Chill Hits
      name: 'Chill',
      description: 'Musica rilassante'
    }
  ];

  const [currentPlaylist, setCurrentPlaylist] = useState(playlists[0].id);

  return (
    <div className=\"widget-container flex flex-col\">
      <div className=\"widget-header\">
        <div className=\"flex items-center gap-2\">
          <Music className=\"h-4 w-4 text-success\" />
          <span className=\"widget-title\">Spotify Player</span>
        </div>
      </div>
      
      <div className=\"flex-1 flex flex-col p-4 overflow-hidden\">
        <Tabs defaultValue=\"player\" className=\"flex-1 flex flex-col\">
          <TabsList className=\"grid w-full grid-cols-2 mb-3\">
            <TabsTrigger value=\"player\" className=\"text-xs\">
              <Play className=\"h-3 w-3 mr-1\" />
              Player
            </TabsTrigger>
            <TabsTrigger value=\"playlists\" className=\"text-xs\">
              <List className=\"h-3 w-3 mr-1\" />
              Playlist
            </TabsTrigger>
          </TabsList>

          {/* Player */}
          <TabsContent value=\"player\" className=\"flex-1 mt-0\">
            <div className=\"h-full rounded-lg overflow-hidden bg-black/5\">
              <iframe
                src={`https://open.spotify.com/embed/playlist/${currentPlaylist}?utm_source=generator&theme=0`}
                width=\"100%\"
                height=\"100%\"
                frameBorder=\"0\"
                allowFullScreen
                allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\"
                loading=\"lazy\"
                style={{ borderRadius: '12px', minHeight: '300px' }}
              />
            </div>
          </TabsContent>

          {/* Lista Playlist */}
          <TabsContent value=\"playlists\" className=\"flex-1 mt-0 overflow-auto\">
            <div className=\"space-y-2\">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => setCurrentPlaylist(playlist.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${\n                    currentPlaylist === playlist.id\n                      ? 'bg-success/20 border-2 border-success'\n                      : 'bg-muted/50 hover:bg-muted border-2 border-transparent'\n                  }`}
                >
                  <div className=\"font-medium text-sm text-foreground\">
                    {playlist.name}
                  </div>
                  <div className=\"text-xs text-muted-foreground mt-1\">
                    {playlist.description}
                  </div>
                </button>
              ))}
            </div>

            {/* Istruzioni personalizzazione */}
            <div className=\"mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg\">
              <p className=\"text-xs font-medium text-primary mb-2\">
                🎵 Personalizza le playlist:
              </p>
              <ol className=\"text-xs text-muted-foreground space-y-1\">
                <li>1. Apri Spotify Web/App</li>
                <li>2. Vai sulla tua playlist</li>
                <li>3. Condividi → Copia link</li>
                <li>4. Prendi l'ID dall'URL</li>
                <li>5. Modifica SpotifyWidget.jsx</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
