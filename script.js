class Stopwatch extends React.Component{
	constructor(display) {
		this.running = false;
        this.state = {
    		times: {
		        minutes: 0,
		        seconds: 0,
		        miliseconds: 0
    		},
		this.display = display;
		this.reset();
		this.print(this.times);

	}

	reset() {
		this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            },
        });
	}

	print() {
		this.display.innerText = this.format(this.times);
	}
	format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}

	start() {
		if (!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	step() {
		if (!this.running) return;
		this.calculate();
		this.print();
	}
	calculate() {
	    this.times.miliseconds += 1;
	    if (this.times.miliseconds >= 100) {
	        this.times.seconds += 1;
	        this.times.miliseconds = 0;
	    }
	    if (this.times.seconds >= 60) {
	        this.times.minutes += 1;
	        this.times.seconds = 0;
	    }
	}
	stop() {
		this.running = false;
		clearInterval(this.watch);
	}
	resetDisplay() {
		this.reset();
		this.stop();
		this.print();
		result.innerText = '';

	}
	catchTime(){
		console.log(this.format(this.times));
		let liElement = document.createElement('li');
		liElement.innerText = this.format(this.times);
		result.appendChild(liElement);
	}
	render() {
		return (
			<div>
				<nav className={'controls'}>
					<a href={'#'} className={'button'} onClick={this.start.bind(this)}>
						Start
					</a>
					<a href={'#'} className={'button'} onClick={this.stop.bind(this)} >
						Stop
					</a>
					<a href={'#'} className={'button'} onClick={this.reset.bind(this)} >
						Reset
					</a>
					<a href={'#'} className={'button'} onClick={this.catch.bind(this)}>
						Catch
					</a>								
				</nav>
				<div className={'stopwatch'}>
				</div>
				<ul className={'result'}>
				</ul>
			</div>
		)
	};
}

/*
const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
const result = document.querySelector('.results');

let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click',() => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click',() => stopwatch.resetDisplay());

let catchButton = document.getElementById('catch-time');
catchButton.addEventListener('click',() => stopwatch.catchTime());
*/

function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

ReactDOM.render{
	<Stopwatch />, document.getElementById('app')
};