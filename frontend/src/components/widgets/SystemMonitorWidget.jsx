import { useState, useEffect } from 'react';
import { Cpu, HardDrive, MemoryStick } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const SystemMonitorWidget = () => {
  const [stats, setStats] = useState({
    cpu: 45,
    ram: 62,
    disk: 78
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 40) + 30,
        ram: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 10) + 70
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value) => {
    if (value < 50) return 'text-success';
    if (value < 75) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <span className="widget-title">Monitor Sistema</span>
      </div>
      <div className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">CPU</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(stats.cpu)}`}>
              {stats.cpu}%
            </span>
          </div>
          <Progress value={stats.cpu} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MemoryStick className="h-5 w-5 text-accent" />
              <span className="text-sm font-medium text-foreground">RAM</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(stats.ram)}`}>
              {stats.ram}%
            </span>
          </div>
          <Progress value={stats.ram} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-warning" />
              <span className="text-sm font-medium text-foreground">Disco</span>
            </div>
            <span className={`text-sm font-bold ${getStatusColor(stats.disk)}`}>
              {stats.disk}%
            </span>
          </div>
          <Progress value={stats.disk} className="h-2" />
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <div className="text-muted-foreground mb-1">Processore</div>
              <div className="font-medium text-foreground">Intel i7-12700K</div>
            </div>
            <div>
              <div className="text-muted-foreground mb-1">RAM</div>
              <div className="font-medium text-foreground">32 GB DDR4</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};