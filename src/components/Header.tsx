import React from 'react';

const Header = () => {
    return (
        <p className='header'>
            <div className="header__title">
                <h1>Passive logic Simulation Test</h1>
            </div>
            <div className="header__details">
                <p>We're writing a computer program to imitate how heat moves over a set time and figure out the final temperature of a solar panel. We're also finding out what happens when we mix this hot water with the cold water in a tank. We keep running the simulation until the water reaches the temperature we want. Then, we show the results on a graph.
                    In essence, we're pretending that time is passing, and we're seeing how hot the water gets from the solar panel. We mix it with room temperature water in a tank and show the final temperature, only stopping when we reach the temperature we desire.</p>
                <p>In this application, there are four user-friendly settings you can adjust: initial temperature, final temperature, sun irradiation, and graph visualization time step. When you click the 'Simulate' button, you'll see a time-based graph. To make things even easier to grasp, I've added an animation below for a better understanding of the system.</p>
            </div>

        </p>
    );
};

export default Header;
