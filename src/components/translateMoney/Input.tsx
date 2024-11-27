'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import CurrencyState from '@/app/state/CurrencyState';

export default function input() {
  const [money, setMoney] = useState<string>('0');
  const [moneyGraphic, setMoneyGraphic] = useState<string>('0');
  const currencyState = CurrencyState.getInstance();

  const handleChange =
    (setValue: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };

  return (
    <main className='flex flex-1 flex-col w-full items-center justify-center m-auto bg-zinc-500'>
      <div>
        <h1>Conversor de Moedas</h1>
        <input
          type='number'
          name=''
          id=''
          value={money}
          onChange={handleChange(setMoney)}
        />
      </div>
      <div>
        <h1>Input</h1>
        <input
          type='text'
          name=''
          id=''
          value={moneyGraphic}
          onChange={handleChange(setMoneyGraphic)}
        />
      </div>
    </main>
  );
}
