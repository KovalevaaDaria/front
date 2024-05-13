import React from 'react';
import SideMenu from "../components/sideMenu/sideMenu";
import NavBar from "../components/navBar/navBar";
import "./analyz.css"
import {useParams} from "react-router-dom";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
)

const Analyz = () => {
    const params = useParams();

    const data = {
        labels: ["Тест 1", "Тест 2", "Тест 3", "Тест 4", "Тест 5", "Тест 6", "Тест 7", "Тест 8"],
        datasets: [{
            data: [50, 30, 90, 20, 80, 10, 5, 100],
            backgroundColor: 'transperent',
            borderColor: '#4880FF',
            pointBorderColor: 'transparent',
            pointBorderWidth: 10,
            tension: 0.5,
        }]
    };
    const options = {
        plugins: {
            legend: true
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
                            <div className="analyz-page-content-form-1" style={{width: '1138px', height: '300px'}}>
                                <div className="analyz-page-content-form-wrapper-1">
                                    <div className="analyz-page-content-form-wrapper-graphic-1">
                                        <h1 className="analyz-graphic-1-title">Статистика по тестам</h1>
                                        <Line data={data} options={options}/>
                                    </div>
                                </div>
                            </div>

                            <div className="analyz-page-content-form-2">
                                <div className="analyz-page-content-form-wrapper-1">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Analyz;