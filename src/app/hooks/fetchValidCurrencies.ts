interface Currency {
  [key: string]: string;
}

export default async function fetchValidCurrencies(
  setCurrencies: React.Dispatch<React.SetStateAction<[string, string][]>>
) {
  try {
    const response = await fetch(
      'https://economia.awesomeapi.com.br/json/available/uniq'
    );
    const allCurrencies: Currency = await response.json();

    const validCurrencies: [string, string][] = []; // Ajuste aqui para ser um array de tuplas

    for (const [code, description] of Object.entries(allCurrencies)) {
      try {
        // Valida se a moeda tem dados disponíveis com BRL
        const dailyResponse = await fetch(
          `https://economia.awesomeapi.com.br/json/daily/${code}-BRL/7`
        );
        const dailyData = await dailyResponse.json();

        if (dailyResponse.status === 200 && dailyData.length > 0) {
          validCurrencies.push([code, description]);
        }
      } catch (error) {
        console.error(`Moeda ${code} indisponível com BRL`);
      }
    }

    setCurrencies(validCurrencies); // Passando corretamente como array de tuplas
  } catch (error) {
    console.error('Erro ao buscar moedas disponíveis:', error);
  }
}
