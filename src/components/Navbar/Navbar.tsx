'use client';
import { useState, useRef } from 'react';
import Navigation from './Navigation';
import useOutsideClick from '@/app/hooks/useOutsideClick';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  function toggleNavigation(event: React.MouseEvent) {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  // Fechar ao clicar fora
  useOutsideClick(navbarRef, () => setIsOpen(false));

  return (
    <div className='relative'>
      {/* Botão de abrir a Navbar */}
      <button
        onClick={toggleNavigation}
        className='bg-zinc-200 w-14 h-12 flex flex-col justify-around rounded-r-xl space-y-1 hover:cursor-pointer active:scale-90 transition hover:bg-zinc-300 group'
      >
        <span className='w-12 h-[2px] bg-zinc-400 rounded-full transition group-hover:bg-zinc-600' />
        <span className='w-12 h-[2px] bg-zinc-400 rounded-full transition group-hover:bg-zinc-600' />
        <span className='w-12 h-[2px] bg-zinc-400 rounded-full transition group-hover:bg-zinc-600' />
      </button>

      {/* Navbar lateral */}
      {isOpen && (
        <>
          <div className='absolute inset-0 bg-black bg-opacity-20 z-10 h-screen'></div>
          <div
            ref={navbarRef}
            className='absolute top-0 left-0 h-screen bg-zinc-600 w-[50%] z-10 p-3 rounded-lg shadow-md'
          >
            <Navigation />
          </div>
        </>
      )}
    </div>
  );
}
