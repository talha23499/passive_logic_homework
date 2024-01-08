import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Slider, message } from 'antd';
import { Constants } from '../constants';
import { simulateSolarTemp } from '../utils/Simulate';
import { Stat, TemperatureRecord } from '../constants/types';
import Lottie from 'react-lottie';
import animationData from '../lotties/passive_logic_homework_lottie.json';

const { initialWaterTemperature, solarIrradiance, initialTargetTemperature, marks, marksForSteps } = Constants;
interface SimulatorRendererProps {
    setTemperatures: React.Dispatch<React.SetStateAction<TemperatureRecord[]>>;
    setStats: React.Dispatch<React.SetStateAction<Stat[]>>;
    temperatures: TemperatureRecord[];

    scrollToResults: any
}

const SimulatorRenderer: React.FC<SimulatorRendererProps> = ({ setTemperatures, setStats, temperatures , scrollToResults}) => {
    const [targetTemperatureInput, setTemperatureTargetInput] = useState(initialTargetTemperature);
    const [startingTemperatureInput, setStartingTemperatureInput] = useState(initialWaterTemperature);
    const [solarIrradianceInput, setSolarIrradianceInput] = useState(solarIrradiance);
    const [timeStep, setTimeStep] = useState(60); // minutes

    const validateInputs = () => {
        if (startingTemperatureInput > targetTemperatureInput) {
            message.error("Starting temperature must be less than target temperature");
            return false;
        }
        if (startingTemperatureInput < 0 || targetTemperatureInput < 0) {
            message.error("Temperatures must be positive values");
            return false;
        }
        if (solarIrradianceInput < 0 || solarIrradianceInput > 1000) {
            message.error("Solar irradiance must be between 0 and 1000 W/m²");
            return false;
        }
        return true;
    };

    const simulateHeatTransfer = async () => {
        if (!validateInputs()) return;
        try {
            const { simulatedTempHistory, stats } = await simulateSolarTemp(timeStep * 60, targetTemperatureInput, startingTemperatureInput, solarIrradianceInput);
            setTemperatures(simulatedTempHistory);
            setStats(stats);
        } catch (error) {
            message.error("Error occurred during simulation");
        }
    };

    return (
        <div className='simulator__container'>
            <div className='simulator__main'>
                <div className='simulator__inputs-container'>
                    <div className='simulator__item'>
                        <span>Initial Temperature:</span>
                        <Slider
                            marks={marks}
                            value={startingTemperatureInput}
                            onChange={value => setStartingTemperatureInput(value)}
                        />
                    </div>
                    <div className='simulator__item'>
                        <span>Final Temperature:</span>
                        <Slider
                            marks={marks}
                            value={targetTemperatureInput}
                            onChange={e => setTemperatureTargetInput(e)}
                        />
                    </div>
                    <div className='simulator__item'>
                        <span>Solar Irradiance:</span>
                        <Input
                            value={solarIrradianceInput}
                            onChange={({ target: { value } }) => setSolarIrradianceInput(Number(value))}
                        />
                    </div>
                    <div className='simulator__item'>
                        <span>Time Step:</span>
                        <Slider
                            marks={marksForSteps}
                            value={timeStep}
                            onChange={e => setTimeStep(e)}
                        />
                    </div>
                </div>
                <div className='simulator__button-container'>
                    <Button type="primary" onClick={() => {
                        simulateHeatTransfer().then(() => scrollToResults());

                    }}>Simulate</Button>
                </div>
            </div>
        </div>
    );
};

export default SimulatorRenderer;
