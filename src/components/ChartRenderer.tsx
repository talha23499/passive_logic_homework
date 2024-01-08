import React, { forwardRef, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { TemperatureRecord } from "../constants/types";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

interface ChartRendererProps {
    temperatures: TemperatureRecord[];
}

// Use forwardRef to wrap the component
const ChartRenderer = forwardRef<HTMLDivElement, ChartRendererProps>(({ temperatures }, ref) => {
    // Memoizing data and options for performance
    const data = useMemo(() => ({
        labels: temperatures.map(dp => dp.time),
        datasets: [
            {
                label: 'Temperature [°C]',
                data: temperatures.map(dp => parseFloat(dp.temperature)),
                fill: false,
                borderColor: '#007bff',
                backgroundColor: '#007bff',
                pointRadius: 3,
                tension: 0.1
            },
            {
                label: 'Target',
                data: temperatures.map(dp => dp.target),
                fill: false,
                borderColor: '#dc3545',
                backgroundColor: '#dc3545',
                tension: 0.1
            }
        ]
    }), [temperatures]);

    const options: ChartOptions<'line'> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1000,
            easing: 'easeOutCubic' as any
        },
        scales: {
            x: {
                type: 'category' as const,
                title: {
                    display: true,
                    text: 'Time [min]'
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.75)'
                },
                ticks: {
                    color: '#333333'
                }
            },
            y: {
                type: 'linear' as const,
                title: {
                    display: true,
                    text: 'Temperature [°C]'
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.75)'
                },
                ticks: {
                    color: '#333333'
                }
            }
        },
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Temperature vs Time'
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy' as const,
                },
                pan: {
                    enabled: true,
                    mode: 'xy' as const,
                },
            }
        }
    }), []);

    if (temperatures.length > 1) {
        return (
            <div className='chart__container' role="img" aria-label="Temperature vs Time chart" ref={ref}>
                <div className='chart__graph'>
                    <Line data={data} options={options} />
                </div>
            </div>
        );
    }
    return <span/>;
});

export default ChartRenderer;
