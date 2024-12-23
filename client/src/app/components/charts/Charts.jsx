
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options= {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['var(--primary)', 'var(--secondaryDash)'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },

    toolbar: {
      show: true,
    },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
  markers: {
    size: 4,
    colors: 'var(--primary)',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.8,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};



const ChartOne= () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Students',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
      },

      {
        name: 'Teachers',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
      },
    ],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded bg-[var(--card)] px-5 pt-7 pb-5 sm:px-7 xl:col-span-8"  style={{boxShadow: "var(--box-shadow2)"}}>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-[800px] flex-wrap gap-3">
          <div className="flex">
            <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2 w-2 rounded-full bg-[var(--primary)]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[var(--primary)]">Total Students</p>
              <p className="text-sm font-medium text-[var(--foreground)]">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex">
            <span className="mt-1 mr-2 flex h-4 w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2 w-2 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Teachers</p>
              <p className="text-sm font-medium text-[var(--foreground)]">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1 ">
            <button className="rounded bg-[var(--primary)] py-1 px-3 text-xs font-medium text-[var(--card-foreground)] shadow-card hover:bg-bg-[var(--primary)] hover:shadow-card">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-[var(--card-foreground)] hover:bg-[var(--primary)] hover:shadow-card hover:">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-[var(--card-foreground)] hover:bg-[var(--primary)] hover:shadow-card ">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
