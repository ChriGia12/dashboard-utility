import { useState, useEffect } from 'react';
import { StickyNote, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const NOTES_STORAGE_KEY = 'dashboard-notes';

export const NotesWidget = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem(NOTES_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, content: 'Ricordare di chiamare Marco', color: 'bg-warning/20' },
      { id: 2, content: 'Idee per il nuovo progetto:\n- Dashboard interattiva\n- Widget personalizzabili', color: 'bg-accent/20' },
    ];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Salva le note quando cambiano
  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const colors = ['bg-warning/20', 'bg-accent/20', 'bg-success/20', 'bg-primary/20'];

  const addNote = () => {
    if (newNote.trim()) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      setNotes([...notes, { id: Date.now(), content: newNote, color: randomColor }]);
      setNewNote('');
      setIsAdding(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-warning" />
          <span className="widget-title">Note Veloci</span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsAdding(!isAdding)}
          className="h-7 w-7 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {isAdding && (
          <div className="mb-4 p-4 rounded-lg bg-muted/50 border border-border">
            <Textarea
              placeholder="Scrivi la tua nota..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="mb-2 min-h-[80px] resize-none"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addNote}>Salva</Button>
              <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                Annulla
              </Button>
            </div>
          </div>
        )}
        <div className="grid gap-3">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-lg ${note.color} border border-border/50 group hover:shadow-md transition-shadow relative`}
            >
              <button
                onClick={() => deleteNote(note.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <p className="text-sm text-foreground whitespace-pre-wrap pr-6">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};