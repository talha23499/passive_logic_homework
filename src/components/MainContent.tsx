import React, { useState, lazy, Suspense, useRef } from 'react';
import SimulatorRenderer from "./SimulatorRenderer";
import StatsRenderer from "./StatsRenderer";
import { TemperatureRecord, Stat } from "../constants/types";

const ChartRenderer = lazy(() => import("./ChartRenderer"));

const MainContent = () => {
    const [temperatures, setTemperatures] = useState<TemperatureRecord[]>([]);
    const [stats, setStats] = useState<Stat[]>([]);
    const resultsRef = useRef<HTMLDivElement>(null);

    const scrollToResults = () => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <main className="container">
            <SimulatorRenderer
                setStats={setStats}
                setTemperatures={setTemperatures}
                temperatures={temperatures}
                scrollToResults={scrollToResults}
            />
            <Suspense fallback={<div>Loading chart...</div>}>
                <section className='results__renderer'>
                    <ChartRenderer temperatures={temperatures} />
                </section>
            </Suspense>
            <StatsRenderer stats={stats} ref1={resultsRef} />
        </main>
    );
};

export default MainContent;
