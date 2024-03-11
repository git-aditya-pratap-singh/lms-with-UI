import { Chart } from "react-google-charts";
import PropTypes from "prop-types";

import Students from "../../assets/img/totalStu.png";
import Teachers from "../../assets/img/totalTea.png";
import Courses from "../../assets/img/totalCourse.png";
import Trannings from "../../assets/img/totalTrann.png";
import Data from "../Data/Data.json";
import "../../assets/css/admin/_home.scss";


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

// PieChart ----------------------
export const pieOptions = {
  title: "My Daily Activities",
  is3D: true,
};
// --------------------

export const data2 = [
  [
    { type: "date", label: "Day" },
    "Average temperature",
    "Average hours of daylight",
  ],
  [new Date(2014, 0), -0.5, 5.7],
  [new Date(2014, 1), 0.4, 8.7],
  [new Date(2014, 2), 0.5, 12],
  [new Date(2014, 3), 2.9, 15.3],
  [new Date(2014, 4), 6.3, 18.6],
  [new Date(2014, 5), 9, 20.9],
  [new Date(2014, 6), 10.6, 19.8],
  [new Date(2014, 7), 10.3, 16.6],
  [new Date(2014, 8), 7.4, 13.3],
  [new Date(2014, 9), 4.4, 9.9],
  [new Date(2014, 10), 1.1, 6.6],
  [new Date(2014, 11), -0.2, 4.5],
];

export const options2 = {
  chart: {
    title: "Average Temperatures and Daylight in Iceland Throughout the Year",
  },
  width: 0,
  height: 500,
  series: {
    // Gives each series an axis name that matches the Y-axis below.
    0: { axis: "Temps" },
    1: { axis: "Daylight" },
  },
  axes: {
    // Adds labels to each axis; they don't have to match the axis names.
    y: {
      Temps: { label: "Temps (Celsius)" },
      Daylight: { label: "Daylight" },
    },
  },
};

const boxiconComponents = {
  Students,
  Teachers,
  Courses,
  Trannings
};

const Home_admin = () => {
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
          <div className="_mapsChart">
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
          </div>
          <div className="_pieChart">
            <Chart
              chartType="PieChart"
              data={data}
              options={pieOptions}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>

        <div className="_lineChart">
          <Chart
            chartType="Line"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
        </div>
      </section>
    </>
  );
};
export default Home_admin;



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
