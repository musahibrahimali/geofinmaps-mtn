import React, {useEffect, useState} from 'react';
import {useStateValue} from "../../../provider/AppState";
import actionTypes from "../../../Utils/Utils";
import {Header, ShimmerPage} from "../../../global/global";
import axios from "axios";
const reportsUrl = "https://us-central1-roam-ghana.cloudfunctions.net/getAllReports";

const Report = ({id}) => {

    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    let reportsData;

    const getData = async () => {
        await axios(reportsUrl).then((response) => {
            reportsData = response.data.reports;
        });

        reportsData.map((report) => {
            if(report.id === id){
                setReport(report);
            }
        });

        if(report !== null){
            setLoading(false);
        }
    }

    /* data layer */
    const [{ isDrawerOpen}, dispatch] = useStateValue();
    const handleOpenDrawer = () => {
        if(isDrawerOpen){
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: false,
            });
        }else{
            dispatch({
                type: actionTypes.OPEN_DRAWER,
                isDrawerOpen: true,
            });
        }
    }

    useEffect(() => {
        getData().then(() => {
            setLoading(false);
        });
    },[]);

    return (
        <>
            {
                loading ?
                    <ShimmerPage /> :
                    <div>
                        <Header handleOpenDrawer={handleOpenDrawer}/>
                        <div className="pt-20 pb-52 bg-white dark:bg-gray-900 px-8">
                            <div className="flex flex-col justify-between items-center">
                                <h1 className="text-xl font-bold uppercase md:text-4xl text-center text-blue-600">
                                    {report.title}
                                </h1>
                                <div className="flex justify-center items-center pt-4 pb-2">
                                    <h3 className="text-blue-600 uppercase mx-2 font-bold">
                                        {report.location}
                                    </h3>
                                    <h3 className="text-center text-gray-900 dark:text-gray-200 font-bold uppercase tracking-tighter" >
                                        {report.level}
                                    </h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-200 font-bold uppercase text-lg md:text-xl">
                                    {report.fullName}
                                </p>
                                <p className="text-gray-700 py-4 dark:text-gray-200 text-lg md:text-xl text-justify">
                                    {report.description}
                                </p>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

    export const getStaticPaths = async () => {
        let reportsData;

        await axios(reportsUrl).then((response) => {
            reportsData = response.data.reports;
        });

        const paths = reportsData.map((report) => {
            return {
                params: { id: report.id.toString() }
            }
        });

        return {
            paths: paths,
            fallback: false,
        }
    }

    export const getStaticProps = async (context) => {
        const id = context.params.id;

        return {
            props: {
                id: id
            }
        }
    }


export default Report;