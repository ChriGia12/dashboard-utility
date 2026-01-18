import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays } from 'lucide-react';

export const CalendarWidget = () => {
  const [date, setDate] = useState(new Date());

  const events = [
    { date: new Date(), title: 'Meeting Team', time: '10:00' },
    { date: new Date(), title: 'Pranzo con cliente', time: '13:00' },
    { date: new Date(Date.now() + 86400000), title: 'Presentazione progetto', time: '15:00' }
  ];

  const todayEvents = events.filter(event => 
    event.date.toDateString() === date.toDateString()
  );

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-primary" />
          <span className="widget-title">Calendario</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
        <div className="mt-4 flex-1 overflow-auto">
          <h3 className="text-sm font-semibold text-foreground mb-3">Eventi di oggi</h3>
          {todayEvents.length > 0 ? (
            <div className="space-y-2">
              {todayEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">{event.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{event.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Nessun evento per oggi</p>
          )}
        </div>
      </div>
    </div>
  );
};