import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Hard', 'Easy', 'Medium'],
  datasets: [
    {
      label: '# of Votes',
      data: [5, 15, 10],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
       
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
       
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'DSA Progress Chart',
    },
  },
};

const PieChart = () => (
    <div className='pichart'>
        <Pie options={options} data={data}/>
    </div>
);

export default PieChart;
