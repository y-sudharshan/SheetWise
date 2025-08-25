import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Line, Scatter, Pie, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Chart2D = ({ data, config }) => {
  const chartRef = useRef();

  const processData = () => {
    if (!data || !config.xAxis || !config.yAxis) return null;

    const labels = data.map(item => item[config.xAxis]);
    const values = data.map(item => parseFloat(item[config.yAxis]) || 0);

    const colors = [
      'rgba(59, 130, 246, 0.8)',
      'rgba(16, 185, 129, 0.8)',
      'rgba(245, 101, 101, 0.8)',
      'rgba(251, 191, 36, 0.8)',
      'rgba(139, 92, 246, 0.8)',
      'rgba(236, 72, 153, 0.8)',
    ];

    const borderColors = [
      'rgba(59, 130, 246, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 101, 101, 1)',
      'rgba(251, 191, 36, 1)',
      'rgba(139, 92, 246, 1)',
      'rgba(236, 72, 153, 1)',
    ];

    let chartData = {
      labels,
      datasets: [{
        label: config.yAxis,
        data: values,
        backgroundColor: config.type === 'pie' || config.type === 'doughnut' 
          ? colors.slice(0, labels.length) 
          : colors[0],
        borderColor: config.type === 'pie' || config.type === 'doughnut' 
          ? borderColors.slice(0, labels.length) 
          : borderColors[0],
        borderWidth: 2,
        fill: config.type === 'area'
      }]
    };

    if (config.type === 'scatter') {
      chartData = {
        datasets: [{
          label: `${config.xAxis} vs ${config.yAxis}`,
          data: data.map(item => ({
            x: parseFloat(item[config.xAxis]) || 0,
            y: parseFloat(item[config.yAxis]) || 0
          })),
          backgroundColor: colors[0],
          borderColor: borderColors[0],
          borderWidth: 2
        }]
      };
    }

    return chartData;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: config.title,
        font: {
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: config.type !== 'pie' && config.type !== 'doughnut' ? {
      x: {
        display: true,
        title: {
          display: true,
          text: config.xAxis
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: config.yAxis
        }
      }
    } : {},
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };

  const chartData = processData();

  if (!chartData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No data to display</p>
      </div>
    );
  }

  const downloadChart = () => {
    if (chartRef.current) {
      const link = document.createElement('a');
      link.download = `${config.title || 'chart'}.png`;
      link.href = chartRef.current.toBase64Image();
      link.click();
    }
  };

  const renderChart = () => {
    const commonProps = {
      ref: chartRef,
      data: chartData,
      options
    };

    switch (config.type) {
      case 'line':
      case 'area':
        return <Line {...commonProps} />;
      case 'scatter':
        return <Scatter {...commonProps} />;
      case 'pie':
        return <Pie {...commonProps} />;
      case 'doughnut':
        return <Doughnut {...commonProps} />;
      default:
        return <Bar {...commonProps} />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={downloadChart}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Download PNG
        </button>
      </div>
      
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default Chart2D;
