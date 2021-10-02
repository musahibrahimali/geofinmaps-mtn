import { Bar } from 'react-chartjs-2';

const BarChart = (props) => {

    const { normalReports, warningReports, criticalReports } = props;

    return (
        <div>
            <Bar
                data={{
                    labels: ['NORMAL', 'WARNING', 'CRITICAL'],
                    datasets: [
                        {
                            label: ['Reports'],
                            data: [
                                normalReports,
                                warningReports,
                                criticalReports
                            ],
                            backgroundColor: [
                                'rgba(0, 130, 18, 0.4)',
                                'rgba(255, 206, 86, 0.4)',
                                'rgba(255, 99, 132, 0.4)',
                            ],
                            borderColor: [
                                'rgba(0, 130, 18, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 2,
                        }
                    ]
                }}
                height={150}
                width={100}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    );
}

export default BarChart;