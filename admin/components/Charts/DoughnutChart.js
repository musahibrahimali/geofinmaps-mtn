import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = (props) => {

    const { normalReports, warningReports, criticalReports } = props;

    return (
        <div>
            <Doughnut
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
                                'rgba(0, 130, 18, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(255, 99, 132, 0.5)',
                            ],
                            borderColor: [
                                'rgba(0, 130, 18, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(255, 99, 132, 1)',
                            ],
                            borderWidth: 1,
                        }
                    ]
                }}
                height={150}
                width={100}
                options={{
                    maintainAspectRatio: false,
                }}
            />
        </div>
    );
}

export default DoughnutChart;