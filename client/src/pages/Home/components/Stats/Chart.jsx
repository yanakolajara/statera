import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { CATEGORY_COLORS } from '../../../../constants/categories';

export default function Chart({ expenses, loading }) {
  const chartRef = useRef(null);
  const myChartRef = useRef(null); // Store the chart instance

  useEffect(() => {
    if (loading) return;

    const chartDom = chartRef.current;

    // Check if chart already exists, reuse it
    if (!myChartRef.current) {
      myChartRef.current = echarts.init(chartDom);
    }
    const myChart = myChartRef.current;

    const option = {
      tooltip: {
        trigger: 'item',
      },
      color: Object.values(CATEGORY_COLORS),
      animationDuration: 500, // Initial load animation
      animationDurationUpdate: 500, // Smooth transitions for updates
      animationEasingUpdate: 'linear', // Smooth movement of sections
      animationTypeUpdate: 'expansion', // Expands the sections instead of resetting
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: ['0%', '100%'], // Full circle (no donut effect)
          center: ['50%', '50%'],
          label: {
            show: true,
            formatter: '{b}: {d}%',
            position: 'outside',
            alignTo: 'edge',
            margin: 20,
            edgeDistance: '10%',
            color: '#d9d9d9',
            fontSize: 14,
            fontWeight: 500,
            textBorderColor: 'transparent',
            backgroundColor: 'transparent',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
          },
          labelLine: {
            length: 15,
            length2: 30,
            maxSurfaceAngle: 80,
            lineStyle: {
              color: '#666666',
            },
          },
          data: expenses.map((item) => ({
            value: item.amount,
            name: item.category,
            itemStyle: {
              color: CATEGORY_COLORS[item.category],
            },
          })),
        },
      ],
    };

    // Update the chart without resetting everything
    myChart.setOption(option, { notMerge: false, lazyUpdate: true });

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [expenses, loading]);

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px',
        minWidth: '600px',
        padding: '20px 40px',
      }}
      className='chart-pie'
    />
  );
}
