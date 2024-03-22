'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('');
  const [imagePath, setImagePath] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Add leading zeros to minutes and seconds if needed
      const formattedMinutes = (minutes < 10) ? `0${minutes}` : minutes;
      const formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

      setCurrentTime(`${hours}:${formattedMinutes}:${formattedSeconds}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const greetingTime = getGreetingTime();
    let imagePath = '';

    if (greetingTime === 'Night') {
      imagePath = '/sleep-menhera-chan.png';
    } else if (greetingTime === 'Morning') {
      imagePath = '/8841-menhera-morning2.png';
    } else if (greetingTime === 'Afternoon') {
      imagePath = '/5271-menhera-chillout.png';
    } else {
      imagePath = '/1370-menhera-tired.png';
    }

    setGreeting(`Good ${greetingTime}`);
    setImagePath(imagePath);
  }, []);

  function getGreetingTime(): string {
    const currentHours: number = new Date().getHours();
  
    if (currentHours < 4) {
      return 'Night';
    } else if (currentHours < 12) {
      return 'Morning';
    } else if (currentHours < 17) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  return (
    <div data-theme='synthwave' className='w-full flex flex-col min-h-screen items-center justify-center'>
        <div className="sm:w-48 sm:mx-auto">
          <Image
          src={imagePath}
          alt="Greeting Image"
          width={300}
          height={300}
          className="w-full h-auto sm:max-w-full sm:h-auto"
          />
        </div>
        <div className='text-center text-5xl font-bold sm:text-5xl'>
        {greeting}
        </div>
        <h1 className='text-center text-5xl font-bold sm:text-8xl'>{currentTime}</h1>
        <form action="https://duckduckgo.com/" target="_blank" method="GET" className="flex search-bar items-center justify-center">
          <input data-theme='synthwave' className="flex search text-center input input-bordered input-accent w-full max-w-xs m-1" type="text" placeholder="Search Here" name="q" />
          <button className='btn btn-accent m-1' data-theme='synthwave'
            type="submit">
            <Image
            src="/icons8-search.svg"
            alt="Search"
            width={20}
            height={20} />
          </button>
        </form>
    </div>
  );
};

export default MyComponent;