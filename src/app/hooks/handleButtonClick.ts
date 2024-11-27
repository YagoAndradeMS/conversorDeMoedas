import fetchCurrencyData from '../api/api';
import CurrencyState from '../state/CurrencyState';

class HandleButtonClick {
  // Definindo o método como assíncrono e retornando os dados
  async handleButtonClick(option: { label: string; value: number }) {
    const currencyState = CurrencyState.getInstance();
    const { coin, days } = currencyState.getValues(); // Obtém os valores de 'coin' e 'days'

    currencyState.setCoinAndDays(`${coin}`, option.value); // Atualiza o 'coin' e 'days' globalmente
    const data = await fetchCurrencyData(option.value, coin); // Aguardando os dados da API

    // Retorna os dados formatados
    if (data && data.length > 0) {
      const labels = data.map((entry: any) =>
        new Date(Number(entry.timestamp) * 1000).toLocaleDateString()
      );
      const values = data.map((entry: any) =>
        Number(parseFloat(entry.bid).toFixed(2))
      );

      return { labels, values }; // Retornando os dados
    }

    return { labels: [], values: [] }; // Retorna valores vazios em caso de erro
  }
}

export default HandleButtonClick;
