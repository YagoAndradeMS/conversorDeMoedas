'use client';
import Grafico from '@/components/Graphic/Grafico';
import Navbar from '@/components/Navbar/Navbar';
import Input from '../components/translateMoney/Input';

export default function Home() {
  return (
    <div className='relative m-auto flex flex-col max-w-96 h-screen bg-zinc-100'>
      <Navbar />
      <div className='bg-zinc-200 w-72 h-6 flex flex-col mt-8 mx-auto items-center justify-center rounded-xl'>
        <h1 className=''>Conversor de Moeda</h1>
      </div>
      <div className='max-w-80 mx-auto my-20'>
        <Grafico />
      </div>
      <Input />
    </div>
  );
}
