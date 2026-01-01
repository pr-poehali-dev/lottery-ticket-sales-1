import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Ticket {
  id: string;
  numbers: number[];
  purchaseDate: string;
  drawDate: string;
  status: 'pending' | 'win' | 'lose';
  prize?: number;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [myTickets, setMyTickets] = useState<Ticket[]>([
    {
      id: 'T001',
      numbers: [7, 14, 21, 28, 35, 42],
      purchaseDate: '2026-01-01',
      drawDate: '2026-01-05',
      status: 'pending'
    }
  ]);

  const lastDraw = {
    date: '2025-12-28',
    numbers: [5, 12, 23, 31, 38, 44],
    jackpot: 1500000
  };

  const upcomingDraw = {
    date: '2026-01-05T20:00:00',
    jackpot: 100000
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const drawTime = new Date(upcomingDraw.date).getTime();
      const now = new Date().getTime();
      const difference = drawTime - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const buyTicket = () => {
    const newNumbers = Array.from({ length: 6 }, () => Math.floor(Math.random() * 45) + 1).sort((a, b) => a - b);
    const newTicket: Ticket = {
      id: `T${String(myTickets.length + 1).padStart(3, '0')}`,
      numbers: newNumbers,
      purchaseDate: new Date().toISOString().split('T')[0],
      drawDate: '2026-01-05',
      status: 'pending'
    };
    
    setMyTickets([...myTickets, newTicket]);
    toast.success('🎉 Билет куплен!', {
      description: `Номера: ${newNumbers.join(', ')}. Удачи!`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-orange-50 to-yellow-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-yellow-200 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="gradient-gold rounded-full p-2">
                <Icon name="Sparkles" size={28} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-gold bg-clip-text text-transparent">ЛотоМечты</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <Button variant="ghost" onClick={() => setActiveTab('home')} className="text-base hover:text-yellow-600">
                Главная
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('results')} className="text-base hover:text-yellow-600">
                Результаты
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('shop')} className="text-base hover:text-yellow-600">
                Магазин
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('my-tickets')} className="text-base hover:text-yellow-600">
                Мои билеты
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('rules')} className="text-base hover:text-yellow-600">
                Правила
              </Button>
              <Button variant="ghost" onClick={() => setActiveTab('contacts')} className="text-base hover:text-yellow-600">
                Контакты
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8 md:hidden">
            <TabsTrigger value="home"><Icon name="Home" size={20} /></TabsTrigger>
            <TabsTrigger value="results"><Icon name="Trophy" size={20} /></TabsTrigger>
            <TabsTrigger value="shop"><Icon name="ShoppingCart" size={20} /></TabsTrigger>
            <TabsTrigger value="my-tickets"><Icon name="Ticket" size={20} /></TabsTrigger>
            <TabsTrigger value="rules"><Icon name="BookOpen" size={20} /></TabsTrigger>
            <TabsTrigger value="contacts"><Icon name="Mail" size={20} /></TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-8 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl gradient-gold p-12 text-center shadow-2xl confetti-bg">
              <div className="relative z-10">
                <Badge className="mb-4 text-lg px-6 py-2 bg-white text-yellow-600 font-bold animate-bounce-subtle">
                  Джекпот {upcomingDraw.jackpot.toLocaleString('ru-RU')} ₽
                </Badge>
                <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-4 text-shadow-glow">
                  Исполни мечту!
                </h2>
                <div className="mb-8">
                  <p className="text-xl text-white mb-4 font-medium">Розыгрыш через:</p>
                  <div className="flex justify-center gap-4 flex-wrap">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                      <p className="text-4xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</p>
                      <p className="text-sm text-white/80 mt-1">дней</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                      <p className="text-4xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</p>
                      <p className="text-sm text-white/80 mt-1">часов</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                      <p className="text-4xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</p>
                      <p className="text-sm text-white/80 mt-1">минут</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 min-w-[80px]">
                      <p className="text-4xl font-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</p>
                      <p className="text-sm text-white/80 mt-1">секунд</p>
                    </div>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  onClick={buyTicket}
                  className="gradient-purple text-white text-xl px-12 py-6 rounded-full hover:scale-110 transition-transform pulse-gold font-bold shadow-2xl"
                >
                  <Icon name="Sparkles" className="mr-2" size={24} />
                  Купить билет за 50₽
                </Button>
              </div>
            </section>

            <section className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-yellow-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="DollarSign" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-center text-2xl">Всего 50₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Самая доступная лотерея в стране! Попробуй удачу за цену чашки кофе.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 gradient-purple rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Gift" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-center text-2xl">Большие призы</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Джекпот от 500 000₽ и множество дополнительных призов каждую неделю.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-300 shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Zap" size={32} className="text-white" />
                  </div>
                  <CardTitle className="text-center text-2xl">Мгновенно</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Билет активируется сразу после покупки. Результаты — через 5 минут после розыгрыша.
                  </p>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          <TabsContent value="results" className="space-y-6 animate-fade-in">
            <Card className="border-2 border-yellow-400 shadow-2xl">
              <CardHeader className="gradient-gold text-white">
                <CardTitle className="text-3xl flex items-center gap-3">
                  <Icon name="Trophy" size={32} />
                  Последний розыгрыш
                </CardTitle>
                <CardDescription className="text-white/90 text-lg">
                  {new Date(lastDraw.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                  {lastDraw.numbers.map((num, idx) => (
                    <div 
                      key={idx} 
                      className="w-16 h-16 rounded-full gradient-purple flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-scale-in"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold mb-2">Джекпот выигран!</p>
                  <p className="text-3xl font-bold text-yellow-600">{lastDraw.jackpot.toLocaleString('ru-RU')} ₽</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Предыдущие розыгрыши</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { date: '2025-12-21', numbers: [3, 15, 22, 29, 36, 41], jackpot: 800000 },
                  { date: '2025-12-14', numbers: [8, 11, 19, 27, 33, 45], jackpot: 600000 },
                  { date: '2025-12-07', numbers: [2, 13, 24, 30, 39, 43], jackpot: 500000 }
                ].map((draw, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border rounded-lg hover:bg-yellow-50 transition-colors">
                    <div>
                      <p className="font-semibold">{new Date(draw.date).toLocaleDateString('ru-RU')}</p>
                      <div className="flex gap-2 mt-2">
                        {draw.numbers.map((num, i) => (
                          <Badge key={i} variant="secondary" className="text-sm">{num}</Badge>
                        ))}
                      </div>
                    </div>
                    <p className="font-bold text-yellow-600">{draw.jackpot.toLocaleString('ru-RU')} ₽</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shop" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-yellow-400 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-sm font-bold rounded-bl-lg">
                  ПОПУЛЯРНОЕ
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">Разовый билет</CardTitle>
                  <CardDescription>Участие в ближайшем розыгрыше</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-5xl font-bold gradient-gold bg-clip-text text-transparent">50₽</p>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>6 случайных чисел</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>Участие в основном джекпоте</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>Моментальная активация</span>
                    </li>
                  </ul>
                  <Button onClick={buyTicket} className="w-full gradient-purple text-white py-6 text-lg font-bold">
                    Купить сейчас
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-400 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Пакет 5 билетов</CardTitle>
                  <CardDescription>Больше шансов на выигрыш</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-5xl font-bold gradient-purple bg-clip-text text-transparent">200₽</p>
                    <p className="text-sm text-muted-foreground line-through">250₽</p>
                  </div>
                  <Badge className="w-full justify-center bg-green-500 text-white">Экономия 50₽</Badge>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>5 уникальных комбинаций</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>Скидка 20%</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span>Все билеты действительны</span>
                    </li>
                  </ul>
                  <Button 
                    onClick={() => {
                      for (let i = 0; i < 5; i++) buyTicket();
                    }} 
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-6 text-lg font-bold"
                  >
                    Купить пакет
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="my-tickets" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="Ticket" size={28} />
                  Мои билеты ({myTickets.length})
                </CardTitle>
                <CardDescription>История всех купленных билетов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {myTickets.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="Ticket" size={64} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground mb-4">У вас пока нет билетов</p>
                    <Button onClick={buyTicket} className="gradient-gold text-white">
                      Купить первый билет
                    </Button>
                  </div>
                ) : (
                  myTickets.map((ticket) => (
                    <Card key={ticket.id} className="border-2">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-bold text-lg">Билет #{ticket.id}</p>
                            <p className="text-sm text-muted-foreground">
                              Куплен: {new Date(ticket.purchaseDate).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <Badge 
                            variant={ticket.status === 'pending' ? 'secondary' : ticket.status === 'win' ? 'default' : 'destructive'}
                            className={ticket.status === 'pending' ? 'bg-yellow-500 text-white' : ''}
                          >
                            {ticket.status === 'pending' ? 'Ожидает' : ticket.status === 'win' ? 'Выигрыш!' : 'Не выиграл'}
                          </Badge>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {ticket.numbers.map((num, idx) => (
                            <div 
                              key={idx}
                              className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold shadow-md"
                            >
                              {num}
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          Розыгрыш: {new Date(ticket.drawDate).toLocaleDateString('ru-RU')}
                        </p>
                        {ticket.prize && (
                          <p className="text-xl font-bold text-green-600 mt-2">
                            Выигрыш: {ticket.prize.toLocaleString('ru-RU')} ₽
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Icon name="BookOpen" size={28} />
                  Правила лотереи
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Dice1" size={24} className="text-yellow-600" />
                    Как играть
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Купите билет за 5₽</li>
                    <li>Система автоматически сгенерирует 6 уникальных чисел от 1 до 45</li>
                    <li>Дождитесь розыгрыша (проводятся каждую субботу в 20:00 МСК)</li>
                    <li>Проверьте результаты в разделе "Результаты"</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Trophy" size={24} className="text-yellow-600" />
                    Призы
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-semibold">6 совпадений</span>
                      <span className="text-yellow-600 font-bold">Джекпот (от 500 000₽)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-semibold">5 совпадений</span>
                      <span className="text-purple-600 font-bold">50 000₽</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-semibold">4 совпадения</span>
                      <span className="text-orange-600 font-bold">5 000₽</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-semibold">3 совпадения</span>
                      <span className="text-green-600 font-bold">500₽</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={24} className="text-yellow-600" />
                    Важная информация
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Минимальный возраст участника: 18 лет</li>
                    <li>Билет действителен только для указанного розыгрыша</li>
                    <li>Выигрыши выплачиваются в течение 3 рабочих дней</li>
                    <li>Джекпот растет, если не разыгран</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Mail" size={28} />
                    Контакты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" size={24} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-semibold">Телефон</p>
                      <p className="text-muted-foreground">8 (800) 555-35-35</p>
                      <p className="text-sm text-muted-foreground">Звонок бесплатный</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" size={24} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-muted-foreground">support@lotomechty.ru</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="Clock" size={24} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-semibold">График работы</p>
                      <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00 МСК</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={24} className="text-yellow-600 mt-1" />
                    <div>
                      <p className="font-semibold">Адрес офиса</p>
                      <p className="text-muted-foreground">г. Москва, ул. Счастливая, д. 77</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="gradient-gold text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Остались вопросы?</CardTitle>
                  <CardDescription className="text-white/90">
                    Мы всегда готовы помочь вам!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3">
                    <Button variant="secondary" className="w-full py-6 text-lg font-semibold">
                      <Icon name="MessageCircle" className="mr-2" size={24} />
                      Онлайн-чат
                    </Button>
                    <Button variant="secondary" className="w-full py-6 text-lg font-semibold">
                      <Icon name="Send" className="mr-2" size={24} />
                      Telegram
                    </Button>
                    <Button variant="secondary" className="w-full py-6 text-lg font-semibold">
                      <Icon name="MessageSquare" className="mr-2" size={24} />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="gradient-gold text-white mt-16 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Icon name="Sparkles" size={24} />
            <p className="text-2xl font-bold">ЛотоМечты</p>
          </div>
          <p className="text-white/80">© 2026 ЛотоМечты. Все права защищены.</p>
          <p className="text-sm text-white/60 mt-2">Играйте ответственно. 18+</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;