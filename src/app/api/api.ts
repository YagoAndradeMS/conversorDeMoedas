import CurrencyData from '../interfaces/Graphic/CURRENCY-DATA';

export default async function fetchCurrencyData(days: number, coin: string) {
  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/json/daily/${coin}/${days}`
    );

    if (!response.ok) {
      throw new Error(`Erro ao buscar dados da API: ${response.statusText}`);
    }

    const data: CurrencyData[] = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
    return null;
  }
}
