import { Chart } from "react-google-charts";
import "../../assets/css/admin/_home.scss";

export const data = [
    ["Year", "Sales", "Expenses"],
    ["2013", 1000, 400],
    ["2014", 1170, 460],
    ["2015", 660, 1120],
    ["2016", 1030, 540],
  ];
  
  export const options = {
    title: "Company Performance",
    hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
    vAxis: { minValue: 0 },
    chartArea: { width: "50%", height: "70%" },
  };

const Home_admin = () => {
  return (
    <>
      <section className="_homeHeader">
        <div className="_homeNav">
           <Containerbox/>
           <Chart
      chartType="AreaChart"
      width="80%"
      height="300px"
      data={data}
      options={options}
    />
        
        </div>
        <div className="_chart"></div>
      </section>
    </>
  );
};
export default Home_admin;


const Containerbox = ()=>{
    return(
        <>
        <section>
        </section>
        </>
    )
}
