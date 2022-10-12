import React from 'react';
import Chart from 'react-google-charts';

const ScatterChartOptions = {
    title: "Wind Speed Prediction",
    titleFontSize: 25,
    colors: ["#88c6ed", "#d54799", "#82c341"],
    hAxis: {
        title: 'Day',
    },
    vAxis: {
        title: 'Mean Speed',
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
    
};

const MultiLineChart = ({ data }) => {

    return (
        <div className='container mt-2 mb-5'>
            <Chart
                width={'900px'}
                height={'410px'}
                style={{ 'margin': 'auto' }}
                chartType="ScatterChart"
                loader={<div>Loading Chart!</div>}
                data = {data}
                className={"scatterChart"}
                options={ScatterChartOptions}
                rootProps={{ 'data-testid': '2' }}
            />
        </div>
    );
};

export default MultiLineChart;
