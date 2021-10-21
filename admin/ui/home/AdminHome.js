import React from 'react';
import ReportContent from "./reports/ReportContent";
import UsersContent from "./users/UsersContent";
import {
    StatisticsCard,
    DoughnutChart,
    BarChart
} from '../../../admin/admin';

function AdminHome(props) {
    const { reports, users } = props;
    /* dash items colors  */
    let normalDash = false;
    let warningDash = false;
    let criticalDash = false;
    let notDash = true;
    let criticalReports = 0;
    let warningReports = 0;
    let normalReports = 0;
    let usersOnline = 0;

    const handleCounts = () => {
        // handle users stuff
        users.forEach((user) => {
            if (user.isOnline) {
                usersOnline++;
            }
        });

        // handle report stuff
        reports.forEach((report) => {
            if (report.reportType.toString().toLowerCase() === "danger") {
                criticalDash = true;
                criticalReports++;
            } else if (report.reportType.toString().toLowerCase() === "warning") {
                warningDash = true;
                warningReports++;
            } else {
                normalDash = true;
                normalReports++;
            }
        });

    }
    handleCounts();

    return (
        <div className="mt-16">
            {/* statistics */}
            <div className="grid md:grid-cols-3 gap-2 bg-white">
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users"}
                    itemCount={users.length}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users Online"}
                    itemCount={usersOnline}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Reports"}
                    itemCount={reports.length}
                />
            </div>
            <div className="mt-4">
                <div className="grid md:grid-cols-3 gap-2 bg-white">
                    <StatisticsCard
                        normalDash={normalDash}
                        itemTitle={"Normal Reports"}
                        itemCount={normalReports}
                    />
                    <StatisticsCard
                        warningDash={warningDash}
                        itemTitle={"Warning Reports"}
                        itemCount={warningReports}
                    />
                    <StatisticsCard
                        criticalDash={criticalDash}
                        itemTitle={"Critical Reports"}
                        itemCount={criticalReports}
                    />
                </div>
                <div className="mt-8 mx-4 grid md:grid-cols-2 grid-rows-1 gap-2">
                    <div className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                        <BarChart
                            normalReports={normalReports}
                            warningReports={warningReports}
                            criticalReports={criticalReports}
                        />
                    </div>
                    <div className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                        <DoughnutChart
                            normalReports={normalReports}
                            warningReports={warningReports}
                            criticalReports={criticalReports}
                        />
                    </div>
                </div>
            </div>

            {/* users and reports */}
            <ReportContent reports={reports} />
            <UsersContent users={users} />
        </div>
    );
}

export default AdminHome;