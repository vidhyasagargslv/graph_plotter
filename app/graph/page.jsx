"use client"
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,Filler } from 'chart.js';
import styled, { keyframes } from 'styled-components';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const grow = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`;



const AnimatedLine = styled(Line)`
  animation: ${grow} 2s ease-out;
  transform-origin: bottom;
`;



const GraphPage = () => {
  const [xValue, setXValue] = useState(1);
  const [yValue, setYValue] = useState(1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, [xValue, yValue]);

  const handleXChange = (e) => {
    setXValue(Number(e.target.value));
  };

  const handleYChange = (e) => {
    setYValue(Number(e.target.value));
  };

  const handleClick = () => {
    setAnimate(true);
  };

  const data = {
    labels: Array.from({ length: 10 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'QUTRIX',
        data: Array(10).fill(null).map((_, i) => (i + 1 === xValue ? yValue : null)),
        fill: true,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        pointRadius: 7,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
      x: {
        ticks: {
          stepSize: 1,
        },
        min: 1,
        max: 10,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      onComplete: () => {
        const points = document.querySelectorAll('.point');
        points.forEach(point => {
          point.style.animation = `${blink} 1s infinite`;
        });
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  return (
    <div className='flex flex-col justify-center items-center gap-5'>
      <h1 className='text-5xl font-bold text-violet-600 max-md:text-3xl font-serif '>Graph Plot</h1>
      <div className='flex flex-wrap justify-center items-center gap-16 max-md:gap-4'>
      <div className='-ml-2.5'>
        <h3 className='text-base max-md:text-sm'>Enter X Value (1 to 10):</h3>
        <input
          type="number"
          min="1"
          max="10"
          value={xValue}
          onChange={handleXChange}
          className='text-black align-middle bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 block  sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs '
        />
      </div>
      <div>
        <h3 className='text-base max-md:text-sm'>Enter Y Values (1 to 100):</h3>
        <input
          type="number"
          min="1"
          max="100"
          value={yValue}
          onChange={handleYChange}
          className='text-black bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 block  sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs'
        />
      </div>
      </div>
      <button onClick={handleClick} className='btn text-white bg-blue-500 px-6 py-2 rounded-xl max-md:px-2 max-sm:py-1 max-sm:rounded-md'>
        Animate Graph
      </button>
      {animate && (
        <div style={{ position: 'relative', width: '50%', height: '500px', paddingTop: '10px' }} className='border boder-white m-5 p-3'>
          <AnimatedLine data={data} options={options} />
          
        </div>
      )}
    </div>
  );
};

export default GraphPage;
