class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.durationInput = durationInput;
        this.timeUnit = 50;
        this.intervalId = NaN;
        this.initialTimeValue = this.timeRemainig;
        // this.timeRemainig = this.timeRemainig;
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onComplete = callbacks.onComplete;
            this.onTick = callbacks.onTick;
        }

        this.addEventListners();
    }

    // It is imortant to define arrow functions inside the class
    // otherwise clicking on the HTML element will pass in "this" as window object
    // and you cannot call other methods
    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemainig);
        }
        this.tick(); // setInterval calls the first call after the timeout value
        this.intervalId = setInterval(this.tick, this.timeUnit);
    }

    pause = () => {
        clearInterval(this.intervalId);
    }

    tick = () => {
        if (this.onTick) {
            this.onTick(this.timeRemainig);
        }
        this.timeRemainig = this.timeRemainig - (this.timeUnit / 1000);
        if (this.timeRemainig < 0) {
            this.pause();
            this.reset();
            if (this.onComplete) {
                this.onComplete();
            }
        }
    }

    get timeRemainig() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemainig(time) {
        this.durationInput.value = time.toFixed(2);
    }

    reset = () => {
        this.timeRemainig = this.initialTimeValue;
    }

    addEventListners() {
        this.startButton.addEventListener("click", this.start);
        this.pauseButton.addEventListener("click", this.pause);
    }
}
