import {Stat} from "../constants/types";
import React from "react";
import {Card} from 'antd';

interface StatsRendererProps {
    stats: Stat[];
    ref1 : any
}

const StatsRenderer: React.FC<StatsRendererProps> = ({stats, ref1}) => {
    if(Array.isArray(stats) && stats.length > 0){
        return (
            <div className='stats__container' ref={ref1}>
                {Array.isArray(stats) && stats.map((stat,i) => {
                    return (
                        <div className="stats__card" key={i}>
                            <h2 className="stats__title">{stat.name}</h2>
                            <p className="stats__value">{stat.value}&nbsp;{stat.units}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
    return <span/>
};

export default StatsRenderer;
