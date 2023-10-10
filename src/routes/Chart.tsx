import React from 'react'
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from "react-apexcharts"
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';


interface ChartProps {
  coinId: string;
}

interface IHisorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}


function Chart({coinId} : ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const {isLoading, data} = useQuery<IHisorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
  {
    refetchInterval: 10000,
  }

  );
  return (
    <>
      {isLoading ? "Loading chart..." : 
        <ApexChart 
          type='line' 
          series={[
            {
              name: "Price",
              data: data?.map(price => parseFloat(price.close)) ?? [] // ?? [] : 데이터가 null 되는걸 방지
            },
          ]}
          options={{
            theme:{
              mode: isDark ? "dark" : "light"
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show:false
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            grid: {
              show:false,
            },
            xaxis: {
              labels:{
                show:false
              },
              axisTicks:{
                show:false
              },
              axisBorder:{
                show:false
              },
              categories: data?.map((price) => price.time_open),
              type: "datetime"
            },
            yaxis: {
              show: false
            },
            fill:{
              type: "gradient",
              gradient: {gradientToColors: ["blue"], stops: [0, 100]},
            },
            colors: ["red"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              }
            }
          }} 
        />
      }
    </>
  )
}

export default Chart