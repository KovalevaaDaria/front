import React, {useContext, useState} from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./analyz.css"
import {useLoaderData, useParams} from "react-router-dom";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip,
    Filler
} from "chart.js";
import {AuthContext} from "../context/AuthContext";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Title,
    Tooltip,
    Filler
)

export  const options = {
    responsive: true,
    layout: {
        padding: 35
    },

    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 14,
                    weight: 'bold'
                }
            },
        }
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            min: 0,
            max: 100,
            ticks: {
                stepSize: 20,
                callback: value => value + '%'
            }
        }
    }
};

const Analyz = () => {
    const params = useParams();
    const loaderData = useLoaderData();
    const {authData} = useContext(AuthContext);
    const sortedData = loaderData.arrayOfUserTests?.toSorted((a, b) => {
        return a.title.localeCompare(b.title);
    });


    const [dataSets, setDataSet] = useState({
        myDataSet: sortedData?.map(userTest => {
            return userTest.percentageOfTest;
        }),
        courseDataSet: sortedData?.map(userTest => {
            return userTest.averageTestMark;
        })
})
    const [data, setData] = useState(
        authData.role !== "TEACHER"?
        {
        labels: sortedData?.map((d) => {
            return d.title
        }),
        datasets: [
            {
            label: 'Моя статистика',
            data: dataSets.myDataSet,
            fill: true,
            backgroundColor: '#4880FF50',
            borderColor: '#4880FF',
            tension: 0.5
        },
        {
            label: 'Статистика по курсу',
            data: dataSets.courseDataSet,
            fill: true,
            backgroundColor: '#DBA5FF50',
            borderColor: '#DBA5FF',
            tension: 0.5
        }
        ]
    } :
            {
                labels: sortedData?.map((d) => {
                    return d.title
                }),
                datasets: [
                    {
                        label: 'Статистика по курсу',
                        data: dataSets.courseDataSet,
                        fill: true,
                        backgroundColor: '#DBA5FF50',
                        borderColor: '#DBA5FF',
                        tension: 0.5
                    }
                ]
            }
    )

    return (
            <div className="page-header">
                <SideMenu/>
                <div className="content">
                    <NavBar course={params.course}/>
                    <div className="analyz-page-content">
                        <div className="analyz-page-content-header">
                            <h1 className="analyz-page-title">Аналитика по курсу</h1>
                        </div>
                        <div className="analyz-page-content-graphics-wrapp">
                            <div className="analyz-page-content-form-1">
                                <div className="analyz-page-content-form-wrapper-1">
                                    <div className="analyz-page-content-form-wrapper-graphic-1">
                                        <Line data={data} options={options}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Analyz;