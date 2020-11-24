import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};


const buildChartData = (data, casesType='cases') => { // will take cases automatically if casesType isnt mentioned  
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    console.log("@@@@@@@@",lastDataPoint )
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
        
      };
      
      chartData.push(newDataPoint);

    }
    lastDataPoint = data[casesType][date];
    // console.log("LAST DATA POINT 2",lastDataPoint)
  }
  return chartData;
};


function LineGraph({ casesType = 'cases' }) {
  const [data,setData] = useState({})

  useEffect(() => {
    
    fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
    .then((res) => res.json())
    .then((info) => {
      const chartData =buildChartData(info)
      setData(chartData)
      // console.log("^^^^",chartData)
    })
    
  }, [casesType])
  // console.log("D@T@",data)

  return (
    <div>
      <h3>World wide cases</h3> <br/>
      {data?.length > 0 &&
      <Line data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }} options={options} />
        }
    </div>
  )
}

export default LineGraph
