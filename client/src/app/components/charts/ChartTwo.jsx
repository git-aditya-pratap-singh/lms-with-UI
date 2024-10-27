import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options= {
  chart: {
    fontFamily: 'Satoshi, sans-serif',//'#6577F3',
    type: 'donut',
  },
  colors: ['var(--primary)', 'var(--secondaryDash)' , 'var(--ternaryDash)', 'green'],
  labels: ['Students', 'Teachers', 'Courses', 'Tranning'],
  legend: {
    show: false,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '55%',
        background: 'white',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2400,
      options: {
        chart: {
          width: 390,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartTwo = (props) => { 

  const percentageList = Object.keys(props).map((items) => Math.floor((props[items] * 100) / (props.totalStudent + props.totalTeacher)))
  const [state, setState] = useState({series: Object.values(props)});

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
      series: [65, 34, 12, 56],
    }));
  };
  handleReset;

  return (
    <div className="max-w-[400px] sm:px-7 col-span-12 rounded border border-stroke bg-white px-5 pb-5 pt-7 shadow-default  xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black">
            Dashboard Analysis
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-5 w-6 rounded-full bg-[var(--primary)]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black">
              <span> Students </span>
              <span> {percentageList[0]}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-5 w-6 rounded-full bg-[var(--secondaryDash)]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Teachers </span>
              <span> {percentageList[1]}% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-5 w-6 rounded-full bg-[var(--ternaryDash)]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Courses </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="sm:w-1/2 w-full px-8">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-5 w-6 rounded-full bg-[var(--ternaryDash)]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black ">
              <span> Tranning </span>
              <span> 12% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
