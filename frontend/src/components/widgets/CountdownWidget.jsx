import { useState, useEffect } from 'react';
import { Calendar, Plus, Trash2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const CountdownWidget = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('countdown-events');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Compleanno',
        date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 15).toISOString(),
        color: 'bg-primary/20 text-primary border-primary/30'
      },
      {
        id: 2,
        name: 'Scadenza progetto',
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString(),
        color: 'bg-warning/20 text-warning border-warning/30'
      },
      {
        id: 3,
        name: 'Vacanze estive',
        date: new Date(new Date().getFullYear(), 6, 1).toISOString(),
        color: 'bg-success/20 text-success border-success/30'
      }
    ];
  });
  
  const [newEventName, setNewEventName] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Aggiorna ogni secondo per countdown live
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Salva in localStorage
  useEffect(() => {
    localStorage.setItem('countdown-events', JSON.stringify(events));
  }, [events]);

  const colors = [
    'bg-primary/20 text-primary border-primary/30',
    'bg-success/20 text-success border-success/30',
    'bg-warning/20 text-warning border-warning/30',
    'bg-destructive/20 text-destructive border-destructive/30',
    'bg-accent/20 text-accent border-accent/30'
  ];

  const addEvent = () => {
    if (newEventName && newEventDate) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setEvents([...events, {
        id: Date.now(),
        name: newEventName,
        date: new Date(newEventDate).toISOString(),
        color: randomColor
      }]);
      setNewEventName('');
      setNewEventDate('');
      setIsOpen(false);
    }
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const getTimeRemaining = (targetDate) => {
    const now = currentTime.getTime();
    const target = new Date(targetDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { expired: true, text: 'Scaduto!' };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (days > 0) {
      return { expired: false, text: `${days}g ${hours}h ${minutes}m` };
    } else if (hours > 0) {
      return { expired: false, text: `${hours}h ${minutes}m ${seconds}s` };
    } else {
      return { expired: false, text: `${minutes}m ${seconds}s` };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Ordina eventi per data (più vicini prima)
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="widget-title">Countdown Eventi</span>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuovo Evento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nome Evento</label>
                <Input
                  placeholder="Es: Compleanno, Scadenza..."
                  value={newEventName}
                  onChange={(e) => setNewEventName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Data</label>
                <Input
                  type="datetime-local"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                />
              </div>
              <Button onClick={addEvent} className="w-full">
                Aggiungi Evento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        {sortedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Calendar className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-sm text-muted-foreground">Nessun evento</p>
            <p className="text-xs text-muted-foreground mt-1">Clicca + per aggiungerne uno</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedEvents.map((event) => {
              const timeRemaining = getTimeRemaining(event.date);
              return (
                <div
                  key={event.id}
                  className={`p-4 rounded-lg border ${event.color} group hover:shadow-md transition-shadow relative`}
                >
                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 hover:text-destructive" />
                  </button>
                  
                  <div className="pr-6">
                    <h3 className="font-semibold text-sm mb-1">{event.name}</h3>
                    <div className="text-xs opacity-70 mb-2">
                      {formatDate(event.date)}
                    </div>
                    <div className={`text-lg font-bold ${
                      timeRemaining.expired ? 'opacity-50' : ''
                    }`}>
                      {timeRemaining.text}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};