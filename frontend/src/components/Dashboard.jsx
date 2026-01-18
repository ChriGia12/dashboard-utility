import { useState, useEffect, useRef } from 'react';
import ReactGridLayout from 'react-grid-layout';
import { GripVertical, Save, RotateCcw, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ClockWidget } from '@/components/widgets/ClockWidget';
import { TodoWidget } from '@/components/widgets/TodoWidget';
import { NotesWidget } from '@/components/widgets/NotesWidget';
import { PomodoroWidget } from '@/components/widgets/PomodoroWidget';
import { ShortcutsWidget } from '@/components/widgets/ShortcutsWidget';
import { CountdownWidget } from '@/components/widgets/CountdownWidget';
import { CalculatorWidget } from '@/components/widgets/CalculatorWidget';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { toast } from 'sonner';

const STORAGE_KEY = 'dashboard-layout';

const defaultLayout = [
  { i: 'clock', x: 0, y: 0, w: 3, h: 2, minW: 2, minH: 2 },
  { i: 'calculator', x: 3, y: 0, w: 3, h: 5, minW: 2, minH: 3 },
  { i: 'countdown', x: 6, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'todo', x: 9, y: 0, w: 3, h: 4, minW: 2, minH: 3 },
  { i: 'pomodoro', x: 0, y: 2, w: 3, h: 3, minW: 2, minH: 2 },
  { i: 'notes', x: 0, y: 5, w: 6, h: 4, minW: 3, minH: 3 },
  { i: 'shortcuts', x: 6, y: 4, w: 6, h: 4, minW: 4, minH: 3 },
];

export const Dashboard = () => {
  const [layout, setLayout] = useState(() => {
    const savedLayout = localStorage.getItem(STORAGE_KEY);
    return savedLayout ? JSON.parse(savedLayout) : defaultLayout;
  });
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [width, setWidth] = useState(1920); // Fixed width for 1920x1080 screen
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const saveLayout = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    toast.success('Layout salvato con successo!');
  };

  const resetLayout = () => {
    setLayout(defaultLayout);
    localStorage.removeItem(STORAGE_KEY);
    toast.success('Layout ripristinato!');
  };

  const onLayoutChange = (newLayout) => {
    setLayout(newLayout);
  };

  const widgets = {
    clock: <ClockWidget />,
    calculator: <CalculatorWidget />,
    countdown: <CountdownWidget />,
    todo: <TodoWidget />,
    notes: <NotesWidget />,
    pomodoro: <PomodoroWidget />,
    shortcuts: <ShortcutsWidget />,
  };

  return (
    <div className="dashboard-container" ref={containerRef}>
      <div className="mb-4 flex items-center justify-between bg-card border border-border rounded-xl p-3 shadow-md">
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Dashboard Utility</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="gap-2"
          >
            {isDark ? (
              <>
                <Sun className="h-4 w-4" />
                Chiaro
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Scuro
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={resetLayout} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button size="sm" onClick={saveLayout} className="gap-2">
            <Save className="h-4 w-4" />
            Salva
          </Button>
        </div>
      </div>

      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={40}
        width={width}
        onLayoutChange={onLayoutChange}
        isDraggable={true}
        isResizable={true}
        margin={[16, 16]}
        containerPadding={[0, 0]}
        useCSSTransforms={true}
        compactType="vertical"
      >
        {layout.map((item) => (
          <div key={item.i} className="animate-fadeIn">
            {widgets[item.i]}
          </div>
        ))}
      </ReactGridLayout>
    </div>
  );
};