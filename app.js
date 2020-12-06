const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const durationInput = document.querySelector("#duration");
const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);
let offset = 0;
let startTime = 0;

const callbacks = {
    onStart: (totalDuration) => {
        startTime = totalDuration;
        console.log("timer has started")
    },
    onComplete: () => {
        console.log("timer complete");
    },
    onTick: (timeRemaining) => {
        circle.setAttribute("stroke-dashoffset", (perimeter * timeRemaining / startTime) - perimeter);
    },
}
const timer = new Timer(durationInput, startButton, pauseButton, callbacks);
