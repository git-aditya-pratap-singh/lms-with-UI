import { useState } from "react";
import { Chart } from "react-google-charts";
import PropTypes from "prop-types";
//import { PieChart } from '@mui/x-charts/PieChart';
import ChartOne from "../../components/charts/Charts";
import ChartTwo from "../../components/charts/ChartTwo";

// ---Calender---------
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// ---------------------

import Students from "../../../assets/img/totalStu.png";
import Teachers from "../../../assets/img/totalTea.png";
import Courses from "../../../assets/img/totalCourse.png";
import Trannings from "../../../assets/img/totalTrann.png";

import Data from "../../Data/Data.json";
import "../../../assets/css/admin/_home.scss";
import { useAuthGuard } from "../../_guard/auth.guard";


const boxiconComponents = {
  Students,
  Teachers,
  Courses,
  Trannings
};

// Maps Chart -------------------------------
export const data = [
  ["Country", "Popularity"],
  ["Germany", 400],
  ["United States", 400],
  ["Brazil", 600],
  ["Canada", 500],
  ["France", 500],
  ["RU", 700],
  ["INDIA", 700],
];

export const options = {
  colorAxis: { colors: ["086375", "6fffe9", "007DFC"] },
  datalessRegionColor: "#f0f8ff",
};
//---------------------------------------

export const dataLine = [
  ["Year", "Students", "Teachers"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

export const optionsLine = {
  title: "Performance",
  curveType: "function",
  legend: { position: "bottom" },
};

const dataa = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
];


const Home_admin = () => {
  const [value, setValue] = useState(dayjs('2022-04-17'));
  const [auth, setAuth] = useAuthGuard();
  console.log("HOME",auth)

  return (
    <>
      <section className="_homeHeader">
        <div className="_homeNav">
          {
            Data.dashboard_boxModel.map((item, index) => {
              return (
                <Containerbox {...item} key={index} />
              )
            })
          }
        </div>
        <div className="_chart">
          <div className="_lineChart">
            {/* <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              data={dataLine}
              options={optionsLine}
            /> */}
            <ChartOne/>
          </div>
          <div className="_pieChart">
            {/* <PieChart
              series={[
                {
                  data: [...dataa],
                  innerRadius: 25,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -180,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                }
              ]}
              width={400}
              height={300}
              // legend={{ hidden: true }}
            /> */}
            <ChartTwo/>
          </div>
        </div>

        <div className="_mapsChart">
          <span>
            <Chart
              chartEvents={[
                {
                  eventName: "select",
                  callback: ({ chartWrapper }) => {
                    const chart = chartWrapper.getChart();
                    const selection = chart.getSelection();
                    if (selection.length === 0) return;
                  },
                },
              ]}
              chartType="GeoChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </span>

          <span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateCalendar', 'DateCalendar']}>
                <DemoItem label="Calendar">
                  <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </span>
        </div>
        
      </section>
    </>
  );
};


const Containerbox = ({ icon, heading, info }) => {
  const IconComponent = boxiconComponents[icon];
  return (
    <section className="_boxmodel">
      <div className="_box">
      <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
              <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
            </svg>
          </div>
        <div className="_iconbox">
          <img src={IconComponent && IconComponent} />
        </div>
        <div className="_boxinfo">
          <label>{heading}</label>
          <span>{info}</span>
        </div>
      </div>
    </section>
  )
}

Containerbox.propTypes = {
  icon: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  info: PropTypes.string.isRequired
}

export default Home_admin;
