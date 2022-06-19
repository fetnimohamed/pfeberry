import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';

export const TaskStatesChart = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);
    return data.showViz ? <Chart options={data.options} series={data.series} type="bar" height={300} /> : <LinearProgress />;
};
