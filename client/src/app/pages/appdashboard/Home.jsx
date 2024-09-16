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

import "../../../assets/css/admin/_home.scss";
import { useAuthGuard } from "../../_guard/auth.guard";
import { useLoaderData } from 'react-router-dom';


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
  const dashboardInfo = useLoaderData();
  console.log(dashboardInfo)

  const dashboardDetails = [
        {
            "id" : 35,
            "icon" : "Students",
            "heading" : "Total Students",
            "info" : `${dashboardInfo.totalStudent} Students`
        },
        {
            "id" : 36,
            "icon" : "Teachers",
            "heading" : "Total Teachers",
            "info" : `${dashboardInfo.totalTeacher} Teachers`
        },
        {
            "id" : 37,
            "icon" : "Courses",
            "heading" : "Total Courses",
            "info" : `${dashboardInfo.totalCourse} Courses`
        },
        {
            "id" : 38,
            "icon" : "Trannings",
            "heading" : "Total Trannings",
            "info" : "47 Trannings"
        }
    ]
  

  return (
    <>
      <section className="_homeHeader">
        <div className="_homeNav">
          {
            dashboardDetails.map((item, index) => {
              return (
                <Containerbox {...item} key={index} />
              )
            })
          }
        </div>
        <div className="_chart">
          <div className="_lineChart">
            <ChartOne/>
          </div>
          <div className="_pieChart">
            <ChartTwo {...dashboardInfo}/>
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
