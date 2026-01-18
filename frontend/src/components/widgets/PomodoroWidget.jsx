import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export const PomodoroWidget = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const totalSeconds = isBreak ? 5 * 60 : 25 * 60;
  const currentSeconds = minutes * 60 + seconds;
  const progress = ((totalSeconds - currentSeconds) / totalSeconds) * 100;

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsActive(false);
            if (isBreak) {
              setIsBreak(false);
              setMinutes(25);
            } else {
              setIsBreak(true);
              setMinutes(5);
            }
            // Notifica sonora
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(isBreak ? 'Pausa terminata!' : 'Pomodoro completato!');
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, minutes, seconds, isBreak]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Timer className="h-4 w-4 text-primary" />
          <span className="widget-title">Timer Pomodoro</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="mb-4">
          <div className={`text-xs font-medium px-3 py-1 rounded-full ${
            isBreak ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary'
          }`}>
            {isBreak ? 'Pausa' : 'Lavoro'}
          </div>
        </div>
        <div className="text-6xl font-bold text-foreground mb-6 font-mono">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
        <Progress value={progress} className="w-full mb-6 h-2" />
        <div className="flex gap-3">
          <Button
            onClick={toggle}
            size="lg"
            className="gap-2"
          >
            {isActive ? (
              <>
                <Pause className="h-4 w-4" />
                Pausa
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Avvia
              </>
            )}
          </Button>
          <Button onClick={reset} size="lg" variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};