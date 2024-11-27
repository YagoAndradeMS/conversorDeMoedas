class CurrencyState {
  private static instance: CurrencyState;

  private coin: string = 'USD-BRL';
  private days: number = 7;
  private listeners: (() => void)[] = []; // lista de funções para notificar mudanças

  private constructor() {}

  public static getInstance(): CurrencyState {
    if (!CurrencyState.instance) {
      CurrencyState.instance = new CurrencyState();
    }
    return CurrencyState.instance;
  }

  // Atualiza a moeda e os dias e notifica os ouvintes
  public setCoinAndDays(coin: string, days: number) {
    if (this.coin === coin && this.days === days) {
      return; // Não notifica se os valores não mudaram
    }

    this.coin = coin;
    this.days = days;
    this.notifyListeners();
  }

  // Retorna os valores atuais de moeda e dias
  public getValues() {
    return { coin: this.coin, days: this.days };
  }

  // Adiciona uma função para ser notificada quando os valores mudarem
  public subscribe(listener: () => void) {
    this.listeners.push(listener);
  }

  // remove um ouvintes
  public unsubscribe(listener: () => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  // Notifica todos os ouvintes
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

export default CurrencyState;
