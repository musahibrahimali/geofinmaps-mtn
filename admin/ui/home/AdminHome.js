import React from 'react';
import ReportContent from "./reports/ReportContent";
import UsersContent from "./users/UsersContent";
import {
    StatisticsCard,
    DoughnutChart,
    BarChart
} from '../../../admin/admin';
import {useStateValue} from "../../../provider/AppState";

function AdminHome(props) {
    const { reports, users } = props;
    const [{user}] = useStateValue();

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
            <div className="grid md:grid-cols-3 pt-2 pb-2 gap-2 bg-white dark:bg-gray-900">
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users"}
                    itemCount={user ? users.length : 0}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Users Active"}
                    itemCount={user ? usersActive : 0}
                />
                <StatisticsCard
                    notDash={notDash}
                    itemTitle={"Total Reports"}
                    itemCount={user ? reports.length : 0}
                />
            </div>
            <div className="mt-4 pb-2 pt-2">
                <div className="grid md:grid-cols-3 gap-2 bg-white dark:bg-gray-900">
                    <StatisticsCard
                        normalDash={normalDash}
                        itemTitle={"Normal Reports"}
                        itemCount={user ? normalReports : 0}
                    />
                    <StatisticsCard
                        warningDash={warningDash}
                        itemTitle={"Warning Reports"}
                        itemCount={user ? warningReports : 0}
                    />
                    <StatisticsCard
                        criticalDash={criticalDash}
                        itemTitle={"Critical Reports"}
                        itemCount={user ? criticalReports : 0}
                    />
                </div>
                {
                    user ?
                        <div className="mt-8 mx-4 grid md:grid-cols-2 grid-rows-1 gap-2">
                            <div
                                className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                                <BarChart
                                    normalReports={normalReports}
                                    warningReports={warningReports}
                                    criticalReports={criticalReports}
                                />
                            </div>
                            <div
                                className="bg-white hidden md:block shadow-md p-6 border border-solid border-gray-200 dark:border-transparent rounded-lg cursor-pointer">
                                <DoughnutChart
                                    normalReports={normalReports}
                                    warningReports={warningReports}
                                    criticalReports={criticalReports}
                                />
                            </div>
                        </div> :
                        <div> </div>
                }
            </div>

            {/* users and reports */}
            {user ? <ReportContent reports={reports}/> : <div> </div>}
            {user ? <UsersContent users={users}/> : <div> </div>}
        </div>
    );
}

export default AdminHome;