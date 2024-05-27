import React, {useState} from 'react';
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
    PointElement,
    Legend,
    Title,
    Tooltip,
    Filler
} from "chart.js";

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
    plugins: {
        title: {
            display: true,
            text: 'Статистика по тестам',
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
    const [dataSets, setDataSet] = useState({myDataSet: [50, 30, 90, 20, 80, 10, 5, 100
], courseDataSet: [50, 50, 90, 70, 80, 70, 60, 50]
})
    const [data, setData] = useState({
        labels: dataSets.myDataSet.map((d, index) => {
            return "Тест " + (index + 1)
        }),
        datasets: [{
            label: 'Моя Статистика',
            data: dataSets.myDataSet,
            fill: true,
            backgroundColor: '#4880FF50',
            borderColor: '#4880FF',
            tension: 0.5
        },
            {
                label: 'Статистика Курса',
                data: dataSets.courseDataSet,
                fill: true,
                backgroundColor: '#DBA5FF50',
                borderColor: '#DBA5FF',
                tension: 0.5
            }]
    })

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