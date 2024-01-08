## Run this Project


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Introduction
We're writing a computer program to imitate how heat moves over a set time and figure out the final temperature of a solar panel. We're also finding out what happens when we mix this hot water with the cold water in a tank. We keep running the simulation until the water reaches the temperature we want. Then, we show the results on a graph. In essence, we're pretending that time is passing, and we're seeing how hot the water gets from the solar panel. We mix it with room temperature water in a tank and show the final temperature, only stopping when we reach the temperature we desire.

In this application, there are four user-friendly settings you can adjust: initial temperature, final temperature, sun irradiation, and graph visualization time step. When you click the 'Simulate' button, you'll see a time-based graph. To make things even easier to grasp, I've added an animation below for a better understanding of the system.


To make our task more manageable, we set some boundaries and made a few assumptions. These limitations help us focus on solving the heat transfer from the solar panel to the water. They allow us to determine the water's temperature after it has been warmed by the sunlight collected by the solar panel.

I used average values and information from research to make these calculations. Finding the output temperature of the solar panel lets us simulate a real-life scenario where we are interested in getting hot water from a sustainable source like the sun.

Our goal is to create a simplified version of the system. When you use our web app, it generates a graph showing how heat transfers within the system. It also provides an array of data points, including temperature and various statistics, which are displayed on the user interface. These temperature data points represent the water temperature after it has mixed with the storage tank for each time step.

Under constants/index.ts, you will find some of the assumptions, I have made. 

## Functional requirements for this project 
1) App should work and generate the graph
2) App should be responsive to all devices 
3) App should be render animations

## Non Functional things which I used to reflect this project use tech stack which matches Job description
1) Typescript to make code readability easy 
2) ReactJS 
3) Chart.js 
4) Lottie Animation to render pure SVG'S
5) SCSS and BEM naming methodology

This project uses latest version of React, As this project is very small, using local state was enough to solve it, there was no need to use Context API or any state management solutions. 

## Limitations 
This project is a pure front end project, there is pretty much no I/O operations as the app computes the graph in the UI code itself. I wanted to create a graphql/rest based service to uplift the result calculation to it, however it would make things difficult to host. It would be an improvement for larger calculations in the future 


