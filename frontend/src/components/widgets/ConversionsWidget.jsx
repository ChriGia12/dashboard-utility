import { useState } from 'react';
import { Calculator, ArrowRightLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ConversionsWidget = () => {
  // Valute
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');

  // Unità di misura
  const [length, setLength] = useState('1');
  const [fromLength, setFromLength] = useState('km');
  const [toLength, setToLength] = useState('mi');

  // Temperature
  const [temp, setTemp] = useState('20');
  const [fromTemp, setFromTemp] = useState('C');
  const [toTemp, setToTemp] = useState('F');

  // Tassi di cambio fissi (aggiornabili manualmente o via API)
  const exchangeRates = {
    EUR: 1,
    USD: 1.09,
    GBP: 0.86,
    CHF: 0.94,
    JPY: 158.5
  };

  const convertCurrency = () => {
    const amt = parseFloat(amount) || 0;
    const inEur = amt / exchangeRates[fromCurrency];
    const result = inEur * exchangeRates[toCurrency];
    return result.toFixed(2);
  };

  // Conversioni lunghezza
  const lengthUnits = {
    km: 1000,
    m: 1,
    cm: 0.01,
    mm: 0.001,
    mi: 1609.34,
    yd: 0.9144,
    ft: 0.3048,
    in: 0.0254
  };

  const convertLength = () => {
    const len = parseFloat(length) || 0;
    const inMeters = len * lengthUnits[fromLength];
    const result = inMeters / lengthUnits[toLength];
    return result.toFixed(4);
  };

  // Conversioni temperatura
  const convertTemp = () => {
    const t = parseFloat(temp) || 0;
    let celsius;

    // Prima converti in Celsius
    if (fromTemp === 'C') celsius = t;
    else if (fromTemp === 'F') celsius = (t - 32) * 5/9;
    else if (fromTemp === 'K') celsius = t - 273.15;

    // Poi converti da Celsius alla temperatura target
    let result;
    if (toTemp === 'C') result = celsius;
    else if (toTemp === 'F') result = (celsius * 9/5) + 32;
    else if (toTemp === 'K') result = celsius + 273.15;

    return result.toFixed(2);
  };

  return (
    <div className="widget-container flex flex-col">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-primary" />
          <span className="widget-title">Conversioni Rapide</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        <Tabs defaultValue="currency" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="currency" className="text-xs">Valute</TabsTrigger>
            <TabsTrigger value="length" className="text-xs">Unità</TabsTrigger>
            <TabsTrigger value="temp" className="text-xs">Temp</TabsTrigger>
          </TabsList>

          {/* Valute */}
          <TabsContent value="currency" className="space-y-3 mt-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Importo</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="mb-2"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR €</SelectItem>
                  <SelectItem value="USD">USD $</SelectItem>
                  <SelectItem value="GBP">GBP £</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="JPY">JPY ¥</SelectItem>
                </SelectContent>
              </Select>
              
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR €</SelectItem>
                  <SelectItem value="USD">USD $</SelectItem>
                  <SelectItem value="GBP">GBP £</SelectItem>
                  <SelectItem value="CHF">CHF</SelectItem>
                  <SelectItem value="JPY">JPY ¥</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-xs text-muted-foreground mb-1">Risultato</div>
              <div className="text-2xl font-bold text-primary">
                {convertCurrency()} {toCurrency}
              </div>
            </div>

            <div className="text-xs text-muted-foreground mt-2">
              💡 Tassi di cambio indicativi
            </div>
          </TabsContent>

          {/* Unità di misura */}
          <TabsContent value="length" className="space-y-3 mt-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Valore</label>
              <Input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="1"
                className="mb-2"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={fromLength} onValueChange={setFromLength}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometri</SelectItem>
                  <SelectItem value="m">Metri</SelectItem>
                  <SelectItem value="cm">Centimetri</SelectItem>
                  <SelectItem value="mm">Millimetri</SelectItem>
                  <SelectItem value="mi">Miglia</SelectItem>
                  <SelectItem value="yd">Yard</SelectItem>
                  <SelectItem value="ft">Piedi</SelectItem>
                  <SelectItem value="in">Pollici</SelectItem>
                </SelectContent>
              </Select>
              
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              
              <Select value={toLength} onValueChange={setToLength}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="km">Kilometri</SelectItem>
                  <SelectItem value="m">Metri</SelectItem>
                  <SelectItem value="cm">Centimetri</SelectItem>
                  <SelectItem value="mm">Millimetri</SelectItem>
                  <SelectItem value="mi">Miglia</SelectItem>
                  <SelectItem value="yd">Yard</SelectItem>
                  <SelectItem value="ft">Piedi</SelectItem>
                  <SelectItem value="in">Pollici</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="text-xs text-muted-foreground mb-1">Risultato</div>
              <div className="text-2xl font-bold text-accent">
                {convertLength()} {toLength}
              </div>
            </div>
          </TabsContent>

          {/* Temperature */}
          <TabsContent value="temp" className="space-y-3 mt-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Temperatura</label>
              <Input
                type="number"
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                placeholder="20"
                className="mb-2"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={fromTemp} onValueChange={setFromTemp}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">Celsius °C</SelectItem>
                  <SelectItem value="F">Fahrenheit °F</SelectItem>
                  <SelectItem value="K">Kelvin K</SelectItem>
                </SelectContent>
              </Select>
              
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
              
              <Select value={toTemp} onValueChange={setToTemp}>
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">Celsius °C</SelectItem>
                  <SelectItem value="F">Fahrenheit °F</SelectItem>
                  <SelectItem value="K">Kelvin K</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-xs text-muted-foreground mb-1">Risultato</div>
              <div className="text-2xl font-bold text-success">
                {convertTemp()}°{toTemp}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};