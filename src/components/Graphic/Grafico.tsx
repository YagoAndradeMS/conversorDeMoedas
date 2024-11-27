'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import settings from './option';
import DataSet from '@/app/interfaces/Graphic/DATA-SET';
import HandleButtonClick from '@/app/hooks/handleButtonClick';
import CurrencyState from '@/app/state/CurrencyState';

// Registrar componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function Grafico() {
  const [chartData, setChartData] = useState<DataSet>({
    labels: ['Carregando...'],
    datasets: [
      {
        label: '',
        data: [],
        tension: 0.3,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });
  const [selected, setSelected] = useState<string | null>('7D');

  const options = [
    { label: '7D', value: 7 },
    { label: '1M', value: 30 },
    { label: '3M', value: 90 },
    { label: '6M', value: 183 },
    { label: '1A', value: 365 },
  ];

  const handleCurrencyUpdate = async () => {
    const currencyState = CurrencyState.getInstance();
    const { coin, days } = currencyState.getValues();

    const handler = new HandleButtonClick();
    const data = await handler.handleButtonClick({
      label: `${days}D`,
      value: days,
    });

    setChartData({
      labels: data.labels,
      datasets: [
        {
          label: `${coin} - Últimos ${days} dias`,
          data: data.values,
          tension: 0.3,
          backgroundColor: 'rgba(75,192,192,0.2)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    });
  };

  const handleButtonClick = (option: { label: string; value: number }) => {
    const currencyState = CurrencyState.getInstance();

    // Atualiza os dias no estado global
    currencyState.setCoinAndDays(currencyState.getValues().coin, option.value);

    // Atualiza o botão selecionado
    setSelected(option.label);
  };

  useEffect(() => {
    const currencyState = CurrencyState.getInstance();

    // Inscreve os dados iniciais
    const listener = () => handleCurrencyUpdate();
    currencyState.subscribe(listener);

    // Atualiza os dados iniciais
    handleCurrencyUpdate();

    // Remova a inscrição ao desmontar o componente
    return () => {
      currencyState.unsubscribe(listener);
    };
  }, []);

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-3 mb-5'>
        {options.map(option => (
          <button
            key={option.label}
            onClick={() => handleButtonClick(option)}
            className={`py-2 px-4 border-2 border-solid border-black rounded-md text-xs font-bold ${
              selected === option.label
                ? 'bg-zinc-600 text-white'
                : 'bg-zinc-200 text-black'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <Line data={chartData} options={settings} />
    </div>
  );
}
