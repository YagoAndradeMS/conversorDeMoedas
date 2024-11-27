'use client';

import { useState, useEffect } from 'react';
import CurrencyState from '@/app/state/CurrencyState';
import fetchValidCurrencies from '@/app/hooks/fetchValidCurrencies';

interface Currency {
  [key: string]: string;
}

export default function Navigation() {
  const [currencies, setCurrencies] = useState<[string, string][]>([]);

  useEffect(() => {
    fetchValidCurrencies(setCurrencies);
  }, []);

  const handleCurrencyClick = (money: string) => {
    const currencyState = CurrencyState.getInstance();
    const { coin, days } = currencyState.getValues();
    currencyState.setCoinAndDays(`${money}-BRL`, days); // Atualiza para os últimos 7 dias
    console.log(coin, days);
  };

  return (
    <div className='flex flex-col bg-zinc-700 flex-1 w-full h-full'>
      <h1 className='mb-4'>
        <strong>Moedas e Cotações</strong>
      </h1>
      <ul className='flex flex-col items-start space-y-6 overflow-y-auto max-h-screen'>
        {currencies.map(([code, description], index) => (
          <li
            key={code}
            className='w-full opacity-0 transform translate-y-4 transition-all duration-200 ease-out'
            style={{
              animation: `fadeInUp 0.1s ease-out ${index * 0.1}s forwards`,
            }}
          >
            <button
              className='w-full'
              onClick={() => handleCurrencyClick(code)}
            >
              <div className='flex flex-col items-start text-left hover:bg-white'>
                <strong>{code}:</strong> {description}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
