import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useTransactions } from '../../useTransactions';
import Loading from '../../../../components/ui/Loading';

export default function Chart() {
  const chartRef = useRef(null);
  const { transactions, loading } = useTransactions();

  useEffect(() => {
    if (loading) return;

    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Spendings',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: transactions.map((item) => ({
            value: item.amount,
            name: item.category,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
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
      }}
    />
  );
}
