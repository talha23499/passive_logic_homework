import {Constants} from '../constants';


const {solarIrradiance, initialWaterTemperature, flowRate, initialTargetTemperature} = Constants;

const {panelArea, solarPanelEfficiency, tankVolume, waterHeatCapacity} = Constants;

export const calculateSolarPower = (averageSolarIrradiance: number): number =>
    solarPanelEfficiency * averageSolarIrradiance * panelArea;

/**
 * Calculates the energy transferred to the water over a given time step.
 * Formula: Energy (E) = Power (P) * Time Step (delta_T)
 *
 * @param {number} power - The power generated by the solar panel in Watts (W).
 * @param {number} timeStepSeconds - The time step in seconds.
 * @returns {number} The energy transferred to the water in Joules (J).
 */
export const calculateEnergyProduced = (power: number, timeStepSeconds: number): number =>
    power * timeStepSeconds;

/**
 * Calculates the temperature increase in the water due to the energy input.
 * Formula: Temperature Increase (delta_T) = Energy (E) / (Mass of Water (m) * Specific Heat Capacity of Water (c))
 * Note: Mass of water (m) is derived from the tank volume and the density of water.
 *
 * @param {number} energy - The energy transferred to the water in Joules (J).
 * @param {number} currentTemperature - The current temperature of the water in degrees Celsius (°C).
 * @returns {number} The new temperature of the water in degrees Celsius (°C).
 */
export const calculateTemperatureIncrease = (energy: number, currentTemperature: number): number => {
    const tempIncrease = currentTemperature + energy / (tankVolume * waterHeatCapacity);
    return tempIncrease;
};

/**
 * Simulates the mixing of water in the tank with the newly heated water from the solar panel.
 * Formula: Mixed Temperature (T_mixed) = (Old Temperature (T_old) + New Temperature (T_new)) / 2
 *
 * @param {number} oldTemp - The original temperature of the water in the tank in degrees Celsius (°C).
 * @param {number} newTemp - The new temperature of the water from the solar panel in degrees Celsius (°C).
 * @returns {number} The mixed temperature of the water in the tank in degrees Celsius (°C).
 */
export const mixTankWater = (oldTemp: number, newTemp: number): number =>
    (oldTemp + newTemp) / 2;


// function to save the relevant data for the current step - time, temperature, target
function saveCurrentStep(stepCount: number, timeStepInSeconds: number, mixedTemp: number, desiredTemp: any) {
    return {
        time: ((stepCount * timeStepInSeconds) / 60).toFixed(2) + " min", // minutes
        temperature: mixedTemp.toFixed(2),  // °C
        target: desiredTemp // °C
    };
}

/* function to calculate the temperature history of the water given step size,
 desired temperature, initial temperature, and average solar irradiance */
export async function simulateSolarTemp(timeStepInSeconds: number,
                                        targetTemperature = initialTargetTemperature,
                                        initialTemperature = initialWaterTemperature,
                                        averageSolarIrradiance = solarIrradiance,
) {

    // initialize variables
    let waterTempOutFromSolar = initialTemperature;
    let mixedTankWaterTemperature = waterTempOutFromSolar;
    let simulatedTempHistory: any[] = [];
    let totalEnergyConverted = 0;
    let stepCount = 0;

    while (mixedTankWaterTemperature < targetTemperature) {
        let power = calculateSolarPower(averageSolarIrradiance);
        let energyProduced = calculateEnergyProduced(power, timeStepInSeconds); // [Joules]

        waterTempOutFromSolar = calculateTemperatureIncrease(energyProduced, mixedTankWaterTemperature); // [°C]
        mixedTankWaterTemperature = mixTankWater(waterTempOutFromSolar, mixedTankWaterTemperature);
        simulatedTempHistory.push(saveCurrentStep(stepCount, timeStepInSeconds, mixedTankWaterTemperature, targetTemperature));
        totalEnergyConverted += energyProduced;
        stepCount++;

        // exit early if the desired temperature is reached to avoid overshooting the target
        if (mixedTankWaterTemperature >= targetTemperature) {
            break;
        }
    }

    // append stats to the temperature history before returning

    let stats = [
        {
            name: "Total Energy Converted",
            value: (totalEnergyConverted / 1000).toFixed(2),
            units: "Kilojoules"
        },
        {
            name: "Liters Processed",
            value: (stepCount * timeStepInSeconds * flowRate / 60).toFixed(2),
            units: "Liters"
        },
        {
            name: "Elapsed Time",
            value: ((stepCount * timeStepInSeconds) / 60).toFixed(2),
            units: "Minutes"
        },
        {
            name: "Temperature Increase",
            value: (waterTempOutFromSolar - initialTemperature).toFixed(2),
            units: "Celsius"
        },
    ];

    return {simulatedTempHistory, stats};

}


