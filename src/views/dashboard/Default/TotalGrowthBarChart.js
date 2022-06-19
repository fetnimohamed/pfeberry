import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Grid, MenuItem, TextField, Typography, useTheme } from '@material-ui/core';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from './../../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from './../../../ui-component/cards/MainCard';
import { gridSpacing } from './../../../store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { listComponents } from '../../../store/actions/componentsActions';
import { listTaskModels } from '../../../store/actions/taskModelActions';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import { Button } from '@mui/material';
import { TaskStatesChart } from './taskStatesChart';
import dashboardService from '../../../service/dashboard-service';
import { PieChart } from './PieChart';

const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

//-----------------------|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||-----------------------//

const TotalGrowthBarChart = ({ isLoading }) => {
    ////
    const [components, setComponentsList] = React.useState([]);
    const [component, setComponent] = React.useState({});
    const [taskModels, setTaskModels] = React.useState([]);
    const [model, setModel] = React.useState({});
    const [chart, setchart] = React.useState({ ...chartData, showViz: true });
    const componentsList = useSelector((state) => state.componentsList);
    const taskModelList = useSelector((state) => state.taskModelList);
    const dispatch = useDispatch();
    ////
    //////
    const { tasksForChart } = dashboardService();
    const [value, setValue] = React.useState('today');
    const theme = useTheme();

    const primary = theme.palette.text.primary;
    const grey200 = theme.palette.grey[200];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;
    const grey500 = theme.palette.grey[500];
    const handleLoad = async () => {
        setchart({ ...chartData, showViz: false });
        console.log(chartData);
        const data = await tasksForChart(model._id, component._id);
        if (data.data.data.length > 0) {
            console.log(data.data.data);
            chartData.options.xaxis.categories = data.data.categories;
            chartData.series = data.data.data;
            const newChartData = {
                ...chartData.options,
                colors: [primary200, primaryDark, secondaryMain, secondaryLight],
                xaxis: {
                    labels: {
                        style: {
                            colors: [
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary,
                                primary
                            ]
                        }
                    }
                },
                yaxis: {
                    labels: {
                        style: {
                            colors: [primary]
                        }
                    }
                },
                grid: {
                    borderColor: grey200
                },
                tooltip: {
                    theme: 'light'
                },
                legend: {
                    labels: {
                        colors: grey500
                    }
                }
            };
            setchart({ ...chartData, options: newChartData, showViz: true });
            console.log(chart);
        }
    };
    React.useEffect(() => {
        dispatch(listComponents());
        dispatch(listTaskModels());
    }, [dispatch]);
    React.useEffect(() => {
        console.log(componentsList, taskModelList);
        if (componentsList.loading === false) setComponentsList(componentsList.components.components);
        if (taskModelList.loading === false) setTaskModels(taskModelList.taskModels.taskModels);
    }, [componentsList, taskModelList]);
    React.useEffect(() => {
        setchart(chart);
    }, [chart]);
    React.useEffect(() => {
        const newChartData = {
            ...chartData.options,
            colors: [primary200, primaryDark, secondaryMain, secondaryLight],
            xaxis: {
                labels: {
                    style: {
                        colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            }
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, grey200, isLoading, grey500]);
    React.useEffect(() => {
        console.log(chartData);
    }, []);
    return (
        <React.Fragment>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <TextField
                                        id="standard-select-currency"
                                        label="Task Model"
                                        select
                                        sx={{ marginLeft: '5px', width: '150px' }}
                                        value={model}
                                        onChange={(e) => setModel(e.target.value)}
                                    >
                                        {/* <MenuItem key={{}} value={{}} selected={true}>
                                            nothing
                                        </MenuItem> */}
                                        {taskModels.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="standard-select-currency"
                                        label="Components"
                                        select
                                        sx={{ marginLeft: '5px', width: '150px' }}
                                        value={component}
                                        onChange={(e) => setComponent(e.target.value)}
                                    >
                                        {/* <MenuItem key={{}} value={{}} selected={true}>
                                            nothing
                                        </MenuItem> */}
                                        {components.map((option, i) => (
                                            <MenuItem key={i} value={option}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        style={{ marginLeft: '5px', marginTop: '5px', float: 'right' }}
                                        onClick={handleLoad}
                                    >
                                        Load
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid item>
                                <Typography variant="h4">Tasks per week :</Typography>
                            </Grid>
                            {chart ? <TaskStatesChart data={chart} /> : <></>}
                            {/* <PieChart /> */}
                            {/* <Chart {...chart} /> */}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </React.Fragment>
    );
};

TotalGrowthBarChart.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalGrowthBarChart;
