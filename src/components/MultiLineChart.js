import React from 'react';
import Chart from 'react-google-charts';

const ScatterChartWindOptions = {
    title: "Wind Speed Prediction",
    titleFontSize: 25,
    colors: ["#88c6ed", "#d54799", "#82c341"],
    hAxis: {
        title: 'Days (in 1 year)',
    },
    vAxis: {
        title: 'Wind Speed (m/s)',
    },
    series: {
        1: {
            curveType: 'function'
        },
    },
    animation: {
        duration: 1000,
        easing: "inAndOut",
    },
    trendlines: {
        0: {
            type: "linear",
            labelInLegend: "Trend Line",
            visibleInLegend: true,
            color: "red"
        }
    },
};


const ScatterChartTempOptions = {
    title: "Temperature Prediction",
    titleFontSize: 25,
    colors: ["#88c6ed", "#d54799", "#82c341"],
    hAxis: {
        title: 'Days (in 1 year)',
    },
    vAxis: {
        title: 'Temperature (°C)',
    },
    series: {
        1: {
            curveType: 'function'
        },
    },
    animation: {
        duration: 1000,
        easing: "inAndOut",
    },
    trendlines: {
        0: {
            type: "linear",
            labelInLegend: "Trend Line",
            visibleInLegend: true,
            color: "red"
        }
    },
};

const MultiLineChart = ({ data, type }) => {

    return (
        <div className='container chart-container mt-2 mb-5'>
            <Chart
                width={'900px'}
                height={'410px'}
                style={{ 'margin': 'auto' }}
                chartType="ScatterChart"
                loader={<div>Loading Chart!</div>}
                data={data}
                className={"scatterChart"}
                options={type === 'wind' ? ScatterChartWindOptions : ScatterChartTempOptions}
                rootProps={{ 'data-testid': '2' }}
            />
            <div className='graph-breif'>
                {
                    type === 'wind' ?
                        <ul type='square'>
                            <li><span>4.0 m/s</span> - small turbines</li>
                            <li><span>5.8 m/s</span> - utility scale turbines</li>
                        </ul> :
                        <ul type='square'>
                            <li><span>25</span>  °C - Min Temp Operation</li>
                            <li><span>50-60</span>  °C - Max Temp Operation</li>
                        </ul>
                }
            </div>
        </div>
    );
};

export default MultiLineChart;
