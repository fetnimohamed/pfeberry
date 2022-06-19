//-----------------------|| DASHBOARD - BAJAJ AREA CHART ||-----------------------//

const chartData = {
    type: 'pie',
    height: 95,
    chart: {
        width: 380,
        type: 'pie'
    },
    options: {
        chart: {
            width: 200
        },
        legend: {
            position: 'bottom'
        }
        // chart: {
        //     id: 'support-chart',
        //     sparkline: {
        //         enabled: true
        //     }
        // },
        // dataLabels: {
        //     enabled: false
        // },
        // stroke: {
        //     curve: 'smooth',
        //     width: 1
        // },
        // tooltip: {
        //     fixed: {
        //         enabled: false
        //     },
        //     x: {
        //         show: false
        //     },
        //     y: {
        //         title: {
        //             formatter: (seriesName) => 'Ticket '
        //         }
        //     },
        //     marker: {
        //         show: false
        //     }
        // }
    },
    series: [
        {
            data: [0, 15, 10, 50]
        }
    ],
    chartOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
    }
};

export default chartData;
