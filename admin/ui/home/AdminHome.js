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
    let usersActive = 0;

    const handleCounts = () => {
        // handle users stuff
        users.map((user) => {
            if (user) {
                usersActive++;
            }
        });

        // handle report stuff
        reports.forEach((report) => {
            if (report.level.toString().toLowerCase() === "danger") {
                normalDash = true;
                warningDash = true;
                criticalDash = true;
                criticalReports++;
            } else if (report.level.toString().toLowerCase() === "warning") {
                normalDash = true;
                warningDash = true;
                criticalDash = true;
                warningReports++;
            } else {
                normalDash = true;
                warningDash = true;
                criticalDash = true;
                normalReports++;
            }
        });

    }
    handleCounts();

    return (
        <div className="mt-16">
            {/* statistics */}
            <div className="grid md:grid-cols-3 gap-2 bg-white dark:bg-gray-900">
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users"}
                    itemCount={users.length}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users Active"}
                    itemCount={usersActive}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Reports"}
                    itemCount={reports.length}
                />
            </div>
            <div className="mt-4">
                <div className="grid md:grid-cols-3 gap-2 bg-white dark:bg-gray-900">
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