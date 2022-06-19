import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import dashboardService from '../../../service/dashboard-service';

// import { useDispatch, useSelector } from 'react-redux';
// import { listComponents } from '../../../store/actions/componentsActions';
// import { listTaskModels } from '../../../store/actions/taskModelActions';

export const PieChart = () => {
    const { tasksPerDepartment } = dashboardService();
    useEffect(async () => {
        const data = await tasksPerDepartment();
        console.log(data.data);
        if (data.data) {
            setState({
                type: 'pie',
                series: data.data.series,
                options: {
                    chart: {
                        width: 380,
                        type: 'pie'
                    },
                    labels: data.data.label,
                    responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }
                    ]
                }
            });
        }
    }, []);
    const [state, setState] = useState({
        type: 'pie',
        series: [44, 55, 13, 43, 22],
        options: {
            chart: {
                width: 380,
                type: 'pie'
            },
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    });
    return <ReactApexChart options={state.options} series={state.series} type="pie" height={300} />;
};
