import React from "react";
import { SliderMarks } from "antd/es/slider";

// Constants.js
// This file contains constants used throughout the application for simulating solar heating.

// Heat capacity of water in Joules per kilogram per degree Celsius.
const heatCapacityOfWater = 4200; // J/kg°C

// Efficiency of the solar panel as a decimal (50% efficiency).
const efficiencyOfSolarPanel = 0.50; // Decimal

// Flow rate of water through the system in liters per second.
const rateOfWaterFlow = 0.065; // liters/second

// Starting temperature of water in the tank in degrees Celsius.
const startingTemperatureOfWater = 22; // °C

// Solar irradiance in Watts per square meter.
const irradianceFromSun = 950; // W/m²

// Target temperature for the water in degrees Celsius.
const targetTemperatureOfWater = 62; // °C

// Area of the solar panel in square meters.
const areaOfSolarPanel = 1.2; // m²

// Volume of the water tank in kilograms (also equivalent to liters).
const volumeOfTank = 400; // kg or liters

// Slider marks for temperature settings.
const marks: SliderMarks = {
    0: '0°C',
    20: '20°C',
    40: '40°C',
    60: '60°C',
    80: {
        style: { color: '#f50' },
        label: <span>80°C</span>,
    },
    100: {
        style: { color: '#ff0000' },
        label: <strong>100°C</strong>,
    },
};

// Slider marks for time steps.
const marksForSteps: SliderMarks = {
    10: '10 mins',
    30: '30 mins',
    60: '60 mins',
    90: '90 mins',
    120: '120 mins'
};

// Export all constants in a single object for ease of import.
export const Constants = {
    solarPanelEfficiency: efficiencyOfSolarPanel,
    solarIrradiance: irradianceFromSun,
    panelArea: areaOfSolarPanel,
    waterHeatCapacity: heatCapacityOfWater,
    tankVolume: volumeOfTank,
    initialWaterTemperature: startingTemperatureOfWater,
    initialTargetTemperature: targetTemperatureOfWater,
    flowRate: rateOfWaterFlow,
    marks,
    marksForSteps,
};
