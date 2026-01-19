import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TODOS_STORAGE_KEY = 'dashboard-todos';

export const TodoWidget = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(TODOS_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [
      { id: 1, text: 'Controllare email', completed: false },
      { id: 2, text: 'Preparare presentazione', completed: true },
      { id: 3, text: 'Call con il team', completed: false }
    ];
  });
  const [newTodo, setNewTodo] = useState('');

  // Salva i todos quando cambiano
  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <span className="widget-title">Lista Attività</span>
        <span className="text-xs text-muted-foreground">
          {todos.filter(t => !t.completed).length} da completare
        </span>
      </div>
      <div className="flex-1 flex flex-col p-4">
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Nuova attività..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1"
          />
          <Button onClick={addTodo} size="icon" className="shrink-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto space-y-2">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-success" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  todo.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};