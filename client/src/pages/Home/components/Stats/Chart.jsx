//* source: https://echarts.apache.org/examples/en/editor.html?c=pie-simple

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTransactions } from '../../../../hooks/useTransactions.js';

import Loading from '../../../../components/ui/Loading';
import { CATEGORY_COLORS } from '../../../../constants/categories';

export default function Chart() {
  const chartRef = useRef(null);
  const { transactions, loading } = useTransactions();

  useEffect(() => {
    if (loading) return;

    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      color: Object.values(CATEGORY_COLORS),
      animationDuration: 500,
      animationEasing: 'cubicOut',
      animationDurationUpdate: 300,
      series: [
        {
          name: 'Expenses',
          type: 'pie',
          radius: ['0%', '65%'],
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
          data: transactions.map((item) => ({
            value: item.amount,
            name: item.category,
            itemStyle: {
              color: CATEGORY_COLORS[item.category],
            },
          })),
        },
      ],
    };

    const handleResize = () => {
      myChart.resize();
    };

    window.addEventListener('resize', handleResize);
    myChart.setOption(option);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, [transactions, loading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      ref={chartRef}
      style={{
        width: '100%',
        height: '400px',
        minWidth: '600px', // Increased minimum width
        padding: '20px 40px', // Added padding for label space
      }}
      className='chart-pie'
    />
  );
}
